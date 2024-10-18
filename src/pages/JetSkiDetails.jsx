import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function JetSkiDetails() {

  const [jetSki, setJetSki] = useState(null)

  const {jetSkiId} = useParams()

  const [selectedDate, setSelectedDate] = useState("");


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

  if (!jetSki) return <p>Loading...</p>

  return (
    <div className="jetski-details">
      {jetSki.images.length > 0 && (
        <img src={jetSki.images[0]} alt={jetSki.name} />
      )}

      <div className="jetski-header">
        <h1>{jetSki.name}</h1>
        {/* <div id="jetski-owner"> */}
          <Link to={`/owner/${jetSki.owner._id}`}>
            <h2>{jetSki.owner.username}</h2>
          </Link>
        {/* </div> */}
      </div>

      <div className="jetski-info">
        <p>Description: {jetSki.description}</p>

        <div className="reservation-container">
          <p className="price"> {jetSki.price}€</p>

          <div className="date-reservation">
            <input type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // No permitir fechas pasadas
            />
            <button className="btn-reserve" disabled={!selectedDate}>
              <p>Reserva ahora</p>
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default JetSkiDetails