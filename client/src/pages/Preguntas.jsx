import { useEffect, useState } from "react";
import io from "socket.io-client";
import { context } from "../context/context";

const socket = io("http://localhost:4000/");

function Preguntas() {
    const{counter,setcounter}=context()
  const [form, setform] = useState(0);
  const [data, setData] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();
    socket.emit("client-preguntas", form);
  };
  const handelOnchange = (e) => {
    setform(e.target.value);
    socket.on("server-1", (message) => {
      console.log(message);
      setData([...data, message]);
    });
  };
  console.log(form);

  // useEffect(()=>{
  //     socket.on("server-1",(message)=>{
  //         console.log(message)
  //     })

  // },[])

  return (
    <div className="container -50 bg-dark text-white justify-content-center">
      <div className="pt-3" >
        <h3 className="mt-4">Preguntas Frecuntes❓ </h3>
      </div>
      <div className="d-block text-start  mt-5">
        <p> 1. 💳 Productos ,(Cuentas,tarjetas,credito,inversiones) </p>
        <p>2.  ℹ️Informacion de Usuarios, claves y seguridad</p>
        <p>3. 👪 Subsidios del gobierno y alivios</p>
        <p>4. 📖Certificado y extractos</p>
        <p>5.  🏦Puntos de atencion</p>
        
        
      </div>
      <div className="pb-1">
        <form onSubmit={handleInput}>
          {data.length === 1 ? (
            <h4 className="text-danger fw-bold">Felicidades🎉</h4>
          ) : (
            <>
              <input
                type="text"
                className="form-control my-5"
                onChange={(e) => handelOnchange(e)}
                placeholder="Ingrese Opcion"
              />{" "}
              
            </>
          )}
        </form>
      </div>
      <div className="pb-1">
      {data.map((item) => (
        <p>{item.message}{ }ASE</p>
      ))}
      </div>
    </div>
  );
}

export default Preguntas;
