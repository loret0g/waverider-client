import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import service from "../services/config"
import { AuthContext } from "../context/auth.context"

import EditUserModal from "../components/EditUserModal"
import JetSkiCard from '../components/JetSkiCard'
import AddJetSkiModal from "../components/AddJetSkiModal"

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
    <div className="user-profile">
      <div className="user-details">
        <h2>{owner.username}</h2>
        {/* Estos dos campos serán... si los usuarios tienen una reserva con este propietario */}
        {loggedUserId === ownerId && (
        <>
          <h3>{owner.email}</h3>
          <h3>{owner.phoneNumber}</h3>
        </>
        )}
        
        {loggedUserId === owner._id && (
          <div className="owner-actions">
            <EditUserModal userId={ownerId} userData={owner} getData={getData} />
          </div>
        )}
      </div>

      <div className="owner-jetskis">
        <h2>Motos de {owner.username}</h2>
          <div className="container-jetski">
            {jetSki.length === 0 ? (<p>Este propietario no tiene vehículos</p>) : (
              jetSki.map((eachJetSki) => (
                <JetSkiCard key={eachJetSki._id} jetSki={eachJetSki} isOwnerView={loggedUserId === owner._id} getData={getData} />
              ))
            )}
            
          </div>
          {loggedUserId === owner._id && (
            <div className="owner-actions">
              <AddJetSkiModal getData={getData} />
            </div>
          )}
      </div>

      {loggedUserId === owner._id && (
          <div className="owner-jetskis">
            <h2>Tus reservas</h2>
            <h2>... in processssss</h2>
          </div>
        )}
    </div>
  )
}

export default OwnerProfile