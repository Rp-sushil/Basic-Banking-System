import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar">
      <div className="container flex">
        <h1 className="logo">Payer</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>

            <li>
              <Link to="/transfers">Stats</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
