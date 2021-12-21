import { useEffect, useState } from "react";
import Button from "../../common/components/Button";
import TextInput from "../../common/components/TextInput";
import { gql, useMutation } from "@apollo/client";
import Modal from "../../common/components/Modal";

const UPDATE_FLASHCARD = gql`
  mutation updateFlashcard($data: UpdateFlashcardInput) {
    updateFlashcard(data: $data) {
      id
      front
      back
    }
  }
`;

const CREATE_FLASHCARD = gql`
  mutation createFlashcard($data: CreateFlashcardInput) {
    createFlashcard(data: $data) {
      front
      back
      due
      retention
      reviews
      new
      id
      deckId
    }
  }
`;

const DELETE_FLASHCARD = gql`
  mutation deleteFlashcard($id: ID!) {
    deleteFlashcard(id: $id) {
      id
    }
  }
`;

const EditCardModal = ({ open, flashcard, setOpen, deckId }) => {
  const [updateFlashcard] = useMutation(UPDATE_FLASHCARD, {
    update(cache, { data: { updateFlashcard } }) {
      cache.modify({
        fields: {
          id: `Flashcard:${updateFlashcard.id}`,
          front: (value) => updateFlashcard.front,
          back: (value) => updateFlashcard.back,
        },
      });
    },
  });

  const [createFlashcard] = useMutation(CREATE_FLASHCARD, {
    update(cache, { data: { createFlashcard } }) {
      cache.writeFragment({
        id: `Flashcard:${createFlashcard.id}`,
        fragment: gql`
          fragment Flashcard on Flashcard {
            front
            back
            due
            retention
            reviews
            new
            id
            deckId
          }
        `,
        data: createFlashcard,
      });
      cache.modify({
        fields: {
          [`deck({"id":"${deckId}"})`]: (value) => ({
            ...value,
            flashcards: [
              ...value.flashcards,
              { __ref: `Flashcard:${createFlashcard.id}` },
            ],
          }),
          newFlashcards: (value) => [
            ...value,
            { __ref: `Flashcard:${createFlashcard.id}` },
          ],
          flashcards: (value) => [...value, createFlashcard.id],
        },
      });
    },
  });

  const [deleteFlashcard] = useMutation(DELETE_FLASHCARD, {
    update(cache, { data: { deleteFlashcard } }) {
      cache.evict({ id: `Flashcard:${deleteFlashcard.id}` });
    },
  });

  const [front, setFront] = useState(" ");
  const [back, setBack] = useState(" ");

  useEffect(() => {
    setFront(flashcard.front);
    setBack(flashcard.back);
  }, [flashcard]);

  const handleSave = (e) => {
    e.preventDefault();
    if (flashcard.id) {
      updateFlashcard({
        variables: {
          data: {
            id: flashcard.id,
            front,
            back,
          },
        },
      });
    } else {
      createFlashcard({
        variables: {
          data: {
            front,
            back,
            deckId,
          },
        },
      });
    }
    setOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteFlashcard({
      variables: {
        id: flashcard.id,
      },
    });
    setOpen(false);
  };
  return (
    <Modal open={open} setOpen={setOpen}>
      <TextInput placeholder="Front" state={front} setState={setFront} />
      <TextInput placeholder="Back" state={back} setState={setBack} />
      <Button callback={handleSave}>Save</Button>
      {flashcard.id && (
        <Button callback={handleDelete} bgcolor="#e34b4b">
          Delete
        </Button>
      )}
    </Modal>
  );
};

export default EditCardModal;
