import React from "react";
import './MultiUseButton.css';

export default function MultiUseButton({
    buttons = [], // An array to store the different buttons in a single MultiUseButton
    onClick, // optional global handler
}) {
    return (
        <div className="reading-actions">
            {buttons.map((btn, index) => {

                // Handle the click event of a button, and the global value of the onclick event if there is one
                const handleClick = () => {
                    // Call button-specific click
                    if (btn.onClick) btn.onClick();

                    // Call global click & pass which button was pressed
                    if (onClick) onClick(btn, index);
                };

                {/* Fragments allow you to group different compoenents without the need to group in a <div> */}
                return (
                    <React.Fragment key={index}>
                        <button className="action-btn" onClick={handleClick}>
                            {btn.label}
                        </button>

                        {/* Check that there is another button to draw the vertical seperator*/}
                        {index < buttons.length - 1 && (
                            <div className="action-divider" />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
