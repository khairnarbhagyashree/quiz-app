import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

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
  const shuffleAns = [...QUESTIONS[activeQuestionIndex].answers];
  shuffleAns.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer timeout={10000} onTimeout={handleSkipAns} />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAns.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAns(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
