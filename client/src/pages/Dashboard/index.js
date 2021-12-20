import { gql, useQuery } from "@apollo/client";
import DeckCard from "../../common/components/DeckCard";
import LoadingScreen from "../../common/components/LoadingScreen";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const GET_DECKS = gql`
    query getDecks {
      user {
        decks {
          id
          name
          flashcards {
            front
            back
          }
        }
      }
    }
  `;
  const { data, loading, error } = useQuery(GET_DECKS);
  if (error) return <p>Error :(</p>;
  if (loading) return <LoadingScreen />;
  return (
    <>
      <h1>Your decks</h1>
      <div className={styles.deckContainer}>
        {data.user.decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
