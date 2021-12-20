import { Link } from "react-router-dom";
import styles from "./DeckCard.module.css";

const DeckCard = (props) => {
  return (
    <Link to={`/deck/${props.deck.id}`}>
      <div className={styles.card}>
        <h2 className={styles.title}>{props.deck.name}</h2>
        <h3>
          {props.deck.flashcards.length}{" "}
          {props.deck.flashcards.length === 1 ? "card" : "cards"}
        </h3>
      </div>
    </Link>
  );
};

export default DeckCard;
