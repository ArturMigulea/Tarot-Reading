import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div>
        <label htmlFor="userQuestion">Type In Your Question:</label>
        <input
          type="text"
          id="userQuestion"
          value={u_Question}
          onChange={handleChange}
        />
      </div>

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
