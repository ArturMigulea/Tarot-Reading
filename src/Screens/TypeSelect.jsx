import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import MultiUseButton from "../Components/MultiUseButton";

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
        <div className='ScreenContainer crystalBall-bg-img bg-img'>
            <div>
                <label htmlFor="userQuestion">Type In Your Question:</label>
                <input
                    type="text"
                    id="userQuestion"
                    value={u_Question} // Bind the input's value to the state variable
                    onChange={handleChange} // Call handleChange when the input value changes
                />
            </div>
            {/* onClick={() => handleNext(1)} Waits until the button is actually clicked */}
            {/* Either pass 1 card or 3 cards to the next screen */}

            <MultiUseButton
                buttons={[
                    {
                        label: "1 Card Reading",
                        onClick: () => handleNext(1)
                    },
                    {
                        label: "3 Card Reading",
                        onClick: () => handleNext(3)
                    }
                ]}
            />
            <p>A one-card tarot reading provides a quick, focused insight into your question</p>
            <p>While a three-card reading offers a deeper perspective by revealing how the past, present, and future interact to shape your fate.</p>
        </div>
    )
}

export default TypeSelect
