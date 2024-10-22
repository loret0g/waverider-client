import axios from "axios";
import { useEffect, useState } from "react";

import JetSkiCard from "../components/JetSkiCard";

function HomePage() {
  const [jetSki, setJetSki] = useState([]);
  const [sortPrice, setSortPrice] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/jet-ski`
      );
      setJetSki(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortByPrice = () => {
    const sortedJetSki = [...jetSki].sort((a, b) => {
      if (sortPrice) {
        return a.price - b.price; // Ascendente
      } else {
        return b.price - a.price; // Descendente
      }
    });
    setJetSki(sortedJetSki);
    setSortPrice(!sortPrice); // Toggle para cambiar el orden
  }; 

  return (
    <div id="homepage-container">
      <div className="video">
        <video autoPlay muted loop>
          <source src="video/overlay.mp4" type="video/mp4" />
        </video>
        <div className="overlay">
          <a href="#jetski-section" className="scroll-link">Alquila una moto</a>
        </div>
      </div>

      <section className="homepage-container container-jetski" id="jetski-section">
        {jetSki.length === 0 ? (
          <p>No disponemos de vehículos en este momento</p>
        ) : (
          jetSki.map((eachJetSki) => (
            <JetSkiCard key={eachJetSki._id} jetSki={eachJetSki} />
          ))
        )}
      </section>

      <div className="sort-container">
        <button onClick={handleSortByPrice} className="sort-button">
          {sortPrice
            ? "Ordenar por precio: Descendente"
            : "Ordenar por precio: Ascendente"}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
