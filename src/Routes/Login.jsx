import LoginForm from "../Components/LoginForm";
import { ThemeContext } from '../providers/ThemeContext'
import { useContext } from "react"

const Login = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <>
    <div className={theme === 'light' ? 'light' : 'dark'}>
      <h1>Login</h1>
      <LoginForm />
    </div>
    </>
  );
};

export default Login;
