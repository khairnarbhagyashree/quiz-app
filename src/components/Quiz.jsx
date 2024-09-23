import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Questions from "./Questions.jsx";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  const [userAns, setUserAns] = useState([]);

  const activeQuestionIndex = userAns.length;
  const quizComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAns = useCallback(function handleSelectAns(selectedAns) {
    setUserAns((prevUserAns) => {
      return [...prevUserAns, selectedAns];
    });
  }, []);

  const handleSkipAns = useCallback(
    () => handleSelectAns(null),
    [handleSelectAns]
  );

  if (quizComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz is Completed!!</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Questions
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSkipAns={handleSkipAns}
        onSelectAnswer={handleSelectAns}
      />
    </div>
  );
}
