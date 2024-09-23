import { useRef } from "react";

export default function Answers({
  answers,
  selectedAns,
  answerState,
  onSelect,
}) {
  const shuffleAns = useRef();

  if (!shuffleAns.current) {
    shuffleAns.current = [...answers];
    shuffleAns.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffleAns.current.map((answer) => {
        const isSelected = selectedAns === answer;
        let cssClass = "";
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
