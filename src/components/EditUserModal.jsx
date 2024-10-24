import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import { PuffLoader } from "react-spinners";

function EditUserModal({ userId, userData, getData }) {
  const { loggedUserId, updateLoggedUserPhoto } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    phoneNumber: userData.phoneNumber || 0,
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Manejo de apertura y cierre del modal
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
  };

  // Cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar datos al backend
  const handleFormSubmit = async () => {
    try {
      await service.put(`/profile/${userId}`, formData);
      getData(); // Actualizar los datos
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error al actualizar los datos, intenta de nuevo.");
      }
    }
  };
  /* Cloudinary */
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  // below function should be the only function invoked when the file type input changes => onChange={handleFileUpload}
  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData);

      setImageUrl(response.data.imageUrl);
      setFormData({ ...formData, photo: response.data.imageUrl });
      updateLoggedUserPhoto(response.data.imageUrl);  // Actualizo la foto de perfil en el navbar
      setIsUploading(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Hubo un problema al subir la imagen. Inténtalo de nuevo.");
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Mostrar botón solo si el usuario logueado es el propietario */}
      {loggedUserId === userId && (
        <Button id="btn-2" onClick={handleShow}>
          Editar perfil
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Nombre de usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Número de teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImages" className="mt-3">
                  <Form.Label>Selecciona una imagen</Form.Label>
                  <Form.Control
                    type="file"
                    name="images"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  <div className="modal-spinner">
                    {isUploading ? <PuffLoader color="#689BB0" margin={5} size={20} /> : null}
                    {imageUrl ? (
                      <div>
                        <img src={imageUrl} alt="img" width={200} />
                      </div>
                    ) : null}
                  </div>
                </Form.Group>
          </Form>

          {errorMessage && (
            <p style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUserModal;
