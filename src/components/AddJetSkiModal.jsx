import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import service from '../services/config';

function AddJetSkiModal({ getData }) {
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: ''
  })
  const [errorMessage, setErrorMessage] = useState("")


  const handleShow = () => setShow(true)
  const handleClose = () => {
    setShow(false)
    setErrorMessage("")
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFormSubmit = async () => {
    try {
      await service.post('/owner/jet-ski', formData)
      getData()
      handleClose()
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error al actualizar los datos, intenta de nuevo.");
      }
    }
  }

  return (
    <>
      <Button variant="danger" onClick={handleShow} style={{marginBottom: "1rem"}}>
        Añadir una moto nueva
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir moto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nombre de la moto"
                autoFocus
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
                placeholder="Descripción de la moto"
              />
            </Form.Group>
            <Form.Group controlId="formPrice" className="mt-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Precio por día"
              />
            </Form.Group>
            <Form.Group controlId="formImages" className="mt-3">
              <Form.Label>URL de imagen</Form.Label>
              <Form.Control
                type="text"
                name="images"
                value={formData.images}
                onChange={handleInputChange}
                placeholder="URL de la imagen"
              />
            </Form.Group>
          </Form>
          {errorMessage && <p style={{ color: 'red', marginTop: "1rem" }}>{errorMessage}</p>}
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddJetSkiModal;
