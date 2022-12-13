import { useEffect, useContext, useState } from "react"
import Card from "../Components/Card"
import api from '../services/api'
import { AuthContext } from '../providers/AuthContext'

const Home = () => {
  const [dentists, setDentists] = useState([])

  const { userData } = useContext(AuthContext)

  const { token } = userData

  useEffect(() => {
    getDentists()
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
  }, [])

  async function getDentists() {
    try {
      const response = await api.get("/dentista", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDentists(response.data)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <>
<h1>Home</h1>
      <div className="card-grid container">
        {dentists.map((dentist) => {
          return <Card dentist={dentist} key={dentist.matricula}/>;
        })}
      </div>
    </>
  )
}

export default Home
