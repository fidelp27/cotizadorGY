import React from "react";
import { useNavigate } from "react-router-dom";
import "./error404.css";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <button className="btn-error" onClick={() => navigate("/")}>
        Volver a inicio
      </button>
    </div>
  );
};
export default Error404;
