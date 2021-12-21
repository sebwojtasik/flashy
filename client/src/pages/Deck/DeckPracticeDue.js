import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import LoadingScreen from "../../common/components/LoadingScreen";
import Practice from "../../modules/Practice";

const DeckPracticeDue = () => {
  const params = useParams();
  const GET_DUE_FROM_DECK = gql`
    query dueFromDeck($deckId: ID!) {
      dueFromDeck(deckId: $deckId) {
        front
        back
        due
        retention
        reviews
        new
        id
        nextReview
      }
    }
  `;

  const { data, loading } = useQuery(GET_DUE_FROM_DECK, {
    variables: { deckId: params.id },
  });
  if (loading) return <LoadingScreen />;
  if (data)
    return (
      <Practice flashcards={data.dueFromDeck} callingQuery="dueFromDeck" />
    );
};

export default DeckPracticeDue;
