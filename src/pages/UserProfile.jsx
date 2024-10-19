import { useContext, useEffect, useState } from "react";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";

import EditUserModal from "../components/EditUserModal";

function UserProfile() {
  const { loggedUserId } = useContext(AuthContext);

  const [user, setUser] = useState(null)
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    getProfile()
    getReservations()
  }, []);

  const getProfile = async () => {
    try {
      const response = await service.get(`/profile/${loggedUserId}`)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getReservations = async () => {
    try {
      const response = await service.get(`/reservation/${loggedUserId}`)
      setReservations(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  console.log(reservations[0])
  // console.log(reservations[0].jetski)

  if (!user) return <p>Loading...</p>;
  if (!reservations) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <div className="user-details">
        <h2>{user.username}</h2>
        {/* Estos dos campos tb serán... si los usuarios tienen una reserva con este perfil */}
        {loggedUserId === user._id && (
          <>
            <h3>{user.email}</h3>
            <h3>{user.phoneNumber}</h3>
          </>
        )}

        {loggedUserId === user._id && (
          <div className="owner-actions">
            <EditUserModal
              userId={loggedUserId}
              userData={user}
              getData={getProfile}
            />
          </div>
        )}
      </div>

      {loggedUserId === user._id && (
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
  );
}

export default UserProfile;
