import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false); // Time ran out, answer is incorrect
      return;
    }

    const timeoutId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // reset for next question
    onAnswered(isCorrect);
  }

  return (
    <div className="question-card">
      <h2>{question.prompt}</h2>
      <div className="answers">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index === question.correctIndex)}
          >
            {answer}
          </button>
        ))}
      </div>
      <p>⏳ {timeRemaining} seconds remaining</p>
    </div>
  );
}

export default Question;
