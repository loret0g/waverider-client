import { createContext, useEffect, useState } from "react";
import service from "../services/config";

import { PropagateLoader } from "react-spinners";

const AuthContext = createContext();
// Este contexto será utilizado para compartir estados y funciones relacionados con la autenticación a lo largo de toda la aplicación.

//* 2. Componente envoltorio
// Actuará como un envoltorio que rodeará los componentes que necesitan acceso al contexto de autenticación.
function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true); // spinner para que espere que se compruebe

  const [loggedUserRole, setLoggedUserRole] = useState(null);
  const [loggedUserName, setLoggedUserName] = useState("");
  const [loggedUserPhoto, setLoggedUserPhoto] = useState("");

  useEffect(() => {
    authenticatedUser() // Verifica si el usuario está logeado cuando visita la página
  }, []);

  const authenticatedUser = async () => {
    // Llama a la ruta /verify (comprueba token correcto), actualiza los estados. Se llama después de hacer login/logout o al volver a la app

    try {
      const response = await service.get("auth/verify"); // el token ya está configurado en todas las llamadas que se hagan con ese service

      // el token es válido - Almaceno en el payload
      setIsLoggedIn(true);
      setLoggedUserId(response.data._id);
      setLoggedUserRole(response.data.role);

      // Llamada para almacenar datos del usuario y que no vayan en el token (payload):
      if (response.data.role === "owner") {
        const ownerDetails = await service.get(`/owner/${response.data._id}`);
        // console.log("Owner details: ", ownerDetails.data.owner.username)
        setLoggedUserName(ownerDetails.data.owner.username);
        setLoggedUserPhoto(ownerDetails.data.owner.photo);
      } else if (response.data.role === "user") {
        const userDetails = await service.get(`/profile/${response.data._id}`);
        setLoggedUserName(userDetails.data.username);
        setLoggedUserPhoto(userDetails.data.photo);
      }

      setIsValidatingToken(false);
    } catch (error) {
      // el token no es válido
      console.log(error);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setLoggedUserRole(null);
      setLoggedUserName("");
      setLoggedUserPhoto("");
      setIsValidatingToken(false);
    }
  };

  // Función para cuando el usuario modifique su foto de perfil:
  const updateLoggedUserPhoto = (newPhoto) => {
    setLoggedUserPhoto(newPhoto);
  };
  // Objeto que contiene el estado y la función de autenticación
  const passedContext = {
    isLoggedIn,
    loggedUserId,
    loggedUserRole,
    loggedUserName,
    loggedUserPhoto,
    updateLoggedUserPhoto,
    authenticatedUser,
  };

  if (isValidatingToken) {
    return (
      <div className="loading-screen">
        <h3>Validando credenciales</h3>
        <PropagateLoader color="#EAD8B1" margin={5} size={20} />
      </div>
    );
  }

  return (
    // Usamos el `AuthContext.Provider` para compartir el `passedContext` con todos los componentes hijos.
    <AuthContext.Provider value={passedContext}>
      {" "}
      {/* Lo que va a compartir con toda la aplicación*/}
      {props.children}
      {/* Es como tener esto: 
        <BrowserRouter>
          <App />
        </BrowserRouter>*/}
    </AuthContext.Provider>
  );
}

export {
  AuthContext, // Exportamos el contexto para que otros componentes lo utilicen.
  AuthWrapper, // Envoltorio que usará el contexto para envolver la aplicación.
};
