import { useEffect } from "react";
import useSession from "../../services/session/useSession";

const Account = () => {
  const { createSession } = useSession();

  useEffect(() => {});

  return <p>Session test</p>;
};

export default Account;
