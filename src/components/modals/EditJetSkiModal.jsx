import { useState } from "react";
import service from "../../services/config";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PuffLoader } from "react-spinners";

function EditJetSkiModal({ jetSki, getData }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: jetSki.name,
    year: jetSki.year,
    horsepower: jetSki.horsepower,
    description: jetSki.description,
    price: jetSki.price,
    deposit: jetSki.deposit,
    images: jetSki.images || [],
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setErrorMessage("");
    setConfirmDelete(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await service.put(
        `/owner/jet-ski/${jetSki._id}`,
        formData
      );
      getData();
      handleClose();
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error al actualizar los datos, inténtalo de nuevo.");
      }
    }
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/owner/jet-ski/${jetSki._id}`);
      getData();
      handleClose();
    } catch (error) {
      setErrorMessage("Error al eliminar la moto, inténtalo de nuevo.");
    }
  };

  /* Cloudinary */
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // for a loading animation effect

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await service.post("/upload", uploadData);

      setImageUrl(response.data.imageUrl);
      setFormData({ ...formData, images: response.data.imageUrl });
      setIsUploading(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Hubo un problema al subir la imagen. Inténtalo de nuevo.");
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button
        id="btn-2"
        onClick={handleShow}
        style={{ marginBottom: "1rem" }}
      >
        Editar Moto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Moto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!confirmDelete ? (
            <>
              <Form>
            <Form.Group controlId="formName">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="formYear" className="mt-3">
              <Form.Label>Año de fabricación</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formHorsepower" className="mt-3">
              <Form.Label>Potencia (Caballos de fuerza)</Form.Label>
              <Form.Control
                type="number"
                name="horsepower"
                value={formData.horsepower}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>
            <Form.Group controlId="formPrice" className="mt-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formTopSpeed" className="mt-3">
              <Form.Label>Depósito / Fianza</Form.Label>
              <Form.Control
                type="number"
                name="deposit"
                value={formData.deposit}
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
                {isUploading ? (
                  <PuffLoader color="#689BB0" margin={5} size={20} />
                ) : null}
                {imageUrl ? (
                  <div>
                    <img src={imageUrl} alt="img" width={200} />
                  </div>
                ) : null}
              </div>
            </Form.Group>
          </Form>
              {errorMessage && (
                <p className="error-message">
                  {errorMessage}
                </p>
              )}
            </>
          ) : (
            <p>¿Estás seguro de que deseas eliminar esta moto?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!confirmDelete ? (
            <>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Eliminar Moto
              </Button>

              <Button variant="primary" onClick={handleFormSubmit}>
                Guardar Cambios
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setConfirmDelete(false)}
              >
                No, cancelar
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Sí, eliminar
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditJetSkiModal;
