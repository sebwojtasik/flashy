import styles from "./AddCardButton.module.css";

const AddCardButton = (props) => {
  return (
    <div onClick={props.callback} className={styles.card}>
      <h3>+ New card</h3>
    </div>
  );
};

export default AddCardButton;
