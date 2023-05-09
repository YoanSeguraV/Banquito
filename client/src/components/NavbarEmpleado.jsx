import React from "react";
import { Link, Outlet } from "react-router-dom";
import profile from "../assets/profile.jpg";

function NavbarEmpleado() {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand text-primary fw-bold" href="#">
            MI BANQUITO🏦
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
              <li class="nav-item">
                <Link
                  to={"/peticiones"}
                  class="nav-link active text-white fw-bold "
                >
                  Caja
                </Link>
              </li>
              <li class="nav-item">
                <Link to={"asesoria"} class="nav-link text-white  fw-bold">
                  Asesoria
                </Link>
              </li>
              <li class="nav-item">
                <Link to={"historial"} class="nav-link text-white  fw-bold">
                  Historial
                </Link>
              </li>
            </ul>
            <div className="  navbar-collapse d-flex justify-content-end mx-2">
              <img
                className=" rounded-circle mx-3"
                src={profile}
                width={"4%"}
                alt=""
              />
              <div class="btn-group">
                <button type="button" class="btn btn-primary">
                  {localStorage.getItem("name")}
                </button>
                <button
                  type="button"
                  class="btn btn-primary    "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  
                </button>
                
              </div>
            </div>
           
          </div>
          <Link
                      to={"/"}
                      class="text-white nav-link p-2  btn btn-danger "
                      onClick={() => localStorage.clear()}
                    >
                      Cerrar Sesion
                    </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavbarEmpleado;
