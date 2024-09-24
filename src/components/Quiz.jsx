import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Questions from "./Questions.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAns, setUserAns] = useState([]);

  const activeQuestionIndex = userAns.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAns = useCallback(function handleSelectAns(selectedAns) {
    console.log("handle select answre");
    setUserAns((prevUserAns) => {
      return [...prevUserAns, selectedAns];
    });
  }, []);

  const handleSkipAns = useCallback(
    () => handleSelectAns(null),
    [handleSelectAns]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAns} />;
  }

  return (
    <div id="quiz">
      <Questions
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSkipAnswer={handleSkipAns}
        onSelectAnswer={handleSelectAns}
      />
    </div>
  );
}
