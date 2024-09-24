import { useEffect, useState } from "react";

export default function QuestionTimer({ onTimeout, timeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("setting timeout");

    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("setting interval");

    const interval = setInterval(() => {
      setRemainingTime((prevRemaingTime) => prevRemaingTime - 100);
    }, 100);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}
