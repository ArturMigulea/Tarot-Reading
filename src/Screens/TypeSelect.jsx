import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TypeSelect.css';

import MultiUseButton from "../Components/MultiUseButton";
import MysticToast from "../Components/MysticToast"; // <- make sure this path is correct

function TypeSelect() {
  const navigate = useNavigate();

  const [u_Question, setInputValue] = useState('');      // user input
  const [toastVisible, setToastVisible] = useState(false); // toast starts HIDDEN

  const handleChange = (event) => {
    setInputValue(event.target.value);
    // optional: hide toast when user starts typing again
    if (toastVisible) {
      setToastVisible(false);
    }
  };

  const handleNext = (cardCount) => {
    // If no question → show toast, don't navigate
    if (!u_Question.trim()) {
      setToastVisible(true);
      return;
    }

    // Question exists → proceed
    navigate('/Screens/FateReading', {
      state: { question: u_Question, cardAmount: cardCount }
    });
  };

  return (
    <div className='ScreenContainer crystalBall-bg-img bg-img'>
      <div className="question-block">
        <label htmlFor="userQuestion">Type In Your Question:</label>
        <input
          type="text"
          id="userQuestion"
          value={u_Question}
          onChange={handleChange}
        />
      </div>

      <p className="Explanation">When asking a tarot question, focus on what you truly want to understand
        and let your curiosity lead the way. A one-card reading gives a quick,
        sharp beam of insight on your situation, while a three-card spread deepens the story
        by showing how your past, present, and future energies weave together to shape what comes next.</p>

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

      {/* Toast lives here, at the root of the screen */}
      <MysticToast
        message="Please enter a question before continuing."
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

export default TypeSelect;
