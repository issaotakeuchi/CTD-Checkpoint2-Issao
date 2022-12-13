import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { AuthContext } from "../providers/AuthContext"
import api from "../services/api"

const DetailCard = () => {
  const { matricula } = useParams();

  const [dentist, setDentist] = useState({});

  const { userData } = useContext(AuthContext);

  const { token } = userData;

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    getDentistById();
  }, []);

  async function getDentistById() {
    try {
      const response = await api.get(`/dentista?matricula=${matricula}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDentist(response.data);
    } catch (e) {
      console.log("error on search dentist");
    }
  }

  return (
    //As instruções que estão com {''} precisam ser
    //substituídas com as informações que vem da api
    <>
      <h1>Detail about Dentist {dentist.nome} {dentist.sobrenome} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Name: {dentist.nome}</li>
              <li className="list-group-item">Surname: {dentist.sobrenome}</li>
              <li className="list-group-item">Id: {dentist.matricula}</li>
              <li className="list-group-item">Username: {/*{dentist.usuario.username}*/} </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-light ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
