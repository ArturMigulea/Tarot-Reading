import { useNavigate, useLocation } from 'react-router-dom'
import './FateReading.css';

function FateReading() {
    const navigate = useNavigate();
    
    const location = useLocation();
    const { question, cardAmount } = location.state || {}; // safely extract the passed data
    //const [card, setCard] = useState(null);

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

    const getRandomCards = (cardAmount) => {
        return [...shortNames].sort(() => Math.random() - 0.5).slice(0, cardAmount);
        //[...allCards] → creates a copy so we don’t mutate the original array.
        // .sort(() => Math.random() - 0.5) → shuffles the array randomly.
        // .slice(0, cardAmount) → picks the first cardAmount cards from the shuffled array.
    }

    const randomCards = getRandomCards(cardAmount)
    console.log("random cards drawn: ", randomCards) //shows 2 sets of cards?? something about React's Strict Mode

    return (
        <div>
            <h1>Fate Reading</h1>

            <div>
                <p>Your Question:</p>
                <p>{question || 'No question provided.'}</p>
            </div>
            <div>
                <p>Card Amount:</p>
                <p>{cardAmount || 'No amount provided.'}</p>
            </div>

            <div>
                <p>Drawn Cards:</p>
                <div className="cards-container">
                    {randomCards.map((shortName, idx) => (
                    <img
                        key={idx}
                        src={cardImages[shortName]}
                        alt={shortName}
                        className="card-image"
                    />
                ))}
            </div>
            
        </div>
            <button onClick={() => navigate('/Screens/LazySusan')}>Next</button>
            <button onClick={() => navigate('/Screens/TypeSelect')}>Type Select</button>
        </div>
    )
}

export default FateReading
