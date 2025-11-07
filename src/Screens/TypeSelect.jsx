import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function TypeSelect() {
    const navigate = useNavigate();

    // Set up the pass of parameters to Fate Reading
    const handleNext = (cardCount) => {
        navigate('/Screens/FateReading', { state: { question: u_Question, cardAmount: cardCount } });
    };

    const [u_Question, setInputValue] = useState(''); // Initialize state for the input value

    const handleChange = (event) => {
        setInputValue(event.target.value); // Update the state with the new input value
    };

    return (
        <div>
            <p>This will be where the user chooses either one or 3 cards</p>

            <div>
                <label htmlFor="userQuestion">Type In Your Question:</label>
                <input
                    type="text"
                    id="userQuestion"
                    value={u_Question} // Bind the input's value to the state variable
                    onChange={handleChange} // Call handleChange when the input value changes
                />
            </div>
            <div>
                {/* onClick={() => handleNext(1)} Waits until the button is actually clicked */}
                {/* Either pass 1 card or 3 cards to the next screen */}
                <button onClick={() => handleNext(1)}>1 Card Reading</button>
                <button onClick={() => handleNext(3)}>3 Card Reading</button>
            </div>
        </div>
    )
}

export default TypeSelect
