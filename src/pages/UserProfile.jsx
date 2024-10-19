import { useContext, useEffect, useState } from "react"
import service from "../services/config"
import { AuthContext } from "../context/auth.context"

import EditUserModal from "../components/EditUserModal"

function UserProfile() {
  const { loggedUserId } = useContext(AuthContext)

  const [user, setUser] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/profile/${loggedUserId}`)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="user-profile">
      <div className="user-details">
        <h2>{user.username}</h2>
        {/* Estos dos campos tb serán... si los usuarios tienen una reserva con este perfil */}
        {loggedUserId === user._id && (
        <>
          <h3>{user.email}</h3>
          <h3>{user.phoneNumber}</h3>
        </>
        )}
        
        {loggedUserId === user._id && (
          <div className="owner-actions">
            <EditUserModal userId={loggedUserId} userData={user} getData={getData} />
          </div>
        )}
      </div>

      {loggedUserId === user._id && (
          <div className="owner-jetskis">
            <h2>Tus reservas</h2>
            <h2>... in processssss</h2>
          </div>
        )}
    </div>
  )
}

export default UserProfile
