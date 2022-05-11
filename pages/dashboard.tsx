import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api.get('/me')
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);
  return (

    <>
      <h1>Dashboard Welcome {user?.email}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');
  console.log(response.data)

  return {
    props: {}
  }
});
