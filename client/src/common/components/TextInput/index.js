import styles from "./TextInput.module.css";

const TextInput = (props) => {
  return (
    <input
      className={styles.input}
      placeholder={props.placeholder}
      type={props.type || "text"}
      value={props.state}
      onChange={(event) => {
        props.setState(event.target.value);
      }}
    />
  );
};

export default TextInput;
