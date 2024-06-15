import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { authData, setAuthData, login, logout } = useContext(AuthContext);

  return { authData, setAuthData, login, logout };
};

export default useAuth;
