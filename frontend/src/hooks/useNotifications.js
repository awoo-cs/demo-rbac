import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

const useNotifications = () => {
  const { notifications, setNotifications } = useContext(NotificationContext);

  return { notifications, setNotifications };
};

export default useNotifications;
