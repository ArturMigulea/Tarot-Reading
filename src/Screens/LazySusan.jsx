import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiUseButton from "../Components/MultiUseButton";
import './LazySusan.css';

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

function LazySusan() {
    const navigate = useNavigate();
    const cardCount = shortNames.length;
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * cardCount);
        setSelectedIndex(randomIndex);
    }, [cardCount]);

    const rotateLeft = () => setSelectedIndex(prev => (prev - 1 + cardCount) % cardCount);
    const rotateRight = () => setSelectedIndex(prev => (prev + 1) % cardCount);

    // ellipse dimensions
    const radiusX = 400; // width / 2
    const radiusY = 180; // height / 2
    const angleStep = (2 * Math.PI) / cardCount;

    return (
        <div className='ScreenContainer crystalBall-bg-img bg-img'>
            <h2>Lazy Susan</h2>

            <div className="lazy-susan-wrapper">
                {/* Left arrow */}
                <button className="arrow left" onClick={rotateLeft}>⟲</button>

                <div className="lazy-susan-wheel">
                    {shortNames.map((name, index) => {
                        const offset = (index - selectedIndex + cardCount) % cardCount;
                        
                        // Fix: angle starts at bottom
                        const angle = offset * angleStep;


                        const x = radiusX * Math.sin(angle);
                        const y = radiusY * Math.cos(angle);

                        const isSelected = index === selectedIndex;

                        return (
                            <div
                                key={name}
                                className={`lazy-susan-card ${isSelected ? "selected" : "faded"}`}
                                style={{
                                    transform: `translate(${x}px, ${y}px)`,
                                    zIndex: isSelected ? 10 : 1,
                                    opacity: isSelected ? 1 : 0.6
                                }}
                            >
                                <img src={cardImages[name]} alt={name} />
                            </div>
                        );
                    })}
                </div>

                {/* Right arrow */}
                <button className="arrow right" onClick={rotateRight}>⟳</button>
            </div>

            <MultiUseButton
                buttons={[
                    { label: "Type Select", onClick: () => navigate('/Screens/TypeSelect') }
                ]}
            />
        </div>
    );
}

export default LazySusan;
