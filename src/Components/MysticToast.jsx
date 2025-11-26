import { useState, useEffect } from "react";

import "./MysticToast.css";

function MysticToast({ message, visible, onClose }) {
  const [showClass, setShowClass] = useState(false);

  useEffect(() => {
    if (visible) {
      // Set class to no show object
      setShowClass(false);

      // Next tick → add .show to trigger animation
      const t = setTimeout(() => setShowClass(true), 10);

      // Auto-close
      const auto = setTimeout(() => {
        setShowClass(false); // animate out
        setTimeout(() => onClose(), 300); // wait for fade-out to finish
      }, 2500);

      return () => {
        clearTimeout(t);
        clearTimeout(auto);
      };
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className={`mystic-toast-container ${showClass ? "show" : ""}`}>
      <div className="mystic-toast">{message}</div>
    </div>
  );
}

export default MysticToast;
