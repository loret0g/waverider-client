// Configuramos el servicio inicial para comprobar el token antes de realizar llamadas
import axios from "axios";

// Creo servicio de axios
const service = axios.create({    // Se le pasa el URL inicial (base_url)
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
})

// Comprobar que este servicio va acompañado del token
service.interceptors.request.use((config) => {  // Forma más segura de pasar el token en las llamadas

  const storedToken = localStorage.getItem("authToken")

  if(storedToken) {   // Si existe el token, vamos a agregarlo a la configuración
    config.headers.authorization = `Bearer ${storedToken}`
  }

  return config
})

export default service