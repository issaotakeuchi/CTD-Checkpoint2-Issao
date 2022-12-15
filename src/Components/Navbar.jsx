import styles from "./Navbar.module.css"
import { useContext } from 'react'
import { ThemeContext } from '../providers/ThemeContext'
import { AuthContext } from '../providers/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { theme, handleTheme, setTheme } = useContext(ThemeContext)

  const { isLogged, emptyUserData } = useContext(AuthContext)

  const navigate = useNavigate()

  const logout = () => {
    emptyUserData()
    navigate("/login")
  }


  return (
    <header className="sticky-top">
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar navbar-dark bg-dark ou navbar-light bg-light*/}
      <nav data-testid="navbartest"
        className={theme === 'light' ? `navbar navbar-expand-sm navbar-light bg-light` : `navbar navbar-expand-sm navbar-black bg-black`}
        aria-label="Third navbar example"
      >
        <div className="container">
          {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router */}
          <a className={theme === 'light' ? `${styles.navbarBrand}` : `${styles.navbarBrand} dark`} href="/home">
            DH Odonto
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={theme === 'light' ? `nav-item ${styles.navBarLink}` : `dark nav-item ${styles.navBarLink}`}>
                {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router */}
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className={theme === 'light' ? `nav-item ${styles.navBarLink}` : `dark nav-item ${styles.navBarLink}`}>
                {/* Se o usuário estiver logado, deverá aparecer um botão de logout
                que vai apagar o token do localstorage.
                Se o usuário estiver deslogado, um link fará um redirecionamento, com react-router,
                ao formulário de login
                O botão de logout deverá ser testado darkmode
                se sim, btn-dark, se não, btn-light */}
                {!isLogged ? (
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                ) : (
                  <button
                    className={
                      theme === 'light' ? 'btn btn-light' : 'btn btn-dark'
                    }
                    onClick={logout}
                  >
                    Logout
                  </button>
                )}
              </li>
              <li className={`nav-item`}>
                {/* Ao ser clicado, esse botão mudará a aplicação para dark mode ou light mode.
                 Lembre-se de usar um estado no contexto para fazer essa alteração.
                 Na linha seguinte deverá ser feito um teste se a aplicação
                 está em dark mode e deverá utilizar o icone ☀ ou 🌙 e btn-dark ou btn-light*/}
                <button onClick={handleTheme} data-testid='btn-dark-mode'
                  className={theme === 'light' ? `btn btn-dark ${styles.btnStyle}` : `btn btn-light ${styles.btnStyle}`}
                >
                  {theme === 'light' ? '🌙' : '☀'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
