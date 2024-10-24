import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

import service from "../../services/config";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isOwner, setIsOwner] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if(password != confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.")
      return
    }

    const role = isOwner ? "owner" : "user";

    try {
      const newUser = {
        email,
        username,
        password,
        role,
      };

      await service.post("/auth/signup", newUser);

      navigate("/login");
    } catch (error) {
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
      {/* <h1 className="form-title">Regístrate</h1> */}

      <form onSubmit={handleSignup} className="form">
        <label className="form-label">Correo Electrónico:</label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form-label">Username:</label>
        <input
          className="form-input"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="form-label">Contraseña:</label>
        <input
          className="form-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="form-label">Repite la contraseña:</label>
        <input
          className="form-input"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="checkbox-container">
          <label className="form-label">
            ¿Tienes una moto y quieres alquilarla?
          </label>
          <Form.Check
            type="checkbox"
            className="checkbox-input"
            checked={isOwner}
            onChange={(e) => setIsOwner(e.target.checked)}
            label="Sí, quiero ser propietario"
          />
        </div>

        <button className="submit-button" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Signup;
