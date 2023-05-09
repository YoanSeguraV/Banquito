import { useState, useEffect } from "react";

import io from "socket.io-client";
import Swal from "sweetalert2";

const socket = io("http://localhost:4000/");
function Asesoria() {
  const [usuarios, setusuarios] = useState([]);
  const [but, setbut] = useState(false);

  useEffect(() => {
    socket.emit("client-usuarios-asesor");
    socket.on("server-listar-asesor", (data) => {
      setusuarios(data);
    });
  }, []);

  return (
    <>
      <h2 className="text-center mt-3">ASESORIA👨‍💼</h2>
      <p className="fs-4 text-end mx-5 text-danger">
        Turnos en espera: <span className="text-dark"> {usuarios.length} </span>
      </p>{" "}
      <table className="table  mt-5 container">
        <thead className=" text-white">
          <tr className="bg-dark">
            <th>
              {" "}
              <p>Nombre completo</p>
            </th>
            <th>
              <p>Tipo de documento</p>
            </th>
            <th>
              {" "}
              <p>Nr documento</p>
            </th>
            <th>
              {" "}
              <p>Servicio</p>
            </th>
            <th>
              {" "}
              <p>Turno</p>
            </th>
            <th colSpan={1}>
              {" "}
              <p className="">Estado</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>
                <p>{usuario.nombre}</p>
              </td>
              <td>
                <p>{usuario.tipoDocumento}</p>
              </td>
              <td>
                <p>{usuario.identificacion}</p>
              </td>
              <td>
                {" "}
                <p>{usuario.servicio}</p>
              </td>
              <td>
                {usuario.idUsuario} {usuario.servicio}
              </td>
              {
                <td>
                  {" "}
                  <p>
                    {usuario.estadoEspera == true ? (
                      <button
                        className="bg-success p-1 text-white rounded w-75 text-center"
                        onClick={() => {
                          Swal.fire({
                            title: "¿desea atender este cliente?",
                            icon: "question",
                            showDenyButton: true,
                            denyButtonText: "No",
                            confirmButtonText: "Si",
                          }).then((response) => {
                            if (response.isConfirmed) {
                              Swal.fire({
                                icon: "success",
                                title: " correctamente ",
                                timer: "2000",
                                button: socket.emit(
                                  "server-contador+",
                                  usuario.idUsuario
                                ),
                              }).then(() => {
                                socket.emit(
                                  "server-contador-asesoria-estado-espera",
                                  usuario.idUsuario
                                );
                                location.reload();
                              });
                            }
                          });
                        }}
                      >
                        Atender..
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger "
                        onClick={() => {
                          Swal.fire({
                            title: "¿desea Terminar la Sesion?",
                            icon: "question",
                            showDenyButton: true,
                            denyButtonText: "No",
                            confirmButtonText: "Si",
                          }).then((response) => {
                            if (response.isConfirmed) {
                              Swal.fire({
                                icon: "success",
                                title: " correctamente ",
                                timer: "2000",
                                button: socket.emit(
                                  "client-asesoria-estado",
                                  usuario.idUsuario
                                )
                                
                                
                              }).then(()=>{
                                location.reload()
                              })
                            }
                          })
                          
                        }}
                      >
                        Terminar
                      </button>
                    )}
                  </p>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Asesoria;
