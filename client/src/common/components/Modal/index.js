import styles from "./Modal.module.css";

const Modal = ({ children, open, setOpen }) => {
  if (open) {
    return (
      <>
        <div className={styles.overlay} onClick={() => setOpen(false)} />
        <div className={styles.modal}>{children}</div>
      </>
    );
  } else {
    return null;
  }
};

export default Modal;
