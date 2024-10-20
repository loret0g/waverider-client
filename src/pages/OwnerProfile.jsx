import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

import service from "../services/config";
import { AuthContext } from "../context/auth.context";

import EditUserModal from "../components/EditUserModal";
import JetSkiCard from "../components/JetSkiCard";
import AddJetSkiModal from "../components/AddJetSkiModal";

function OwnerProfile() {
  const { loggedUserId } = useContext(AuthContext);
  const { ownerId } = useParams();

  const [owner, setOwner] = useState();
  const [jetSki, setJetSki] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getProfile();
    getReservations();
  }, []);

  const getProfile = async () => {
    try {
      const response = await service.get(`/owner/${ownerId}`);
      setOwner(response.data.owner);
      setJetSki(response.data.jetSkis);
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

  if (!owner) return <p>Loading...</p>;

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
            <EditUserModal
              ownerId={ownerId}
              userData={owner}
              getData={getProfile}
            />
          </div>
        )}
      </div>

      <div className="owner-jetskis">
        <h2>Motos de {owner.username}</h2>
        <div className="container-jetski">
          {jetSki.length === 0 ? (
            <p>Este propietario no tiene vehículos</p>
          ) : (
            jetSki.map((eachJetSki) => (
              <JetSkiCard
                key={eachJetSki._id}
                jetSki={eachJetSki}
                isOwnerView={loggedUserId === owner._id}
                getData={getProfile}
              />
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
          <h2>Tus Reservas</h2>
          {reservations.length === 0 ? (
            <p>No tienes reservas aún.</p>
          ) : (
            reservations.map((eachReservation) => (
              <div key={eachReservation._id} className="reservation-card">
                <div className="reservation-details">
                  <h3>
                    {eachReservation.jetSki
                      ? eachReservation.jetSki.name
                      : "Información no disponible"}{" "}
                    {/*Soluciono así cuando me da jetSki null ¬¬ */}
                  </h3>
                  <h3>
                    {new Date(
                      eachReservation.reservationDate
                    ).toLocaleDateString()}
                  </h3>
                </div>

                {/* Contacto del cliente */}
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header style={{ padding: "0", margin: "0" }}>
                      <h4>Contacta con el cliente</h4>
                    </Accordion.Header>
                    <Accordion.Body style={{ textAlign: "left" }}>
                      <p>Nombre: {eachReservation.user.username}</p>
                      <p>Email: {eachReservation.user.email}</p>
                      <p>
                        Teléfono:{" "}
                        {eachReservation.user.phoneNumber || "No disponible"}
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

export default OwnerProfile;
