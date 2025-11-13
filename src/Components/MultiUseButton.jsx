import React from "react";
import './MultiUseButton.css';

export default function MultiUseButton({
    buttons = [],
    onClick, // optional global handler
}) {
    return (
        <div className="reading-actions">
            {buttons.map((btn, index) => {
                const handleClick = () => {
                    // 1. Call button-specific click
                    if (btn.onClick) btn.onClick();

                    // 2. Call global click & pass button info
                    if (onClick) onClick(btn, index);
                };

                return (
                    <React.Fragment key={index}>
                        <button className="action-btn" onClick={handleClick}>
                            {btn.label}
                        </button>

                        {index < buttons.length - 1 && (
                            <div className="action-divider" />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
