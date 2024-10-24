import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginRequiredModal({ showWarning, handleCloseWarning }) {
  return (
    <Modal show={showWarning} onHide={handleCloseWarning}>
      <Modal.Header closeButton>
        <Modal.Title>Inicia sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Debes iniciar sesión para poder acceder al perfil del propietario
      </Modal.Body>
      <Modal.Footer>
        <Button id="btn-1" as={Link} to="/login">
          Inicia sesión
        </Button>
        <Button id="btn-2" as={Link} to="/signup">
          Regístrate
        </Button>
        <Button variant="secondary" onClick={handleCloseWarning}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginRequiredModal;
