import styles from "./Button.module.css";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button
      className={styles.button}
      style={props.bgcolor && { backgroundColor: props.bgcolor }}
      onClick={props.callback}
    >
      {props.children || "Submit"}
    </button>
  );
};

Button.propTypes = {
  callback: PropTypes.func,
  children: PropTypes.node,
  bgcolor: PropTypes.string,
};

export default Button;
