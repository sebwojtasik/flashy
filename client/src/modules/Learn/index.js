import ProgressBar from "../../common/components/ProgressBar";
import Button from "../../common/components/Button";
import styles from "./Learn.module.css";
import { useEffect, useState } from "react";
import { useApolloClient, gql, useMutation } from "@apollo/client";
import LoadingScreen from "../../common/components/LoadingScreen";
import FlipCard from "../../common/components/FlipCard";

const UPDATE_FLASHCARD = gql`
  mutation updateFlashcard($data: UpdateFlashcardInput) {
    updateFlashcard(data: $data) {
      id
      reviews
      retention
      due
      new
    }
  }
`;

const Learn = ({ flashcards, callingQuery }) => {
  const client = useApolloClient();
  const [loading, setLoading] = useState(true);

  // force query refetch on first render
  useEffect(() => {
    client
      .refetchQueries({
        include: [callingQuery],
      })
      .then(() => {
        setLoading(false);
      });
  }, [callingQuery, client]);

  const [updateFlashcard] = useMutation(UPDATE_FLASHCARD, {
    update(cache, { data: { updateFlashcard } }) {
      cache.modify({
        fields: {
          id: `Flashcard:${updateFlashcard.id}`,
          due: (value) => updateFlashcard.due,
          new: (value) => false,
          reviews: (value) => updateFlashcard.reviews,
          retention: (value) => updateFlashcard.retention,
        },
      });
    },
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  });

  const handleKeyDown = (e) => {
    if (flashcards.length !== currentFlashcard && flashcards.length !== 0) {
      if (e.key === "l" || e.key === "L") {
        learned();
      }
    }
  };

  const learned = () => {
    const flashcard = flashcards[currentFlashcard];
    updateFlashcard({
      variables: {
        data: {
          due: new Date(Date.now() + 24 * 60 * 60 * 1000),
          reviews: 1,
          retention: 1,
          new: false,
          id: flashcard.id,
        },
      },
    });
    setIsFlipped(false);
    setCurrentFlashcard(currentFlashcard + 1);
  };

  const [isFlipped, setIsFlipped] = useState(false);
  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  if (loading) return <LoadingScreen />;

  if (flashcards.length === 0) {
    return (
      <div className={styles.layout}>
        <div className={styles.content}>
          <h1>You don't have any new cards to learn right now!</h1>
        </div>
      </div>
    );
  } else if (flashcards.length === currentFlashcard) {
    return (
      <div className={styles.layout}>
        <div className={styles.content}>
          <h1>Learning session complete!</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.layout}>
        <div className={styles.header}>
          <h1>
            Learn {currentFlashcard}/{flashcards.length}
          </h1>
          <ProgressBar
            completed={(currentFlashcard / flashcards.length) * 100}
          />
        </div>
        <div className={styles.content}>
          {flashcards[currentFlashcard] && (
            <FlipCard
              flashcard={flashcards[currentFlashcard]}
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
            />
          )}
        </div>
        <div className={styles.footer}>
          <Button callback={learned}>
            Learned <code>L</code>
          </Button>
        </div>
      </div>
    );
  }
};

export default Learn;
