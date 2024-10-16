import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/auth.context" // Asegúrate de tener acceso al contexto de autenticación
import service from "../services/config"

function Profile() {
  const { loggedUserId } = useContext(AuthContext) // Obtener el ID del usuario logueado del contexto de autenticación
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    try {
      const response = await service.get(`/profile/${loggedUserId}`)
      setUserData(response.data)
    } catch (error) {
      setError("Error al cargar el perfil.")
    }
  }

  return (
    <div>
      {/* <h1>Perfil de {userData.username}</h1>
      <p>Email: {userData.email}</p>
      <p>Rol: {userData.role}</p> */}
    </div>
  )
}

export default Profile