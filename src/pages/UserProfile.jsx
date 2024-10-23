import { useContext, useEffect, useState } from "react";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";
import Accordion from "react-bootstrap/Accordion";

import EditUserModal from "../components/EditUserModal";
import { Link, useParams } from "react-router-dom";

function UserProfile() {
  const { loggedUserId } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);

  const { userId } = useParams();

  useEffect(() => {
    getProfile();
    getReservations();
  }, []);

  const getProfile = async () => {
    try {
      const response = await service.get(`/profile/${userId}`);
      setUser(response.data);
      // console.log(response.data);
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

  const hasReservationWithUser = reservations.some(
    (eachReservation) => eachReservation.user._id === userId
  );

  if (!user || !reservations) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <div className="user-details">
          <img src={user.photo} alt="Foto de perfil" />
        <div className="user-data">
          <h2>{user.username}</h2>
          {(loggedUserId === user._id || hasReservationWithUser) && (
            <>
              <h3>{user.email}</h3>
              <h3>
                {user.phoneNumber ? user.phoneNumber
                  : loggedUserId === user._id ? "Añade tu número de teléfono"
                  : "El usuario no ha proporcionado un número de teléfono."}
              </h3>
            </>
          )}
        </div>
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
        <div className="reservation-container">
          <h2>Tus Reservas</h2>
          {reservations.length === 0 ? (
            <p>No tienes reservas aún.</p>
          ) : (
            reservations.map((eachReservation) => (
              <div key={eachReservation._id} className="reservation-card">
                {/* Información principal de la moto y la reserva */}
                <div className="reservation-header">
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
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header style={{ padding: "0", margin: "0" }}>
                      <h4>Contacta con su propietario</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Link to={`/owner/${eachReservation.owner._id}`}>
                        <p>
                          <i className="fas fa-user"></i>{" "}
                          <span style={{ color: "#3A6D8C" }}>
                            {eachReservation.owner.username}
                          </span>
                        </p>
                      </Link>
                      <p>
                        <i className="fas fa-envelope"></i>{" "}
                        {eachReservation.owner.email}
                      </p>
                      <p>
                        <i className="fas fa-phone"></i>{" "}
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
