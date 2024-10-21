import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function MyNavbar() {
  const navigate = useNavigate();

  const {
    isLoggedIn,
    authenticatedUser,
    loggedUserRole,
    loggedUserId,
    loggedUserName,
    loggedUserPhoto,
  } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");
      await authenticatedUser();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav id="navbar">
        <div id="nav-left">
          <Link to="/">
            <img src="/logo.png" alt="Company Logo" />
          </Link>
        </div>

        {/* <div id="nav-right"> */}
          {!isLoggedIn && (
           <Navbar>
           <NavDropdown 
             title="Cuenta" 
             className="account-dropdown"
           >
             <NavDropdown.Item as={Link} to="/signup">
               Registro
             </NavDropdown.Item>
             <NavDropdown.Divider />
             <NavDropdown.Item as={Link} to="/login">
               Acceso
             </NavDropdown.Item>
           </NavDropdown>
         </Navbar>
         
          )}

          {isLoggedIn && (
            <Navbar>
              <NavDropdown
                title={
                  <span>
                    <img
                      src={loggedUserPhoto}
                      alt="Foto perfil"
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginRight: "10px",
                      }}
                    />
                    {loggedUserName}
                  </span>
                }
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item
                  as={Link}
                  to={`/${
                    loggedUserRole === "owner" ? "owner" : "profile"
                  }/${loggedUserId}`}
                >
                  Ver Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar>
          )}
        {/* </div> */}
      </nav>

      {/* </Navbar> */}
      {/* <nav id="navbar">
        <div id="nav-left">
          <Link to="/">
            <img src="/logo.png" alt="Company Logo" />
          </Link>
        </div>

        <div id="nav-right">
          {!isLoggedIn && (
            <>
              <div className="profile">
                <Link to="/signup">Registro</Link>
              </div>
              <div className="profile">
                <Link to="/login">Acceso</Link>
              </div>
            </>
          )}

          {isLoggedIn && (
            <>
              <div className="profile">
                <img src={loggedUserPhoto} alt="Foto perfil" id="profile-pic" />
                <Link
                  to={`/${
                    loggedUserRole === "owner" ? "owner" : "profile"
                  }/${loggedUserId}`}
                >
                  {loggedUserName}
                </Link>
              </div>
              <Link onClick={handleLogout}>Cerrar sesión</Link>
            </>
          )}
        </div>
      </nav> */}

      {/* {isLoggedIn && loggedUserRole === "user" && 
          <div className="profile">
            <img src={loggedUserPhoto} alt="Foto perfil" />
            <Link to={`/profile/${loggedUserclassName}`}>{loggedUserName}</Link>
          </div>
      }
      {isLoggedIn && loggedUserRole === "owner" && 
          <div className="profile">
            <img src={loggedUserPhoto} alt="Foto perfil" />
            <Link to={`/owner/${loggedUserclassName}`}>{loggedUserName}</Link>
          </div>
      } */}
    </>
  );
}

export default MyNavbar;
