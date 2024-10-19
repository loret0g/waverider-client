import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import service from "../services/config"
import { AuthContext } from "../context/auth.context"

import EditUserModal from "../components/EditUserModal"
import JetSkiCard from '../components/JetSkiCard'
import AddJetSkiModal from "../components/AddJetSkiModal"

function OwnerProfile() {
  const { loggedUserId } = useContext(AuthContext)
  const {ownerId} = useParams()

  const [owner, setOwner] = useState()
  const [jetSki, setJetSki] = useState([])
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    getProfile()
    getReservations()
  }, [])

  const getProfile = async () => {
    try {
      const response = await service.get(`/owner/${ownerId}`)
      setOwner(response.data.owner)
      setJetSki(response.data.jetSkis)
    } catch (error) {
      console.log(error)
    }
  }

  const getReservations = async () => {
    try {
      const response = await service.get(`/reservation/${loggedUserId}`)
      setReservations(response.data)
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
            <EditUserModal ownerId={ownerId} userData={owner} getData={getProfile} />
          </div>
        )}
      </div>

      <div className="owner-jetskis">
        <h2>Motos de {owner.username}</h2>
          <div className="container-jetski">
            {jetSki.length === 0 ? (<p>Este propietario no tiene vehículos</p>) : (
              jetSki.map((eachJetSki) => (
                <JetSkiCard key={eachJetSki._id} jetSki={eachJetSki} isOwnerView={loggedUserId === owner._id} getData={getProfile} />
              ))
            )}
            
          </div>
          {loggedUserId === owner._id && (
            <div className="owner-actions">
              <AddJetSkiModal getData={getProfile} />
            </div>
          )}
      </div>

      {loggedUserId === owner._id && (
        <div className="owner-jetskis">
          <h2>Tus reservas</h2>
          {reservations.length === 0 ? (
            <p>No tienes reservas aún.</p>
          ) : (
            reservations.map((eachReservation) => (
              <div key={eachReservation._id} className="reservation-card" style={{color: "white"}}>
                <h3>Precio: {eachReservation.price}€</h3>
                <p>Fecha de reserva: {new Date(eachReservation.reservationDate).toLocaleDateString()}</p>
                <p>Propietario: {eachReservation.owner.username}</p>
                {eachReservation.jetSki ? (
                  <p>Moto: {eachReservation.jetSki.name}</p>
                ) : (
                  <p>Moto: Información no disponible</p>  // Soluciono así cuando me da jetSki null ¬¬
                )}
              </div>
            ))
            
          )}
        </div>
      )}
    </div>
  )
}

export default OwnerProfile