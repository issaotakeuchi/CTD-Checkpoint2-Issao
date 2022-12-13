import { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  function fillUserDataState({ token }) {
    localStorage.setItem("@authDentist", JSON.stringify({ token }));

    setUserData({ ...userData, token });
  }

  function emptyUserData() {
    setUserData({ token:"" });
  }

  useEffect(() => {
    const response = localStorage.getItem("@authDentist");

    let user;

    if (response) {
      user = JSON.parse(response);

      fillUserDataState({ token: user.token });
      navigate(location?.pathname);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ userData, fillUserDataState, emptyUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
