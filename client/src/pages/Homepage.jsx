import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

 import Caja from "../components/Caja";
import Navbar from "../components/Navbar";

import "../style.css";
import Formulario from "./Formulario";
import Asesoria from "./Trabajadores/Asesoria";

function Homepage() {
  const [counter, setcounter] = useState([]);
  

  const socket = io("http://localhost:4000/");

  useEffect(() => {
    socket.emit("client-get-contador-Caja");
    socket.on("server-contador-Caja", (data) => {
      setcounter(data);
    });

    

    

  }, []);

  console.log(counter)

  return (
    <>
      

      <div className="container-fluid containerhome ">
        <div className="row">
          <div className="col-6">
            <div className="mt-5">
              <div className="mt-5 mt-2 ">
                <h1 className="text-center pt-3">
                  Necesitas sacar un Turno 📭
                </h1>
                <p className=" text-secondary text-center fs-5 mt-3">
                  Llena el formulario para poder terner un Turno
                </p>
                <div className="d-flex justify-content-center gap-4 mt-2 pt-2">
                  <h4 className="text-center">Turno Asesor 👨‍💼</h4>
                  <h4 className="text-center">Turno Caja 🏧</h4>
                </div>

                {counter.map((item) => (
                  <div className="d-flex justify-content-center gap-4 mt-2">
                    <button className="btn btn-dark fs-4 mx-5 ">
                      {item.turno} <span className="text-danger">CAJ</span>{" "}
                    </button>
                    <button className="btn btn-dark fs-4 mx-5">
                      {item.turnoAsesoria}{" "}
                      <span className="text-danger">ASE</span>{" "}
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <h4 className="  mt-5 text-center">Necesitas saber cual es tu turno?</h4>
                <div className="d-flex justify-content-center">
                <Link to={"turno"} className="btn btn-primary p-2 mt-3 w-50 fs-4">Buscar Turno</Link>
                </div>
              
              </div>
            </div>

          </div>
          <div className="col-6">
            <Formulario />
          </div>
        </div>
      </div>

      {/* <div className="container-fluid">
        <div className="row  justify-content-center">
          <h1 className="text-center mt-5">Busca Tu Turno🎫</h1>
          <div className="col-6  ">
             <Caja /> 
          </div>
          <div className="col-6  ">
             <Asesoria /> 
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Homepage;
