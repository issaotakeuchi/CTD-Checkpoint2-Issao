import styles from "./Form.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../providers/AuthContext';
import api from '../services/api';
import { ThemeContext } from '../providers/ThemeContext';

const LoginForm = () => {
  const navigate = useNavigate();

  const { fillUserDataState } = useContext(AuthContext);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    e.preventDefault();

    auth();
  };

  const { theme } = useContext(ThemeContext)

  async function auth() {
    validations();

    try {
      const response = await api.post("/auth", {
        username,
        password,
      });
      navigate("/home");
      fillUserDataState({
        token: response.data.token,
      });
    } catch (e) {
      alert("Error. Verify informations and try again");
    }
  }

  const validations = () => {
    if (username.length < 5) {
      alert("Login must have 5 characters at least.");
    }
    if (username.includes(" ")) {
      alert("Login cannot receive spaces.");
    }
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div data-testid="loginformtest"
        className={theme === 'light' ? `text-center card container ${styles.card}` : `text-center card container ${styles.card} ${styles.cardDark}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
