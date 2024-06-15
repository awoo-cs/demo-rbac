import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { NotificationContext } from "../contexts/NotificationContext";

const UserView = () => {
  const { authData } = useContext(AuthContext);
  const { notifications } = useContext(NotificationContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (authData && authData.token) {
        try {
          const response = await axios.get("/api/user/info", {
            headers: { Authorization: `Bearer ${authData.token}` },
          });
          setUserInfo(response.data);
        } catch (err) {
          console.error("Error fetching user info:", err);
        }
      }
    };
    fetchUserInfo();
  }, [authData]);

  return (
    <div className="container">
      <h2>Vista Usuario</h2>
      {userInfo ? (
        <div>
          <p>Email: {userInfo.email}</p>
          <p>Rol: {userInfo.role}</p>
        </div>
      ) : (
        <p>Cargando informacion del usuario...</p>
      )}
      <div className="row">
        <div className="col-md-12">
          <h3>Notificaciones</h3>
          {notifications.length === 0 ? (
            <p>No tienes notificaciones.</p>
          ) : (
            <ul className="list-group">
              {notifications.map((notification) => (
                <li key={notification._id} className="list-group-item">
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserView;
