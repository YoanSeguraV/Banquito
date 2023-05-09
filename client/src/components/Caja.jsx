import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000/");
function Caja() {
  const [caja, setcaja] = useState([]);
  const [asesoria, setasesoria] = useState([]);
  const [buscador, setbuscador] = useState("");

  const handleserch = (e) => {
    e.preventDefault();
    setcaja(
      caja.filter((item) =>
        item.nombre.toLowerCase().includes(buscador.toLowerCase())
      )
    );
  };
  useEffect(() => {
    socket.emit("client-usuarios-caja");
    socket.on("server-listar-caja", (data) => {
      setcaja(data);
    });
    // socket.emit("client-usuarios-asesor");
    // socket.on("server-listar-asesor", (data2) => {
    //     setasesoria(data2)

    // });
  }, [buscador]);

  return (
    <div className="mt-2">
      <form onSubmit={handleserch} className="d-flex justify-content-center">
        <input
          type="text"
          className="form-control"
          placeholder="ingrese su nombre"
          onChange={(e) => setbuscador(e.target.value)}
        />
        <button className="btn btn-primary">Buscar</button>
      </form>

      <div className="mt-5">
        <table className="table   ">
          <thead className="bg-dark  text-white">
            <tr>
              <th>Nombre</th>
              <th>Turno</th>
            </tr>
          </thead>
          <tbody>
            {caja.map((item, index) => (
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

export default Caja;
