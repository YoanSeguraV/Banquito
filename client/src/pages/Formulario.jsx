import React, { useState } from "react";
import Swal from "sweetalert2";

import io from "socket.io-client";
import { context } from "../context/context";

const socket = io("http://localhost:4000/");

function Formulario() {
  const [form, setform] = useState({
    nombre: "",
    tipoDocumento: "",
    identificacion: "",
    correo: "",
    servicio: "",
  });

  const handleInput = ({ target }) => {
    setform({ ...form, [target.name]: target.value });
  };
  const handleForm = (e) => {
    e.preventDefault();

    
    
      socket.emit("form-client", form);
      socket.on("server-insert", (message) => {
        console.log(message);
        Swal.fire({
          title: "Bienvenido a mi Banquito",
          icon: "success",
          text: message ,
          timer: 5500,
        }).then(() => {
          button: location.reload();
        });
      });
    socket.on("server-formulario-vacio",(message)=>{

      Swal.fire({
        
        icon:"warning",
        text:message
      })
    })
    
  };

  return (
    <div className=" mt-4 text-white container-fluid d-flex justify-content-center">
      <div className=" mt-3 p-3 bg-dark rounded mb-5" style={{ width: "67%" }}>
        <form className=" " onSubmit={handleForm}>
          <h4 className="pt-3 text-center  text-primary">
            FORMULARIO DE INGRESO
          </h4>

          <label htmlFor="">Nombre completo</label>
          <input
            type="text"
            className="form-control mt-2"
            name="nombre"
            placeholder="ingrese nombre"
            onChange={handleInput}
            required
          />
          <label className="mt-3" for="">
            Numero de Documento
          </label>
          <div className="d-flex mt-2">
            <select
              className="form-select w-25 "
              name="tipoDocumento"
              onChange={handleInput}
              required
            >
              <option defaultValue selected desabled>
                TP{" "}
              </option>
              <option value="cc">CC</option>
              <option value="ce">CE</option>
            </select>

            <input
            required
              className="form-control"
              type="number"
              name="identificacion"
              placeholder="ingrese identificacion"
              onChange={handleInput}
            />
            <hr />
          </div>
          <label className="mt-3" htmlFor="">
            Correo electronico
          </label>
          <input
            className="form-control mt-2 "
            type="email"
            required
            name="correo"
            placeholder="ingrese correo"
            onChange={handleInput}
          />
          <div className="mt-2">
            <label for="">Que servicio Necesitas?</label>
            <select
            required
              className="form-control"
              name="servicio"
              onChange={handleInput}
            >
              <option defaultValue>Seleccione</option>
              <option value="CAJ">Caja</option>
              <option value="ASE">Asesoria</option>
            </select>
          </div>

          <button
            className="mt-3 btn btn-primary mt-4 w-100 mb-2 text-white"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
