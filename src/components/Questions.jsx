import { useState } from "react";
import Answers from "./Answers.jsx";
import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";

export default function Questions({ index, onSelectAnswer, onSkipAns }) {
  const [ans, setAns] = useState({
    selectedAns: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer) {
    setAns({
      selectedAns: answer,
      isCorrect: null,
    });
    setTimeout(() => {
      setAns({
        selectedAns: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });
      setTimeout(() => {
        onSelectAnswer(ans);
      }, 2000);
    }, 1000);
  }
  let answerState = "";

  if (ans.selectedAns && ans.isCorrect !== null) {
    answerState = ans.isCorrect ? "correct" : "wrong";
  } else if (ans.selectedAns) {
    answerState = ans;
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAns} />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAns={ans.selectedAns}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
