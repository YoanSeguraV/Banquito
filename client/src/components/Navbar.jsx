import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
    <nav class="navbar bg-dark">
      <div class="container-fluid">
        <Link to={"/"} class="navbar-brand text-primary fw-bold">
          MI BANQUITO 🏦
        </Link>
        
        
        <form class="d-flex" role="search">
          <Link to={"/login"} class="btn btn-primary" type="submit">
            Inicio Sesion
          </Link>
        </form>
      </div>
    </nav>
    <Outlet/>
    </>
  );
}

export default Navbar;
