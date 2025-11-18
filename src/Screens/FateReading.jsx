import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

import MultiUseButton from "../Components/MultiUseButton";
import './FateReading.css';

function ParchmentCard({ title, children }) {
  return (
    <div className="parchment-card">
        {title && <h1>{title}</h1>}
       <p>{ children }</p>
    </div>
  );
}

function FateReading() {
    const navigate = useNavigate();
    
    const location = useLocation();
    const { question, cardAmount } = location.state || {}; // safely extract the passed data

    const [data, setData] = useState(null); //data for a specific card
    const [randomCards, setRandomCards] = useState([]);

    const [view, setView] = useState("grid"); // "grid" = your current layout, "detail" = new layout

    const [reading, setReading] = useState("");
    const [readingLoading, setReadingLoading] = useState(false);
    const [readingError, setReadingError] = useState(null);
    const [hasRequestedReading, setHasRequestedReading] = useState(false);

    //from "/public/Cards[all of the jpg files]" select cardAmount random cards
    const shortNames = [
        "ar00", "ar01","ar02","ar03","ar04","ar05","ar06","ar07","ar08","ar09","ar10",
        "ar11","ar12","ar13","ar14","ar15","ar16","ar17","ar18","ar19","ar20",
        "ar21","wapa","wakn","waqu","waki","waac","wa02","wa03","wa04","wa05",
        "wa06","wa07","wa08","wa09","wa10","cupa","cukn","cuqu","cuki","cuac","cu02",
        "cu03","cu04","cu05","cu06","cu07","cu08","cu09","cu10","pepa","pekn","pequ","peki",
        "peac","pe02","pe03","pe04","pe05","pe06","pe07","pe08","pe09","pe10","swpa","swkn",
        "swqu","swki","swac","sw02","sw03","sw04","sw05","sw06","sw07","sw08","sw09","sw10"
    ];
    // Map short names to image paths
    const cardImages = {}
    shortNames.forEach(name => {
        cardImages[name] = `/Cards/${name}.jpg`
    });

    useEffect(() => {
    const getRandomCards = (cardAmount) => { 
        return [...shortNames].sort(() => Math.random() - 0.5).slice(0, cardAmount)
    } 

    const drawn = getRandomCards(cardAmount) //setting variable and setting is s the state variable
    setRandomCards(drawn)
    console.log("random cards drawn: ", drawn)

    const fetchCards = async () => {
        try {
            const res = await fetch("https://tarotapi.dev/api/v1/cards") //fetch all the card data
            if (!res.ok) throw new Error("Failed to fetch cards")
            const allCards = await res.json()

            const results = drawn.map(name => { //.map to go through all 3 cards if there's 3
                const found = allCards.cards.find(c => c.name_short === name)
                if (!found) throw new Error(`Card ${name} not found`)
                return found
            })

            setData({ cards: results })
            console.log("Fetched results:", results)
        } catch (err) {
            setData(null)
            console.log(err.message)
        }
    }

    fetchCards()
    }, []);

    useEffect(() => {
    // Only trigger when:
    // - we're in the detail view
    // - card data is loaded
    // - we have cards
    // - and we haven't already requested a reading
    if (view !== "detail") return;
    if (!data?.cards || randomCards.length === 0) return;
    if (hasRequestedReading) return;

    const effectiveQuestion =
        question || "Give a general tarot fate reading based on these cards.";

    const cardsForApi = randomCards.map(shortName => {
        const card = data.cards.find(c => c.name_short === shortName);
        return {
        name: card?.name || shortName,
        reversed: false,          // you can add real reversed logic later
        position: undefined       // or "past/present/future" if you want
        };
    });

    const fetchReading = async () => {
        try {
        setReadingLoading(true);
        setReadingError(null);

        const res = await fetch("/api/tarot", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            question: effectiveQuestion,
            cards: cardsForApi,
            }),
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
    }, [view, data, randomCards, question, hasRequestedReading]);

    return (
        <div className="ScreenContainer crystalBall-bg-img bg-img">
			{/* If the screen is in First screen mode, display this */}
            {view === "grid" && (
            <div className="reading-grid">
                {/* Top row: cards */}
                <div className="card-row">
                {randomCards.map((shortName) => {
                    const card = data?.cards?.find(c => c.name_short === shortName);
                    const name = card?.name || shortName;

                    return (
                    <div key={shortName} className="card-col">
                        <img
                        src={cardImages[shortName]}
                        alt={name}
                        className="card-image"
                        />
                    </div>
                    );
                })}
                </div>

                {/* Bottom row: parchment info */}
                <div className="info-row">
                {randomCards.map((shortName) => {
                    const card = data?.cards?.find(c => c.name_short === shortName);
                    const name = card?.name || shortName;
                    const desc = card?.desc || '';

                    return (
                    <div key={shortName} className="info-col">
                        <ParchmentCard title={name}>
                        {desc}
                        </ParchmentCard>
                    </div>
                    );
                })}
                </div>
                
                {/* Button to go from first layout → second layout */}
                {view === "grid" && (
                    <MultiUseButton
                        buttons={[
                            {
                                label: "Another Reading?",
                                onClick: () => navigate('/Screens/TypeSelect')
                            },
                            {
                                label: "Next",
                                onClick: () => setView("detail")
                            }
                        ]}
                    />
                )}
            </div>
            )}

            {/* If the screen is in Detail mode, display this */}
            {view === "detail" && 
            (
                // Main screen container
                <div className="reading-page">

                    {/* Card Container, requires Javascript to loop the 3 cards and display them a certain way */}
                    <div className="reading-top">
						{
							randomCards.length === 3 ? (
								// Special layout just for 3 cards
								<div className="cards-three-layout">
									{/* Move the first two cards to the left */}
									<div className="cards-left">
										{randomCards.slice(0, 2).map(shortName => {
										const card = data?.cards?.find(c => c.name_short === shortName);
										const name = card?.name || shortName;

										return (
											<div key={shortName} className="card-wrapper">
											<img
												src={cardImages[shortName]}
												alt={name}
												className="card-image"
											/>
											</div>
										);
										})}
									</div>

									{/* Move final 3rd card to the right */}
									<div className="card-right">
										{randomCards.slice(2, 3).map(shortName => {
										const card = data?.cards?.find(c => c.name_short === shortName);
										const name = card?.name || shortName;

										return (
											<div key={shortName} className="card-wrapper">
											<img
												src={cardImages[shortName]}
												alt={name}
												className="card-image"
											/>
											</div>
										);
										})}
									</div>
								</div>
							) : (
								// Only 1 card has been chosen
								<div className="cards-column">
								{randomCards.map(shortName => {
									const card = data?.cards?.find(c => c.name_short === shortName);
									const name = card?.name || shortName;

									return (
									<div key={shortName} className="card-wrapper">
										<img
										src={cardImages[shortName]}
										alt={name}
										className="card-image"
										/>
									</div>
									);
								})}
								</div>
							)
						}

						<div className="question-column">
							<ParchmentCard title={question && "Your Question Was:"}>
							{question || ` You actually did not ask anything! 
							To ask a question, get a new reading `}
							</ParchmentCard>

                            {/* NEW: AI fate reading */}
                            <ParchmentCard title="The Cards Reveal:">
                                {readingLoading && "The spirits are whispering... please wait."}
                                {readingError && `Hmm, something interfered with the reading: ${readingError}`}
                                {!readingLoading && !readingError && (reading || "No message came through this time.")}
                            </ParchmentCard>
						</div>
                    </div>

                    <MultiUseButton
                    buttons={[
                        {
                        label: "Back to card spread",
                        onClick: () => setView("grid")
                        },
                        {
                        label: "Another Reading?",
                        onClick: () => navigate("/Screens/TypeSelect")
                        },
                        {
                        label: "Consult the full deck",
                        onClick: () => navigate("/Screens/LazySusan")
                        }
                    ]}
                    />
                </div>
            )}
        </div>
    );

}

export default FateReading
