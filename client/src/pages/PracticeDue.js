import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import LoadingScreen from "../common/components/LoadingScreen";
import Practice from "../modules/Practice";

const PracticeDue = () => {
  const params = useParams();
  const GET_DUE_FLASHCARDS = gql`
    query dueFlashcards {
      dueFlashcards {
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

  const { data, loading } = useQuery(GET_DUE_FLASHCARDS, {
    variables: { deckId: params.id },
  });
  if (loading) return <LoadingScreen />;
  if (data)
    return (
      <Practice flashcards={data.dueFlashcards} callingQuery="dueFlashcards" />
    );
};

export default PracticeDue;
