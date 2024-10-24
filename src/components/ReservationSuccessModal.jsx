import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ReservationSuccessModal({ show, handleClose, loggedUserId }) {
  const navigate = useNavigate();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>¡Reserva realizada con éxito!</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button id="btn-1" onClick={handleClose}>
          Seguir navegando
        </Button>
        <Button id="btn-2" onClick={() => navigate(`/profile/${loggedUserId}`)}>
          Ir a tus reservas
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReservationSuccessModal;
