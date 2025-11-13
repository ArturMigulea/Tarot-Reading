import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

import MultiUseButton from "../Components/MultiUseButton";
import './FateReading.css';

function ParchmentCard({ title, children }) {
  return (
    <div className="parchment-card">
      <h1>{ title }</h1>
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
        cardImages[name] = `/Tarot-Reading/Cards/${name}.jpg`
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
    }, [])

    return (
        <div>
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
                                label: "Next",
                                onClick: () => setView("detail")
                            },
                            {
                                label: "Another Reading?",
                                onClick: () => navigate('/Screens/TypeSelect')
                            }
                        ]}
                    />
                )}
            </div>
            )}

            {view === "detail" && (
            <div className="reading-page">
                <div className="reading-top">
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

                    <div className="question-column">
                        <ParchmentCard title={question || 'No question provided.'}>
                        {question || `
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        `}
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
                            label: "Consult the full deck",
                            onClick: () => navigate('/Screens/LazySusan')
                        }
                    ]}
                />
            </div>
            )}
        </div>
    );

}

export default FateReading
