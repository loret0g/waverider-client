import axios from "axios"
import { useEffect, useState } from "react"

import JetSkiCard from '../components/JetSkiCard'

function HomePage() {

  const [jetSki, setJetSki] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/jet-ski`)
      setJetSki(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="homepage-container">
      <h1>Motos en alquiler</h1>

      <div className="container-jetski">
        {jetSki.length === 0 ? (<p>No disponbemos de vehículos en este momento</p>) : (
          jetSki.map((eachJetSki) => (
            <JetSkiCard key={eachJetSki._id} jetSki={eachJetSki} />
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage