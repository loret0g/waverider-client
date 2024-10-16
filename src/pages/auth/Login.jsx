import service from "../../services/config";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Login() {

  const navigate = useNavigate()

  const { authenticatedUser } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("")

    try {

      const userCredentials = {
        email,
        password
      }

      const response = await service.post("/auth/login", userCredentials)   // Aquí recibimos el token

      localStorage.setItem("authToken", response.data.authToken)    //nombre de la propiedad - valor a almacenar (recibido por el backend)

      await authenticatedUser()

      navigate("/")

    } catch (error) {
      console.log(error)
      //! redirección a /error
      if(error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        // Aquí debe redireccionar a una pag de error
      }
    }
  };

  return (
    <div>

      <h1>Formulario de Acceso</h1>

      <form onSubmit={handleLogin}>
        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">Acceder</button>

        {errorMessage && <p>{errorMessage}</p>}   

      </form>
      
    </div>
  );
}

export default Login;
