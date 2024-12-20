import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { PropagateLoader } from "react-spinners";

import service from "../services/config";
import { AuthContext } from "../context/auth.context";

import JetSkiCard from "../components/JetSkiCard";
import EditUserModal from "../components/modals/EditUserModal";
import AddJetSkiModal from "../components/modals/AddJetSkiModal";

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
      navigate("/error");
    }
  };

  const hasReservationWithOwner = reservations.some(
    (eachReservation) => eachReservation.owner._id === ownerId
  );

  if (!owner || !jetSki || !reservations) {
    return (
      <div className="loading-screen">
        <h3>Cargando perfil...</h3>
        <PropagateLoader color="#EAD8B1" margin={5} size={20} />
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="user-details">
        <img src={owner.photo} alt="Foto de perfil" />
        <div className="user-data">
          <h2>{owner.username}</h2>
          {(loggedUserId === owner._id || hasReservationWithOwner) && (
            <>
              <h3>{owner.email}</h3>
              <h3>
                {owner.phoneNumber
                  ? owner.phoneNumber
                  : loggedUserId === owner._id
                  ? "Añade tu número de teléfono"
                  : "El usuario no ha proporcionado un número de teléfono."}
              </h3>
            </>
          )}
        </div>
        {loggedUserId === ownerId && (
          <div className="owner-actions">
            <EditUserModal
              userId={ownerId}
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
            <p>Aún no has añadido ningún vehículo.</p>
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
        <div className="reservation-container">
          <h2>Tus Reservas</h2>
          {reservations.length === 0 ? (
            <p>No tienes reservas aún.</p>
          ) : (
            reservations.map((eachReservation) => (
              <div key={eachReservation._id} className="reservation-card">
                <div className="reservation-header">
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

                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h4>Contacta con el cliente</h4>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Link to={`/profile/${eachReservation.user._id}`}>
                        <p>
                          <i className="fas fa-user"></i>{" "}
                          <span style={{ color: "#3A6D8C" }}>
                            {eachReservation.user.username}
                          </span>
                        </p>
                      </Link>
                      <p>
                        <i className="fas fa-envelope"></i>{" "}
                        {eachReservation.user.email}
                      </p>
                      <p>
                        <i className="fas fa-phone"></i>{" "}
                        {eachReservation.user.phoneNumber || "No disponible"}
                      </p>
                      <Link to={`/jet-ski/${eachReservation.jetSki._id}`}>
                        <p>
                          <i className="fas fa-ship"></i>{" "}
                          <span style={{ color: "#3A6D8C" }}>
                            Ver moto
                          </span>
                        </p>
                      </Link>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <div className="price-section">
                  <p className="price">{eachReservation.price}€</p>
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
