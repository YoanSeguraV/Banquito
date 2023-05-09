import { Button } from "bootstrap";
import { useState, useEffect } from "react";

import io from "socket.io-client";
import Swal from "sweetalert2";


const socket = io("http://localhost:4000/");

function Peticiones() {
  const [usuarios, setusuarios] = useState([]);
  

  useEffect(() => {
    socket.emit("client-usuarios-caja");
    socket.on("server-listar-caja", (data) => {
      setusuarios(data);
    });
  }, []);

  // const handleSumbit=(id)=>{
  //   Swal.fire({
  //     title: "¿Seguro que desea terminar  esta sesion?",
  //     icon: "question",
  //     showDenyButton: true,
  //     denyButtonText: "No",
  //     confirmButtonText: "Si",
  //   }).then((response) => {
  //     if (response.isConfirmed) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Sesion Terminada  correctamente ",
  //         timer: "2000",
  //         button:socket.emit("client-usuarios-eliminar",id)
  //       })

  //     }
  //   });

  // }

  return (
    <>
      <h2 className="text-center mt-3">CAJA🏧</h2>
      <p className="fs-4 text-end mx-5 text-danger">Turnos en espera: <span className="text-dark"> {usuarios.length} </span></p>{" "}
      <table className="table  mt-5 container">
        <thead className="bg-dark text-white">
          <tr>
            <th colSpan={2}>
              {" "}
              <p>Nombre completo</p>
            </th>
            <th colSpan={1}>
              <p>TP Documento</p>
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
              <p>Turno</p>{" "}
            </th>
            <th colSpan={1}>
              {" "}
              <p >Estado</p>
            </th>
            
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td colSpan={2}>
                <p>{usuario.nombre}</p>
              </td>
              <td colSpan={1}>
                <p>{usuario.tipoDocumento}</p>
              </td>
              <td colSpan={1}>
                <p> {usuario.identificacion}</p>
              </td>
              <td colSpan={1}>
                {" "}
                <p>{usuario.servicio}A</p>
              </td>
              <td>
                <p>{usuario.idUsuario}CAJ</p>
              </td>
              {
                <td>
                  {" "}
                  <p>
                    {usuario.estadoEspera == true 
                    ? (
                      <button className="btn btn-success p-1 text-white rounded w-75 text-center" onClick={()=>{

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
                                "server-contador-caja",
                                usuario.idUsuario
                              ),
                            }).then(() => {
                              socket.emit("server-contador-caja-estado-espera",usuario.idUsuario)
                              location.reload()
                              
                            });
                          }
                        });
                        }
                        }>
                        Atender
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
                                "client-caja-estado",
                                usuario.idUsuario
                              )
                              
                              
                            }).then(()=>{
                              location.reload()
                            })
                          }
                        })
                        
                        
                      }}
                    >
                      Terminado
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

export default Peticiones;
