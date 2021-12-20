import Modal from "../../common/components/Modal";
import { gql, useMutation } from "@apollo/client";
import TextInput from "../../common/components/TextInput";
import Button from "../../common/components/Button";
import { useState } from "react";

const CREATE_DECK = gql`
  mutation createDeck($name: String!) {
    createDeck(name: $name) {
      id
      name
    }
  }
`;

const NewDeckModal = ({ open, setOpen }) => {
  const [createDeck] = useMutation(CREATE_DECK, {
    // refetchQueries: ["getUserDecks"],
    update(cache, { data: { createDeck } }) {
      const { user } = cache.readQuery({
        query: gql`
          query getUserDecks {
            user {
              decks {
                id
                name
              }
            }
          }
        `,
      });
      console.log({ ...user, decks: [...user.decks, createDeck] });
      cache.writeQuery({
        query: gql`
          query getUserDecks {
            user {
              decks {
                id
                name
              }
            }
          }
        `,
        data: {
          user: { ...user, decks: [...user.decks, createDeck] },
        },
      });
    },
  });
  const [name, setName] = useState("");
  return (
    <Modal open={open} setOpen={setOpen}>
      <TextInput placeholder="Deck name" state={name} setState={setName} />
      <Button
        callback={() => {
          createDeck({ variables: { name } });
          setOpen(false);
        }}
      >
        Save
      </Button>
    </Modal>
  );
};

export default NewDeckModal;
