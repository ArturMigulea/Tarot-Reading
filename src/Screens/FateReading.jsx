import { useNavigate, useLocation } from 'react-router-dom'
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
    const [flipped, setFlipped] = useState({});       // track which cards are flipped
    const [revealed, setRevealed] = useState({});     // track which cards have been revealed at least once
    const [randomCards, setRandomCards] = useState([]);
    const [data, setData] = useState(null);           // data for a specific card
    // const [view, setView] = useState("grid");         // "grid" = card grid layout, "detail" = detailed reading
    const [reading, setReading] = useState("");       // AI-generated reading
    const [readingLoading, setReadingLoading] = useState(false);
    const [readingError, setReadingError] = useState(null);
    const [hasRequestedReading, setHasRequestedReading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { question, cardAmount = 3 } = location.state || {}; // safely extract passed data

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

    // ---- Map short names to image paths ----
    const cardImages = {};
    shortNames.forEach(name => {
        cardImages[name] = `/Cards/${name}.jpg`;
    });

    // ---- useEffect: Select random cards and fetch card data ----
    useEffect(() => {
        const getRandomCards = (cardAmount) => { 
            return [...shortNames].sort(() => Math.random() - 0.5).slice(0, cardAmount)
        } 

        const drawn = getRandomCards(cardAmount); // pick random cards
        setRandomCards(drawn);
        console.log("random cards drawn: ", drawn);

        const fetchCards = async () => {
            try {
                const res = await fetch("https://tarotapi.dev/api/v1/cards"); // fetch all cards
                if (!res.ok) throw new Error("Failed to fetch cards");
                const allCards = await res.json();

                const results = drawn.map(name => { // map drawn cards to API data
                    const found = allCards.cards.find(c => c.name_short === name);
                    if (!found) throw new Error(`Card ${name} not found`);
                    return found;
                });

                setData({ cards: results });
                console.log("Fetched results:", results);
            } catch (err) {
                setData(null);
                console.log(err.message);
            }
        };

        fetchCards();
    }, [cardAmount]);

    // ---- useEffect: Fetch AI reading
    useEffect(() => {
        if (!data?.cards || randomCards.length === 0) return; // ensure cards loaded
        if (hasRequestedReading) return;               // don't request multiple times

        const effectiveQuestion =
            question || "Give a general tarot fate reading based on these cards.";

        const cardsForApi = randomCards.map(shortName => {
            const card = data.cards.find(c => c.name_short === shortName);
            return {
                name: card?.name || shortName,
                reversed: false,          // reversed logic optional
                position: undefined       // can add "past/present/future" later
            };
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

    // ---- JSX return ----
    return (
			<div className="ScreenContainer crystalBall-bg-img bg-img">
				<div className="reading-grid">

					{/* Top row: cards */}
					<div className="card-row">
						{randomCards.map((shortName) => {
							const card = data?.cards?.find(c => c.name_short === shortName);
							const name = card?.name || shortName;

							return (
								<div key={shortName} className="card-col">
									<div
										className={`flip-card ${flipped[shortName] ? "flipped" : ""}`}
										onClick={() => {
												setFlipped(prev => ({ ...prev, [shortName]: !prev[shortName] }));
												setRevealed(prev => ({ ...prev, [shortName]: true }));
										}}
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

					{/* Bottom row: parchment info for revealed cards */}
					<div className="info-row">
						{randomCards.map((shortName) => {
							const card = data?.cards?.find(c => c.name_short === shortName);
							const name = card?.name || shortName;
							let desc = card?.desc || '';
							const sentences = desc.split(/(?<=\.)\s+/);
							desc = sentences.slice(0, 2).join(' ');

							return (
								<div key={shortName} className="info-col">
									{revealed[shortName] && (
										<ParchmentCard title={name} className="fade-in">
											{desc}
										</ParchmentCard>
									)}
								</div>
							);
						})}
					</div>
				</div>
				<div className="reading-page">
					<div className="reading-top">
						<div className="question-column">
							<ParchmentCard title={question && "Your Question Was:"}>
								{question || ` You actually did not ask anything! To ask a question, get a new reading `}
							</ParchmentCard>

							{question && (
								<ParchmentCard title="The Cards Reveal:">
									{readingLoading && "The spirits are whispering... please wait."}
									{readingError && `Hmm, something interfered with the reading: ${readingError}`}
									{!readingLoading && !readingError && (reading || "No message came through this time.")}
								</ParchmentCard>
							)}
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

export default FateReading;
