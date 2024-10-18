import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import service from "../services/config"
import JetSkiCard from '../components/JetSkiCard'

import { AuthContext } from "../context/auth.context"

function OwnerProfile() {

  const { loggedUserId } = useContext(AuthContext)

  const [owner, setOwner] = useState()
  const [jetSki, setJetSki] = useState([])

  const {ownerId} = useParams()

  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    try {
      const response = await service.get(`/owner/${ownerId}`)
      setOwner(response.data.owner)
      setJetSki(response.data.jetSkis)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(owner)
  console.log(jetSki)

  if (!owner) return <p>Loading...</p>


  return (
    <div className="owner-profile">
      <div className="owner-details">
        <h2>{owner.username}</h2>
        {/* <p>Email: {owner.email}</p> */}

        {loggedUserId === owner._id && (
          <div className="owner-actions">
            <button>
              <Link to={`/profile/${owner._id}/edit`}>Editar datos</Link>
            </button>
          </div>
        )}


      </div>

      <div className="owner-jetskis">
        <h2>Motos de {owner.username}</h2>
        {jetSki.length === 0 ? (
          <p>No hay motos disponibles</p>
        ) : (
          <div className="container-jetski">
            {jetSki.length === 0 ? (<p>Este propietario no tiene vehículos</p>) : (
          jetSki.map((eachJetSki) => (
            <JetSkiCard key={eachJetSki._id} jetSki={eachJetSki} />
          ))
        )}
        {loggedUserId === owner._id && (
          <div className="owner-actions">
            <button>
              <Link to={`/profile/${owner._id}/add-jet-ski`}>Añadir moto</Link>
            </button>
          </div>
        )}
            {/* {jetSki.map((jetSki) => (
              <div key={jetSki._id} className="jetski-card">
                {jetSki.images.length > 0 && (
                  <img src={jetSki.images[0]} alt={jetSki.name} />
                )}
                <h4>{jetSki.name}</h4>
                <p>{jetSki.price} €</p>
              </div>
            ))} */}
          </div>
        )}
      </div>
    </div>
  )
}

export default OwnerProfile