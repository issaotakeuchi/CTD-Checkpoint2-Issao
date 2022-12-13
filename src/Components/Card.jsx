import { useContext } from 'react'
import styles from "./Card.module.css";
import { ThemeContext } from '../providers/ThemeContext';

const Card = ( props ) => {
  const { dentist } = props;

  const { theme } = useContext(ThemeContext)

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          {/* Na linha seguinte o link deverá utilizar a matricula, nome e sobrenome do dentista
          que vem da API */}
          <a href={`/dentist/${dentist.matricula}`}>
            <h5 className={`card-title ${styles.title}`}>{dentist.nome}</h5>
          </a>
            <p>{dentist.usuario.username}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
