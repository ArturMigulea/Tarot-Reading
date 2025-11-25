import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MultiUseButton from "../Components/MultiUseButton";
import './FateReading.css';

// ---- ParchmentCard component ----
function ParchmentCard({ title, children, className }) {
    return (
        <div className={`parchment-card ${className || ""}`}>
            {title && <h1>{title}</h1>}
            <p>{children}</p>
        </div>
    );
}

// ---- FateReading main component ----
function FateReading() {
    // ---- State hooks ----
    const [flipped, setFlipped] = useState({});
    const [revealed, setRevealed] = useState({});
    const [randomCards, setRandomCards] = useState([]);
    const [data, setData] = useState(null);
    const [reading, setReading] = useState("");
    const [readingLoading, setReadingLoading] = useState(false);
    const [readingError, setReadingError] = useState(null);
    const [hasRequestedReading, setHasRequestedReading] = useState(false);

    // ---- New states for fade-in ----
    const [showQuestion, setShowQuestion] = useState(false);
    const [showReading, setShowReading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { question, cardAmount = 3 } = location.state || {};

    // ---- Card short names and mapping ----
    const shortNames = [
        "ar00","ar01","ar02","ar03","ar04","ar05","ar06","ar07","ar08","ar09","ar10",
        "ar11","ar12","ar13","ar14","ar15","ar16","ar17","ar18","ar19","ar20",
        "ar21","wapa","wakn","waqu","waki","waac","wa02","wa03","wa04","wa05",
        "wa06","wa07","wa08","wa09","wa10","cupa","cukn","cuqu","cuki","cuac","cu02",
        "cu03","cu04","cu05","cu06","cu07","cu08","cu09","cu10","pepa","pekn","pequ","peki",
        "peac","pe02","pe03","pe04","pe05","pe06","pe07","pe08","pe09","pe10","swpa","swkn",
        "swqu","swki","swac","sw02","sw03","sw04","sw05","sw06","sw07","sw08","sw09","sw10"
    ];
    const cardImages = {};
    shortNames.forEach(name => cardImages[name] = `/Cards/${name}.jpg`);

    // ---- useEffect: Select random cards and fetch card data ----
    useEffect(() => {
        const getRandomCards = (cardAmount) => [...shortNames].sort(() => Math.random() - 0.5).slice(0, cardAmount);
        const drawn = getRandomCards(cardAmount);
        setRandomCards(drawn);

        const fetchCards = async () => {
            try {
                const res = await fetch("https://tarotapi.dev/api/v1/cards");
                if (!res.ok) throw new Error("Failed to fetch cards");
                const allCards = await res.json();

                const results = drawn.map(name => {
                    const found = allCards.cards.find(c => c.name_short === name);
                    if (!found) throw new Error(`Card ${name} not found`);
                    return found;
                });

                setData({ cards: results });
            } catch (err) {
                setData(null);
                console.error(err.message);
            }
        };
        fetchCards();
    }, [cardAmount]);

    // ---- useEffect: Fetch AI reading once cards are known ----
    useEffect(() => {
        if (!data?.cards || randomCards.length === 0 || hasRequestedReading) return;

        const effectiveQuestion = question || "Give a general tarot fate reading based on these cards.";
        const cardsForApi = randomCards.map(shortName => {
            const card = data.cards.find(c => c.name_short === shortName);
            return { name: card?.name || shortName, reversed: false, position: undefined };
        });

        const fetchReading = async () => {
            try {
                setReadingLoading(true);
                setReadingError(null);

                const res = await fetch("/api/tarot", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: effectiveQuestion, cards: cardsForApi })
                });

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData.details || errData.error || "Request failed");
                }

                const dataJson = await res.json();
                setReading(dataJson.interpretation || "");
                setHasRequestedReading(true);
            } catch (err) {
                console.error(err);
                setReadingError(err.message || "Something went wrong");
            } finally {
                setReadingLoading(false);
            }
        };

        fetchReading();
    }, [data, randomCards, question, hasRequestedReading]);

    // ---- useEffect: Flip cards and trigger fade-ins ----
    useEffect(() => {
        if (!randomCards.length) return;

        randomCards.forEach((shortName, index) => {
            setTimeout(() => {
                setFlipped(prev => ({ ...prev, [shortName]: true }));
                setRevealed(prev => ({ ...prev, [shortName]: true }));

                if (index === randomCards.length - 1) {
                    setTimeout(() => setShowQuestion(true), 500);
                    setTimeout(() => setShowReading(true), 1000);
                }
            }, 600 * (index + 1));
        });
    }, [randomCards]);

    // ---- JSX return ----
    return (
        <div className="ScreenContainer crystalBall-bg-img bg-img">
            <div className="reading-grid">
                <div className="card-row">
                    {randomCards.map((shortName) => {
                        const card = data?.cards?.find(c => c.name_short === shortName);
                        const name = card?.name || shortName;

                        return (
                            <div key={shortName} className="card-col">
                                <div
                                    className={`flip-card ${flipped[shortName] ? "flipped" : ""}`}
                                    onClick={() => setFlipped(prev => ({ ...prev, [shortName]: !prev[shortName] }))}
                                >
                                    <div className="flip-inner">
                                        <img src="/Cards/back.jpg" className="flip-face flip-back" alt="card back" />
                                        <img src={cardImages[shortName]} className="flip-face flip-front" alt={name} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="reading-page">
                <div className="reading-top">
                    <div className="question-column">
                        <ParchmentCard
                            title={question && "Your Question Was:"}
                            className={`reduced-padding fade-card ${showQuestion ? "visible" : ""}`}
                        >
                            {question || `You did not ask a question. To ask one, get another reading.`}
                        </ParchmentCard>

                        <ParchmentCard
                            title="The Cards Reveal:"
                            className={`reduced-padding fade-card ${showReading ? "visible" : ""}`}
                        >
                            {readingLoading && "The spirits are whispering... please wait."}
                            {readingError && `Hmm, something interfered with the reading: ${readingError}`}
                            {!readingLoading && !readingError && (reading || "No message came through this time.")}
                        </ParchmentCard>
                    </div>
                </div>

                <MultiUseButton
                    buttons={[
                        { label: "Another Reading?", onClick: () => navigate("/Screens/TypeSelect") },
                        { label: "See All Possible Cards", onClick: () => navigate("/Screens/LazySusan") }
                    ]}
                />
            </div>
        </div>
    );
}

// ---- Default export (Fast Refresh compatible) ----
export default FateReading;
