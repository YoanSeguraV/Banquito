import {useEffect,useState} from 'react'
import io from "socket.io-client";
const socket = io("http://localhost:4000/");

function CajaHistorial () {
    const [usuarios, setusuarios] = useState([]);
  

  useEffect(() => {
    socket.emit("client-usuarios-caja-historial");
    socket.on("server-listar-caja-historial", (data) => {
      setusuarios(data);
    });
  }, []);
  return (
    <div>
      
      <p className="fs-4 text-end mx-5 text-danger">
        Personas Atendidas: <span className="text-dark"> {usuarios.length} </span>
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
              <p className="text-center">Estado</p>
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
                    {!usuario.estado ? (
                      <p className="bg-danger p-1 text-white rounded w-75 text-center">
                        Atendido
                      </p>
                    ) : (
                      <p className="bg-success p-1 text-white rounded w-75 text-center">
                        Espera
                      </p>
                    )}
                  </p>
                </td>
              }
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CajaHistorial
