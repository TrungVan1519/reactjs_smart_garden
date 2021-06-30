import React from "react";
import { FaReact } from "react-icons/fa";
import logo from "../logo.svg";
import "./css/notFound.css";

const NotFound = () => {
  return (
    <div className="container text-center">
      <h1>Not Found - 404</h1>
      <div className="container__not-found">
        <FaReact className="icon" />
        <img src={logo} className="logo" alt="logo" />
        <FaReact className="icon" />
      </div>
    </div>
  );
};

export default NotFound;
