import Modal from "../../common/components/Modal";
import Button from "../../common/components/Button";

const DeleteDeckModal = ({ open, setOpen, callback }) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <h4>Delete this deck?</h4>
      <Button callback={() => setOpen(false)}>Cancel</Button>
      <Button callback={callback} bgcolor="#e34b4b">
        Delete
      </Button>
    </Modal>
  );
};

export default DeleteDeckModal;
