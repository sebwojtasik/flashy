import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import LoadingScreen from "../common/components/LoadingScreen";
import Practice from "../modules/Practice";

const PracticeNew = () => {
  const params = useParams();
  const GET_NEW_FLASHCARDS = gql`
    query newFlashcards {
      newFlashcards {
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

  const { data, loading } = useQuery(GET_NEW_FLASHCARDS, {
    variables: { deckId: params.id },
  });
  if (loading) return <LoadingScreen />;
  if (data)
    return (
      <Practice flashcards={data.newFlashcards} callingQuery="newFlashcards" />
    );
};

export default PracticeNew;
