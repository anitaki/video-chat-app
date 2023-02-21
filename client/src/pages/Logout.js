import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    navigate("/login");
  });
}

export default Logout;
