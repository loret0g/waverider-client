import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="error-page">
      <img
        src="/error.png"
        alt="Error"
        className="error-img"
      />
      <h1>¡Oops! Algo salió mal</h1>
      <Link to="/" className="btn-home">
        Vuelve a la página principal
      </Link>
    </div>
  );
}

export default ErrorPage;
