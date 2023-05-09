import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
const socket = io("http://localhost:4000/");

function Turnos() {
  const [caja, setcaja] = useState([]);
  const [asesoria, setasesoria] = useState([]);
  const [container, setcontainer] = useState([]);
  const [buscador, setbuscador] = useState("");

  const handleserch = (e) => {
    e.preventDefault();
    setcontainer(
      container.filter((item) =>
        item.nombre.toLowerCase().includes(buscador.toLowerCase())
      )
    );
  };
  useEffect(() => {
    socket.emit("server-lister");
    socket.on("server-listar", (data) => {
      setcaja(data);
      
    });

    socket.emit("server-lister-asesoria");
    socket.on("server-listar-asesoria", (data2) => {
      setasesoria(data2);
    });
  }, []);

  useEffect(() => {
    setcontainer([...caja,...asesoria])
  }, [buscador]);

  return (
    <div className="mt-2 container justify-content-center">
      <Link className=" nav-link text-primary fs-4" to={"/"}>
        🔙 Atras
      </Link>
      <h1 className="text-center mt-3 mb-4">Busca Tu Turno🎫</h1>
      <form onSubmit={handleserch} className="d-flex justify-content-center ">
        <input
          type="text"
          className="form-control"
          placeholder="ingrese su nombre"
          onChange={(e) => setbuscador(e.target.value)}
        />
        <button className="btn btn-primary">Buscar</button>
      </form>

      <div className="mt-5 ">
        <table className="table   ">
          <thead className="bg-dark  text-white">
            <tr>
              <th>Nombre</th>
              <th>Turno</th>
            </tr>
          </thead>
          <tbody>
            {container.map((item, index) => (
              <tr key={index}>
                <td>
                  <p>{item.nombre}</p>
                </td>
                <td>
                  <p>
                    {item.idUsuario} {item.servicio}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Turnos;
