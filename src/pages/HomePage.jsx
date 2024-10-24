import axios from "axios";
import { useEffect, useState } from "react";
import JetSkiCard from "../components/JetSkiCard";
import { Dropdown, DropdownButton } from "react-bootstrap"; // Importar componentes de react-bootstrap

function HomePage() {
  const [jetSki, setJetSki] = useState([]);
  const [sortPrice, setSortPrice] = useState(true);
  const [sortRating, setSortRating] = useState(null); // Para el filtro de valoraciones
  const [sortHorsepower, setSortHorsepower] = useState(null); // Para el filtro de potencia

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
      navigate("/error");
    }
  };

  const handleSortByPrice = () => {
    const sortedJetSki = [...jetSki].sort((a, b) => {
      return sortPrice ? a.price - b.price : b.price - a.price;
    });
    setJetSki(sortedJetSki);
    setSortPrice(!sortPrice); // Toggle para cambiar el orden
  };

  const handleSortByRating = () => {
    const sortedJetSki = [...jetSki].sort((a, b) => {
      return sortRating === null || sortRating
        ? a.averageRating - b.averageRating
        : b.averageRating - a.averageRating;
    });
    setJetSki(sortedJetSki);
    setSortRating(!sortRating); // Toggle para cambiar el orden
  };

  const handleSortByHorsepower = () => {
    const sortedJetSki = [...jetSki].sort((a, b) => {
      return sortHorsepower === null || sortHorsepower
        ? a.horsepower - b.horsepower
        : b.horsepower - a.horsepower;
    });
    setJetSki(sortedJetSki);
    setSortHorsepower(!sortHorsepower); // Toggle para cambiar el orden
  };

  return (
    <div id="homepage-container">
      <div className="video">
        <video autoPlay muted loop>
          <source src="video/overlay.mp4" type="video/mp4" />
        </video>
        <div className="overlay">
          <a href="#jetski-section" className="scroll-link">
            Alquila una moto
          </a>
        </div>
      </div>

      <div className="sort-container">
        <DropdownButton
          id="btn-1"
          className="homepage-dropdown"
          title="Ordenar por"
        >
          <Dropdown.Header>Precio</Dropdown.Header>
          <Dropdown.Item onClick={() => handleSortByPrice(true)}>
            Menor precio
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortByPrice(false)}>
            Mayor precio
          </Dropdown.Item>

          <Dropdown.Header>Potencia</Dropdown.Header>
          <Dropdown.Item onClick={() => handleSortByHorsepower(true)}>
            Menor potencia
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortByHorsepower(false)}>
            Mayor potencia
          </Dropdown.Item>

          <Dropdown.Header>Valoraciones</Dropdown.Header>
          <Dropdown.Item onClick={() => handleSortByRating(true)}>
            Mejor valoradas
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSortByRating(false)}>
            Peor valoradas
          </Dropdown.Item>
        </DropdownButton>
      </div>

      <section
        className="homepage-container container-jetski"
        id="jetski-section"
      >
        {jetSki.length === 0 ? (
          <p>No disponemos de vehículos en este momento</p>
        ) : (
          jetSki.map((eachJetSki) => (
            <JetSkiCard key={eachJetSki._id} jetSki={eachJetSki} />
          ))
        )}
      </section>
    </div>
  );
}

export default HomePage;
