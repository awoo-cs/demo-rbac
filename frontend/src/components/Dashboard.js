import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { authData } = useContext(AuthContext);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Bienvenido, {authData.user.email}</p>
      <div className="row">
        <div className="col-md-12">
          {authData.user.role === "admin" && (
            <div className="alert alert-info">
              Tienes privilegios de administrador.{" "}
              <Link to="/admin">Ir hacia Vista Admin</Link>
            </div>
          )}
          {authData.user.role === "user" && (
            <div className="alert alert-success">
              Tienes acceso de usuario.{" "}
              <Link to="/user">Ir hacia Vista Usuario</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
