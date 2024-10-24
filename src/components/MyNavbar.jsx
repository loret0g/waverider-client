import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
      navigate("/error");
    }
  };

  return (
      <nav id="navbar">
        <div id="nav-left">
          <Link to="/">
            <img src="/logo.png" alt="Company Logo" />
          </Link>
        </div>

        {!isLoggedIn && (
          <Navbar>
            <NavDropdown title="Cuenta" className="account-dropdown">
              <NavDropdown.Item as={Link} to="/login">
                Acceso
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/signup">
                Registro
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
                Mi perfil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar>
        )}
      </nav>
  );
}

export default MyNavbar;
