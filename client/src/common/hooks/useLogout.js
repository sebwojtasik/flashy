import { useApolloClient, gql } from "@apollo/client";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const client = useApolloClient();
  const navigate = useNavigate();

  const logout = async (variables) => {
    client
      .query({
        query: gql`
          query logout {
            logout
          }
        `,
      })
      .then(() => navigate("/", { replace: true }))
      .then(() => client.resetStore());
  };
  return logout;
};
