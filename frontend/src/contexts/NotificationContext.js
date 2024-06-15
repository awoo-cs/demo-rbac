import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (authData && authData.token) {
        try {
          const response = await axios.get("/api/notifications", {
            headers: { Authorization: `Bearer ${authData.token}` },
          });
          setNotifications(response.data);
        } catch (err) {
          console.error("Error fetching notifications:", err);
        }
      }
    };

    fetchNotifications();
  }, [authData]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
