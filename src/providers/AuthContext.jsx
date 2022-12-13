import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const [isLogged, setIsLogged] = useState(false);

  function fillUserDataState({ token }) {
    localStorage.setItem("@authDentist", JSON.stringify({ token }));

    setUserData({ ...userData, token });
    setIsLogged(true);
  }

  function emptyUserData() {
    localStorage.removeItem("@authDentist");
    setIsLogged(false);
  }

  useEffect(() => {
    const response = localStorage.getItem("@authDentist");

    let user;

    if (response) {
      user = JSON.parse(response);

      fillUserDataState({ token: user.token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ userData, fillUserDataState, isLogged, emptyUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
