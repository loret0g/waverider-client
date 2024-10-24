import service from "../../services/config";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function Login() {
  const navigate = useNavigate();

  const { authenticatedUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      const userCredentials = {
        email,
        password,
      };

      const response = await service.post("/auth/login", userCredentials); // Aquí recibimos el token

      localStorage.setItem("authToken", response.data.authToken); //nombre de la propiedad - valor a almacenar (recibido por el backend)

      await authenticatedUser();

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        console.log(error);
        navigate("/error");
      }
    }
  };

  return (
    <div className="form-container">
      {/* <h1 className="form-title">Formulario de Acceso</h1> */}

      <form onSubmit={handleLogin} className="form">
        <label className="form-label">Correo Electrónico:</label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form-label">Contraseña:</label>
        <input
          className="form-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <button type="submit" className="submit-button">
          Acceder
        </button>
      </form>
    </div>
  );
}

export default Login;
