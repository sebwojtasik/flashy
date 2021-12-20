import { useNavigate, useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import styles from "./Deck.module.css";
import { toast } from "react-toastify";
import Card from "../../common/components/Card";
import Button from "../../common/components/Button";
import Badge from "../../common/components/Badge";
import AddCardButton from "./AddCardButton";
import LoadingScreen from "../../common/components/LoadingScreen";
import EditCardModal from "./EditCardModal";
import { useState } from "react";
import RetentionBadge from "./RetentionBadge";

const Deck = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFlashcard, setEditFlashcard] = useState({
    front: "",
    back: "",
    id: "",
  });
  const navigate = useNavigate();
  const params = useParams();
  const GET_DECK = gql`
    query getDeck($deckId: ID!) {
      deck(id: $deckId) {
        name
        flashcards {
          front
          back
          due
          retention
          reviews
          new
          id
        }
      }
    }
  `;

  const { data, loading } = useQuery(GET_DECK, {
    variables: { deckId: params.id },
  });

  if (loading) return <LoadingScreen />;
  if (data.deck) {
    // TODO: consider performing this on the server
    const deckCardsRetention = data.deck.flashcards.reduce((acc, curr) => {
      return acc + curr.retention;
    }, 0);
    const deckReviews = data.deck.flashcards.reduce((acc, curr) => {
      return acc + curr.reviews;
    }, 0);
    const deckRetention = Math.round((deckCardsRetention / deckReviews) * 100);
    const newCards = data.deck.flashcards.filter(
      (card) => card.new === true
    ).length;
    const dueCards = data.deck.flashcards.filter((card) => {
      return new Date(parseInt(card.due)) < new Date() && card.new === false;
    }).length;

    return (
      <>
        <EditCardModal
          flashcard={editFlashcard}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          deckId={params.id}
        />
        <div className={styles.menu}>
          <h1 className={styles.title}>
            {data.deck.name}
            {deckRetention > 0 ? (
              <RetentionBadge retention={deckRetention}>
                {" "}
                retention
              </RetentionBadge>
            ) : null}
            <Badge>{data.deck.flashcards.length} cards</Badge>
          </h1>
          <div>
            <Button
              callback={() => {
                navigate("new");
              }}
            >
              Learn new <Badge style={{ fontSize: "0.7em" }}>{newCards}</Badge>
            </Button>
            <Button
              callback={() => {
                navigate("due");
              }}
            >
              Study due <Badge style={{ fontSize: "0.7em" }}>{dueCards}</Badge>
            </Button>
          </div>
        </div>
        <div className={styles.flashcardContainer}>
          <AddCardButton
            callback={() => {
              setEditFlashcard({ front: "", back: "", id: "" });
              setIsModalOpen(true);
            }}
          />
          {data.deck.flashcards.map((flashcard) => (
            <Card
              key={flashcard.id}
              flashcard={flashcard}
              onClick={() => {
                setEditFlashcard(flashcard);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </>
    );
  } else {
    toast.error("Deck not found");
    return <h1>Error :(</h1>;
  }
};

export default Deck;
