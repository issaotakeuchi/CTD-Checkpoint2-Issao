import { useContext, useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import api from "../services/api";
import { AuthContext } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../providers/ThemeContext';

const ScheduleForm = () => {
  const { userData } = useContext(AuthContext);

  const [patients, setPatients] = useState([]);

  const [patientSelected, setPatientSelected] = useState("");

  const [dentists, setDentists] = useState([]);

  const [dentistSelected, setDentistSelected] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");

  const { token } = userData;

  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api buscando TODOS os dentistas
    //e pacientes e carregar os dados em 2 estados diferentes
    getAllDentists();
    getAllPatients();
  }, []);

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    event.preventDefault();
    postAppointment();
  };

  async function getAllDentists() {
    try {
      const response = await api.get("/dentista", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDentists(response.data);
    } catch (e) {
      alert(e.message);
    }
  }

  async function getAllPatients() {
    try {
      const response = await api.get("/paciente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(response.data.body);
    } catch (e) {
      alert(e.message);
    }
  }

  async function postAppointment() {
    const data = {
      paciente: {
        matricula: patientSelected,
      },
      dentista: {
        matricula: dentistSelected,
      },
      endereco: {},
      dataHoraAgendamento: appointmentDate,
    };

    try {
      const config = { headers: { Authorization: `Bearer ${token}`} }
      alert(JSON.stringify(data))
      alert(token)
      await api.post("/consulta", data, config)
      alert("appointment confirmed!");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist" value={dentistSelected} onChange={(e) => setDentistSelected(e.target.value)}>
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}
                {dentists.map((dentist) => (
                  <option key={dentist.matricula} value={dentist.matricula}>{`${dentist.nome} ${dentist.sobrenome}`}</option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select className="form-select" name="patient" id="patient" value={patientSelected} onChange={(e) => setPatientSelected(e.target.value)}>
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                {patients.map((patient) => (
                  <option key={patient.matricula} value={patient.matricula}>{`${patient.nome} ${patient.sobrenome}`}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-light ${styles.button
                }`}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
