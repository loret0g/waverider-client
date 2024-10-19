import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { AuthContext } from "../context/auth.context"
import { Modal, Button } from "react-bootstrap"

function JetSkiDetails() {
  const { isLoggedIn } = useContext(AuthContext)

  const [jetSki, setJetSki] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [showWarning, setShowWarning] = useState(false)

  const {jetSkiId} = useParams()

  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/jet-ski/${jetSkiId}`)
      setJetSki(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOwnerClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault()
      setShowWarning(true)
    }
  }

  const handleCloseWarning = () => setShowWarning(false)

  if (!jetSki) return <p>Loading...</p>

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

        {/* Div que condiciona la experiencia de usuario según autenticación */}
        <div className="reservation-container">
          <p className="price"> {jetSki.price}€</p>

          {isLoggedIn ? (
            <div className="date-reservation">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // No permitir fechas pasadas
              />
              <button className="btn-reserve" disabled={!selectedDate}>
                <p>Reserva ahora</p>
              </button>
            </div>
          ) : (
            <div className="login-reservation">
              <p>Solo los usuarios registrados pueden reservar</p>
              <Button variant="primary" as={Link} to="/login">
                Inicia sesión
              </Button>
              <Button variant="secondary" as={Link} to="/signup" className="ms-2">
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
  )
}

export default JetSkiDetails