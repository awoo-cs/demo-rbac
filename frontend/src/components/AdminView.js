import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { NotificationContext } from "../contexts/NotificationContext";

const AdminView = () => {
  const { authData } = useContext(AuthContext);
  const { notifications, setNotifications } = useContext(NotificationContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${authData.token}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [authData.token]);

  const sendNotification = async (userId) => {
    try {
      const response = await axios.post(
        "/api/notifications",
        {
          userId,
          message: "Esta es una notificacion del admin.",
        },
        {
          headers: { Authorization: `Bearer ${authData.token}` },
        }
      );
      setNotifications([...notifications, response.data]);
    } catch (err) {
      console.error("Error sending notification:", err);
    }
  };

  return (
    <div className="container">
      <h2>Vista Admin</h2>
      <div className="row">
        <div className="col-md-12">
          <h3>Lista de Usuarios</h3>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user._id} className="list-group-item">
                {user.email}
                <button
                  className="btn btn-primary btn-sm float-right"
                  onClick={() => sendNotification(user._id)}
                >
                  Enviar Notificacion
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
