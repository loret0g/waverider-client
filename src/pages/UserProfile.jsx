import { useContext, useEffect, useState } from "react";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";
import Accordion from "react-bootstrap/Accordion";

import EditUserModal from "../components/EditUserModal";

function UserProfile() {
  const { loggedUserId } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getProfile();
    getReservations();
  }, []);

  const getProfile = async () => {
    try {
      const response = await service.get(`/profile/${loggedUserId}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReservations = async () => {
    try {
      const response = await service.get(`/reservation/${loggedUserId}`);
      setReservations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
          <h2>Tus Reservas</h2>
          {reservations.length === 0 ? (
            <p>No tienes reservas aún.</p>
          ) : (
            reservations.map((eachReservation) => (
              <div key={eachReservation._id} className="reservation-card">
                {/* Información principal de la moto y la reserva */}
                <div className="reservation-details">
                  <h3>
                    {eachReservation.jetSki
                      ? eachReservation.jetSki.name
                      : "Información no disponible"}
                  </h3>
                  <h3>
                    {new Date(
                      eachReservation.reservationDate
                    ).toLocaleDateString()}
                  </h3>
                </div>

                {/* Información de contacto del propietario */}
                {/* <div className="contact-info">
            <div>
              <h4>Contacta con su propietario</h4>
              <p>{eachReservation.owner.username}</p>
              <p>Email: {eachReservation.owner.email}</p>
              <p>Teléfono: {eachReservation.owner.phoneNumber || "No disponible"}</p>
            </div>
          </div> */}
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header  style={{ padding: '0', margin: "0" }}>
                     <h4>Contacta con su propietario</h4> 
                    </Accordion.Header>
                    <Accordion.Body style={{textAlign: "left"}} >
                      <p>Nombre: {eachReservation.owner.username}</p>
                      <p>Email: {eachReservation.owner.email}</p>
                      <p>
                        Teléfono:{" "}
                        {eachReservation.owner.phoneNumber || "No disponible"}
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <div className="price-section">
                  <p className="price">Precio: {eachReservation.price}€</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
