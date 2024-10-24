import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import service from "../services/config";
import { Button } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { PropagateLoader } from "react-spinners";

import StarRatings from "react-star-ratings";
import LoginRequiredModal from "../components/modals/LoginRequiredModal";
import ReviewModal from "../components/modals/ReviewModal";
import ReservationSuccessModal from "../components/modals/ReservationSuccessModal";

function JetSkiDetails() {
  const { isLoggedIn, loggedUserRole, loggedUserId } = useContext(AuthContext);
  const { jetSkiId } = useParams();
  const navigate = useNavigate();

  const [jetSki, setJetSki] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [review, setReview] = useState([]);
  const [canLeaveReview, setCanLeaveReview] = useState(false);

  const [showWarning, setShowWarning] = useState(false); // Modal cuando no está autenticado y quiere ver el perfil del propietario
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    getJetSkis();
    getReviews();
    checkCanLeaveReview();
  }, []);

  const getJetSkis = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/jet-ski/${jetSkiId}`
      );
      setJetSki(response.data);
    } catch (error) {
      console.log(error);
      console.log(error);
      navigate("/error");
    }
  };

  const getReviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/review/${jetSkiId}`
      );
      setReview(response.data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const checkCanLeaveReview = async () => {
    try {
      const response = await service.get(`/review/${jetSkiId}/${loggedUserId}`);
      setCanLeaveReview(response.data.canLeaveReview);
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
      setShowSuccessModal(true); // Modal de éxito
    } catch (error) {
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

  if (!jetSki) {
    return (
      <div className="loading-screen">
        <h3>Espera un momento...</h3>
        <PropagateLoader color="#EAD8B1" margin={5} size={20} />
      </div>
    );
  }

  return (
    <div className="jetski-details">
      <div className="jetski-pic-owner">
        {jetSki.images.length > 0 && (
          <img src={jetSki.images[0]} alt={jetSki.name} />
        )}

        <div className="jetski-header">
          <div className="rating-details">
            <h1>{jetSki.name}</h1>
            {review.length > 0 && (
              <StarRatings
                rating={
                  review.reduce(
                    (acc, eachReview) => acc + eachReview.rating,
                    0
                  ) / review.length
                }
                starRatedColor="gold"
                numberOfStars={5}
                name="rating"
                starDimension="1rem"
              />
            )}
          </div>

          <Link to={`/owner/${jetSki.owner._id}`} onClick={handleOwnerClick}>
            <div className="owner-container">
              <h2>{jetSki.owner.username}</h2>
              <img
                src={jetSki.owner.photo}
                alt="Foto propietario"
                id="owner-photo"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="jetski-tags">
        <span className="tag">{jetSki.year}</span>
        <span className="tag">{jetSki.horsepower}CV</span>
        <span className="tag">Depósito: {jetSki.deposit}€</span>
      </div>
      <div className="jetski-info">
        <p>{jetSki.description}</p>
        {/* Contenedor según si está logueado */}
        <div className="reservation-jetski-details">
          <h2> {jetSki.price}€</h2>
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
            <>
              <p>Solo los usuarios registrados pueden reservar</p>
              <div id="no-log">
                <Button id="btn-1" as={Link} to="/login">
                  Inicia sesión
                </Button>
                <Button id="btn-2" as={Link} to="/signup" className="ms-2">
                  Regístrate
                </Button>
              </div>
            </>
          )}
        </div>{" "}
        {/* cierre reservation-jetski-details */}
      </div>{" "}
      {/* cierre jetski-info */}
      <div className="reviews-container">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Valoraciones verificadas</Accordion.Header>
            <Accordion.Body id="review-body">
              {review.length > 0 ? (
                review.map((eachReview) => (
                  <div key={eachReview._id} className="review-item">
                    <div className="user-review">
                      <h4>{eachReview.user.username}</h4>
                      <StarRatings
                        rating={eachReview.rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name="rating"
                        starDimension="1rem"
                      />
                    </div>

                    <p>{eachReview.comment}</p>
                    <p id="review-date">
                      {new Date(eachReview.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", margin: "1rem" }}>
                  Aún no hay reseñas.
                </p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="add-review">
          {isLoggedIn && canLeaveReview && (
            <Button id="btn-2" onClick={() => setShowReviewModal(true)}>
              Añadir reseña
            </Button>
          )}
          <ReviewModal
            show={showReviewModal}
            handleClose={() => setShowReviewModal(false)}
            jetSkiId={jetSkiId}
            setCanLeaveReview={setCanLeaveReview} // Para actualizar el estado y que desaparezca el botón
            getReviews={getReviews} // Para actualizar la lista de reseñas al agregar la nueva
          />
        </div>
      </div>
      <LoginRequiredModal
        showWarning={showWarning}
        handleCloseWarning={handleCloseWarning}
      />
      <ReservationSuccessModal
        show={showSuccessModal}
        handleClose={() => {setShowSuccessModal(false); checkCanLeaveReview()}}
        loggedUserId={loggedUserId}
      />
    </div>
  );
}

export default JetSkiDetails;
