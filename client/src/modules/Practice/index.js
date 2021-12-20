import Card from "../../common/components/Card";
import ProgressBar from "../../common/components/ProgressBar";
import Button from "../../common/components/Button";
import styles from "./Practice.module.css";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import PracticeCard from "./PracticeCard";

const UPDATE_FLASHCARD = gql`
  mutation updateFlashcard($data: UpdateFlashcardInput) {
    updateFlashcard(data: $data) {
      id
      due
      reviews
      retention
    }
  }
`;

const Practice = ({ flashcards, callingQuery }) => {
  // TODO: update cache manually in the future
  const refetchQueries = [
    "getUser",
    "dueFlashcards",
    "newFlashcards",
    "getDecks",
    "dueFromDeck",
    "newFromDeck",
    "getDeck",
  ].filter((query) => query !== callingQuery);

  const [updateFlashcard] = useMutation(UPDATE_FLASHCARD, {
    update(cache, { data: { updateFlashcard } }) {
      cache.writeFragment({
        id: `Flashcard:${updateFlashcard.id}`,
        fragment: gql`
          fragment Flashcard on Flashcard {
            due
            reviews
            retention
          }
        `,
        data: updateFlashcard,
      });
    },
    refetchQueries,
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  });

  const handleKeyDown = (e) => {
    if (e.key === "r" || e.key === "R") {
      remembered();
    } else if (e.key === "f" || e.key === "F") {
      forgot();
    }
  };

  const remembered = () => {
    const flashcard = flashcards[currentFlashcard];
    updateFlashcard({
      variables: {
        data: {
          due: new Date(
            parseInt(flashcard.due) + flashcard.nextReview * 24 * 60 * 60 * 1000
          ),
          reviews: flashcard.reviews + 1,
          retention: flashcard.retention + 1,
          new: false,
          id: flashcard.id,
          nextReview: flashcard.nextReview * 2,
          mastered: flashcard.nextReview * 2 === 256 ? true : false,
        },
      },
    });
    setIsFlipped(false);
    setCurrentFlashcard(currentFlashcard + 1);
  };

  const forgot = () => {
    const flashcard = flashcards[currentFlashcard];
    let nextReview =
      flashcard.nextReview === 1 ? 1 : flashcard.nextReview * 0.5;
    updateFlashcard({
      variables: {
        data: {
          due: new Date(
            parseInt(flashcard.due) + nextReview * 24 * 60 * 60 * 1000
          ),
          reviews: flashcard.reviews + 1,
          new: false,
          id: flashcard.id,
          nextReview: nextReview,
        },
      },
    });
    setIsFlipped(false);
    setCurrentFlashcard(currentFlashcard + 1);
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  if (flashcards.length === 0) {
    return (
      <div className={styles.layout}>
        <div className={styles.content}>
          <h1>You don't have any cards to practice right now!</h1>
        </div>
      </div>
    );
  } else if (flashcards.length === currentFlashcard) {
    return (
      <div className={styles.layout}>
        <div className={styles.content}>
          <h1>Practice complete!</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.layout}>
        <div className={styles.header}>
          <h1>
            Practice {currentFlashcard}/{flashcards.length}
          </h1>
          <ProgressBar
            completed={(currentFlashcard / flashcards.length) * 100}
          />
        </div>
        <div className={styles.content}>
          {flashcards[currentFlashcard] && (
            <PracticeCard
              flashcard={flashcards[currentFlashcard]}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
            />
          )}
        </div>
        <div className={styles.footer}>
          <Button callback={forgot}>
            Forgot <code>F</code>
          </Button>
          <Button callback={remembered}>
            Remembered <code>R</code>
          </Button>
        </div>
      </div>
    );
  }
};

export default Practice;
