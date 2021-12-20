import styles from "./SignIn.module.css";
import { useState } from "react";
import TextInput from "../../common/components/TextInput";
import Button from "../../common/components/Button";
import { useLogin } from "../../common/hooks/useLogin";

const SignIn = () => {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.layout}>
      <form
        className={styles.form}
        onSubmit={() => {
          login({ email, password });
        }}
      >
        <h1 className={styles.title}>Sign In</h1>
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
            login({ email, password });
            setEmail("");
            setPassword("");
          }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
