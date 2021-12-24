import styles from "./SignUp.module.css";
import { useState } from "react";
import TextInput from "../../common/components/TextInput";
import Button from "../../common/components/Button";
import { useSignUp } from "../../common/hooks/useSignUp";

const SignUp = () => {
  const signup = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.layout}>
      <form
        className={styles.form}
        onSubmit={() => {
          signup({ email, password });
        }}
      >
        <h1 className={styles.title}>Sign Up</h1>
        <TextInput placeholder="Email" state={email} setState={setEmail} />
        <TextInput
          placeholder="Password"
          state={password}
          setState={setPassword}
          type="password"
        />
        <Button
          callback={(event) => {
            event.preventDefault();
            signup({ email, password });
            setEmail("");
            setPassword("");
          }}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
