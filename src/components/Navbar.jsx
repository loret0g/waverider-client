import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {

  const navigate = useNavigate()

  const {isLoggedIn, authenticatedUser, loggedUserRole, loggedUserId} = useContext(AuthContext)

  const handleLogout = async() => {
    try {
      localStorage.removeItem("authToken")
      await authenticatedUser()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <nav id="navbar">
    <Link to="/">Home</Link>
      {!isLoggedIn && <Link to="/signup">Registro</Link>}
      {!isLoggedIn && <Link to="/login">Acceso</Link>}
      {/* {isLoggedIn && <Link to="/profile">Perfil</Link>} */}
      {isLoggedIn && loggedUserRole === "owner" && <Link to={`/owner/${loggedUserId}`}>Perfil Propietario</Link>}
      {isLoggedIn && loggedUserRole === "user" && <Link to="/profile">Perfil</Link>}
      {isLoggedIn && <Link onClick={handleLogout}>Cerrar sesión</Link>}
    </nav>
    
    </>
  )
}

export default Navbar