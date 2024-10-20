import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import service from "../services/config";
import { Modal, Button } from "react-bootstrap";

function JetSkiDetails() {
  const { isLoggedIn, loggedUserRole, loggedUserId } = useContext(AuthContext);
  const { jetSkiId } = useParams();
  const navigate = useNavigate();

  const [jetSki, setJetSki] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showWarning, setShowWarning] = useState(false); // Modal cuando no está autenticado y quiere ver el perfil del propietario

  useEffect(() => {
    getJetSkis();
  }, []);

  const getJetSkis = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/jet-ski/${jetSkiId}`
      );
      setJetSki(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReservation = async () => {
    try {
      const response = await service.post(`/reservation/${jetSkiId}`, {
        reservationDate: selectedDate,
      });

      setErrorMessage("");

      if (loggedUserRole === "owner") {
        navigate(`/owner/${loggedUserId}`);
      } else {
        navigate(`/profile/${loggedUserId}`);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error al realizar la reserva. Inténtalo de nuevo.");
      }
    }
  };

  const handleOwnerClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowWarning(true);
    }
  };

  const handleCloseWarning = () => setShowWarning(false);

  if (!jetSki) return <p>Loading...</p>;

  return (
    <div className="jetski-details">
      {jetSki.images.length > 0 && (
        <img src={jetSki.images[0]} alt={jetSki.name} />
      )}

      <div className="jetski-header">
        <h1>{jetSki.name}</h1>
        <Link to={`/owner/${jetSki.owner._id}`} onClick={handleOwnerClick}>
          <h2>{jetSki.owner.username}</h2>
        </Link>
      </div>

      <div className="jetski-info">
        <p>{jetSki.description}</p>

        {/* Condición según autenticación */}
        <div className="reservation-container">
          <h2 className="price"> {jetSki.price}€</h2>

          {isLoggedIn ? (
            <div className="date-reservation">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // No permitir fechas pasadas
              />

              {errorMessage && (
                <p style={{ color: "red", marginTop: "1rem" }}>
                  {errorMessage}
                </p>
              )}

              <button
                className="btn-reserve"
                disabled={!selectedDate}
                onClick={handleReservation}
              >
                <h4>Reserva ahora</h4>
              </button>
            </div>
          ) : (
            <div className="login-reservation">
              <p>Solo los usuarios registrados pueden reservar</p>
              <Button variant="primary" as={Link} to="/login">
                Inicia sesión
              </Button>
              <Button
                variant="secondary"
                as={Link}
                to="/signup"
                className="ms-2"
              >
                Regístrate
              </Button>
            </div>
          )}
        </div>
      </div>

      <Modal show={showWarning} onHide={handleCloseWarning}>
        <Modal.Header closeButton>
          <Modal.Title>Inicia sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Debes iniciar sesión para poder acceder al perfil del propietario
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" as={Link} to="/login">
            Inicia sesión
          </Button>
          <Button variant="info" as={Link} to="/signup">
            Regístrate
          </Button>
          <Button variant="secondary" onClick={handleCloseWarning}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default JetSkiDetails;
