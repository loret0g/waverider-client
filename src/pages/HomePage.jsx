import axios from "axios"
import { useEffect, useState } from "react"

import JetSkiCard from '../components/JetSkiCard'

function HomePage() {

  const [jetSki, setJetSki] = useState([])
  const [sortPrice, setSortPrice] = useState(true)

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

  const handleSortByPrice = () => {
    const sortedJetSki = [...jetSki].sort((a, b) => {
      if (sortPrice) {
        return a.price - b.price; // Ascendente
      } else {
        return b.price - a.price; // Descendente
      }
    });
    setJetSki(sortedJetSki);
    setSortPrice(!sortPrice);     // Toggle para cambiar el orden
  };

  return (
    <div id="homepage-container">
      <div className="sort-container">
        <button onClick={handleSortByPrice} className="sort-button">
          {sortPrice ? "Ordenar por precio: Descendente" : "Ordenar por precio: Ascendente"}
        </button>
      </div>
      
      <div className="homepage-container container-jetski">
        {jetSki.length === 0 ? (<p>No disponemos de vehículos en este momento</p>) : (
          jetSki.map((eachJetSki) => (
            <JetSkiCard key={eachJetSki._id} jetSki={eachJetSki} />
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage