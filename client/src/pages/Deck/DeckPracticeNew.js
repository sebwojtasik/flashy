import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import LoadingScreen from "../../common/components/LoadingScreen";
import Practice from "../../modules/Practice";

const DeckPracticeNew = () => {
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
  if (data) return <Practice flashcards={data.newFromDeck} />;
};

export default DeckPracticeNew;
