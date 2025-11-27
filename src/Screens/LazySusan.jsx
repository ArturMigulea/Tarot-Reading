import { useState, useEffect, useRef } from 'react';
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

  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animationFrame = useRef(null);

  // Fixed ellipse radii (never changes)
  const radiusX = 400; // horizontal width
  const radiusY = 120; // vertical height
  const angleStep = (2 * Math.PI) / cardCount;

  // Initial random card
  useEffect(() => {
    setSelectedIndex(Math.floor(Math.random() * cardCount));
  }, [cardCount]);

  const rotateLeft = () => setSelectedIndex(prev => (prev - 1 + cardCount) % cardCount);
  const rotateRight = () => setSelectedIndex(prev => (prev + 1) % cardCount);

  // Drag handlers
  const startDrag = (e) => {
    dragging.current = true;
    lastX.current = e.touches ? e.touches[0].clientX : e.clientX;
    velocity.current = 0;
    cancelAnimationFrame(animationFrame.current);
  };

  const onDrag = (e) => {
    if (!dragging.current) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = x - lastX.current;

    velocity.current = delta;

    if (Math.abs(delta) > 5) {
      const cardsToRotate = Math.floor(delta / 20);
      if (cardsToRotate !== 0) {
        setSelectedIndex(prev => (prev - cardsToRotate + cardCount) % cardCount);
        lastX.current = x;
      }
    }
  };

  const stopDrag = () => {
    dragging.current = false;

    const decay = () => {
      if (Math.abs(velocity.current) < 0.5) return;

      const cardsToRotate = Math.sign(velocity.current) * 1;
      setSelectedIndex(prev => (prev - cardsToRotate + cardCount) % cardCount);

      // friction
      velocity.current *= 0.95;

      animationFrame.current = requestAnimationFrame(decay);
    };

    animationFrame.current = requestAnimationFrame(decay);
  };

  return (
    <div className='ScreenContainer crystalBall-bg-img bg-img'>
      <div>
        <h1>Cat-alogue</h1>
        <p className="instructions">Drag your mouse across the deck to shuffle or use the arrows on-screen to flip through cards.</p>
      </div>
      <div className="lazy-susan-wrapper">
        {/* Left arrow */}
        <button className="arrow left" onClick={rotateLeft}>⟲</button>

        {/* Wheel */}
        <div className="lazy-susan-wheel">
          {shortNames.map((name, index) => {
            let diff = index - selectedIndex;
            if (diff < 0) diff += cardCount;

            // Angle calculation
            const angle = diff * angleStep; // selected at bottom
            const x = radiusX * Math.sin(angle);
            const y = radiusY * Math.cos(angle);

            const isSelected = index === selectedIndex;

            return (
              <div
                key={name}
                className={`lazy-susan-card ${isSelected ? "selected" : "faded"}`}
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  zIndex: isSelected ? 10 : 1,
                  opacity: isSelected ? 1 : 0.6,
                  transition: 'transform 0.4s ease, opacity 0.4s ease, z-index 0.4s ease'
                }}
              >
                {/* Inner div scales only the image */}
                <div style={{
                  transform: `scale(${isSelected ? 1.2 : 1})`,
                  transition: 'transform 0.4s ease'
                }}>
                  <img src={cardImages[name]} alt={name} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Drag overlay */}
        <div
          className="lazy-susan-drag-overlay"
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={startDrag}
          onTouchMove={onDrag}
          onTouchEnd={stopDrag}
        />

        {/* Right arrow */}
        <button className="arrow right" onClick={rotateRight}>⟳</button>
      </div>

      {/* Type Select button */}
      <MultiUseButton
        className="MultiUseButton"
        buttons={[
          { label: "Do Another Purr-Diction", onClick: () => navigate("/") }
        ]}
      />
    </div>
  );
}

export default LazySusan;
