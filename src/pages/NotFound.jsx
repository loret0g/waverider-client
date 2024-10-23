import { Link } from "react-router-dom";
import imgNotFound from "../assets/NotFound.jpg";

function NotFound() {
  return (
    <div className="not-found">
      <img src={imgNotFound} alt="Not Found" />
      <div className="not-found-content">
        <h2>¿Estás perdido?</h2>
        <Link to="/" className="go-home-btn">Vuelve a casa</Link>
      </div>
    </div>
  );
}

export default NotFound;
