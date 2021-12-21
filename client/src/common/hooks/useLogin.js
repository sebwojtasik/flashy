import { useApolloClient, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const useLogin = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const login = async (variables) => {
    client
      .mutate({
        mutation: gql`
          mutation loginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password)
          }
        `,
        variables,
      })
      .then((data) => {
        if (data.data === null) {
          toast.error("Invalid email or password");
        } else {
          client.resetStore().then(() => navigate("/", { replace: true }));
        }
      });
  };
  return login;
};
