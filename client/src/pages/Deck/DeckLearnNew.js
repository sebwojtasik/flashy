import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import LoadingScreen from "../../common/components/LoadingScreen";
import Learn from "../../modules/Learn";

const DeckLearnNew = () => {
  const params = useParams();
  const GET_NEW_FROM_DECK = gql`
    query newFromDeck($deckId: ID!) {
      newFromDeck(deckId: $deckId) {
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

  const { data, loading, error } = useQuery(GET_NEW_FROM_DECK, {
    variables: { deckId: params.id },
  });

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error!</div>;
  if (data)
    return <Learn flashcards={data.newFromDeck} callingQuery="newFromDeck" />;
};

export default DeckLearnNew;
