import { useEffect } from "react";
import styles from "./FlipCard.module.css";

const FlipCard = ({ flashcard, isFlipped, setIsFlipped }) => {
  const onKeyPressed = (e) => {
    if (e.key === " ") {
      setIsFlipped(true);
      window.removeEventListener("keydown", onKeyPressed, true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyPressed, true);
    return () => {
      window.removeEventListener("keydown", onKeyPressed, true);
    };
  });

  return (
    <div className={styles.flipCard} onClick={() => setIsFlipped(true)}>
      <div className={styles.front}>
        <h2>{flashcard.front}</h2>
      </div>
      {!isFlipped ? (
        <div className={styles.nextSide}>
          {/* arrow down icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
          <h4>Next Side</h4>
          <code>Space</code>
        </div>
      ) : (
        <div className={styles.back}>
          <h3>{flashcard.back}</h3>
        </div>
      )}
    </div>
  );
};

export default FlipCard;
