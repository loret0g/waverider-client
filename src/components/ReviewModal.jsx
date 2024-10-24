import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import service from "../services/config";

function ReviewModal({ show, handleClose, jetSkiId, setCanLeaveReview, getReviews }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddReview = async () => {
    try {
      const response = await service.post(`/review/${jetSkiId}`, {
        rating,
        comment,
      });
      setErrorMessage("");
      handleClose();
      setCanLeaveReview(false)  // Que desaparezca el botón de 'añadir reseña'
      getReviews(); // Actualizo la lista de reseñas
    } catch (error) {
      setErrorMessage("Error al enviar la reseña.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Escribe una reseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div style={{textAlign: "center"}}>
            <StarRatings
              rating={rating}
              changeRating={setRating}
              starRatedColor="gold"
              numberOfStars={5}
              name="rating"
              starDimension="2rem"
            />
          </div>
          <Form.Group className="mt-3" controlId="formComment">
            <Form.Label>Comentario</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu comentario aquí..."
            />
          </Form.Group>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button id="btn-1" onClick={handleAddReview} disabled={!rating || !comment}>
          Enviar reseña
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewModal;
