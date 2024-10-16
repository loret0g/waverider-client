import { createContext, useEffect, useState } from "react";
import service from "../services/config";


const AuthContext = createContext()
// Este contexto será utilizado para compartir estados y funciones relacionados con la autenticación a lo largo de toda la aplicación.

//* 2. Componente envoltorio
// Actuará como un envoltorio que rodeará los componentes que necesitan acceso al contexto de autenticación.
function AuthWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isValidatingToken, setIsValidatingToken] = useState(true)  // spinner para que espere que se compruebe

  useEffect(() => {
    authenticatedUser() // Verifica si el usuario está logeado cuando visita la página
  }, [])

  const authenticatedUser = async() => {
    // Llama a la ruta /verify (comprueba token correcto), actualiza los estados. Se llama después de hacer login/logout o al volver a la app

    try {

      const response = await service.get("auth/verify")   // ya no configuramos que mandamos el token, porque ya está configurado en todas las llamadas que se hagan con ese service 

      // console.log(response) 
      
      // el token es válido
      setIsLoggedIn(true)
      setIsLoggedIn(response.data._id)    // Comprobado desde el back, que nos envía el payload
      setIsValidatingToken(false)

    } catch (error) {
      // el token no es válido
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsValidatingToken(false)
    }
  }
  // Objeto que contiene el estado y la función de autenticación
  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticatedUser
  }

  if(isValidatingToken) {
    return <h3>...validando credenciales</h3>
    //! Poner spinner
  }

  return (
    // Usamos el `AuthContext.Provider` para compartir el `passedContext` con todos los componentes hijos.
    <AuthContext.Provider value={passedContext}> {/* Lo que va a compartir con toda la aplicación*/}
      {props.children}  
      {/* Es como tener esto: 
        <BrowserRouter>
          <App />
        </BrowserRouter>*/}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,    // Exportamos el contexto para que otros componentes lo utilicen.
  AuthWrapper     // Envoltorio que usará el contexto para envolver la aplicación.
}