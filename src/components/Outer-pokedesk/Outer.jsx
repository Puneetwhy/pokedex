import React from "react";
import { Link } from "react-router-dom";
import "./Outer.css";
function Outer() {
  return (
    <div>
      <button className="pokedesk-btn">
        <Link to="/" style={{ textDecoration: "none" }}>
          Pokedex
        </Link>
      </button>
    </div>
  );
}

export default Outer;
