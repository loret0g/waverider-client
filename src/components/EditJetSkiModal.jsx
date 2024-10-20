import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import service from "../services/config";

function EditJetSkiModal({ jetSki, getData }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: jetSki.name,
    description: jetSki.description,
    price: jetSki.price,
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
      console.log(response);
      getData();
      handleClose();
    } catch (error) {
      console.log(error);
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
      console.log(error);
      setErrorMessage("Error al eliminar la moto, inténtalo de nuevo.");
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
      setFormData({ ...formData, images: response.data.imageUrl });
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <>
      <Button
        variant="secondary"
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
                  <Form.Label>Nombre de la Moto</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group controlId="formDescription" className="mt-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPrice" className="mt-3">
                  <Form.Label>Precio (€)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
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
                  {isUploading ? <h3>... uploading image</h3> : null}
                  {imageUrl ? (
                    <div>
                      <img src={imageUrl} alt="img" width={200} />
                    </div>
                  ) : null}
                </Form.Group>
              </Form>
              {errorMessage && (
                <p style={{ color: "red", marginTop: "1rem" }}>
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
