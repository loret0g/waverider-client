import { useState } from "react";
import { useNavigate } from "react-router-dom";

import service from "../../services/config";

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isOwner, setIsOwner] = useState(false);


  const [errorMessage, setErrorMessage] = useState("")

  const handleSignup = async(e) => {
    e.preventDefault()

    const role = isOwner ? "owner" : "user";

    try {
      const newUser = {
        email, 
        username, 
        password,
        role
      }

      await service.post("/auth/signup", newUser)

      navigate("/login")

    } catch (error) {
      console.log(error)  // Muestra el error que nos manda el back
      
      if(error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        // Aquí debe redireccionar a una pag de error
        //! redirección a /error
      }
    }
  }


  return (
    <div className="form-container">
  <h1 className="form-title">Formulario de Registro</h1>

  <form onSubmit={handleSignup}>
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

    <div className="checkbox-container">
      <label className="form-label">
        <input
          className="checkbox-input"
          type="checkbox"
          name="isOwner"
          checked={isOwner}
          onChange={(e) => setIsOwner(e.target.checked)}
        />
        Sí, quiero ser propietario
      </label>
    </div>

    <button className="submit-button" type="submit">Registrar</button>

    {errorMessage && <p className="error-message">{errorMessage}</p>}
  </form>
</div>

  );
}

export default Signup