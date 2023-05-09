import React, { useEffect, useState } from 'react'
import io from "socket.io-client";
const socket = io("http://localhost:4000/");
function Asesoria() {
    const [asesoria, setasesoria] = useState([])
    const [buscador, setbuscador] = useState("")

    const handleserch=(e)=>{
        e.preventDefault()
        setasesoria( asesoria.filter((item)=>(
            item.nombre.toLowerCase().includes(buscador.toLowerCase())
        )))
        
    }
    useEffect(()=>{

        socket.emit("client-caja-nombre",buscador)
        socket.on("server-caja-nombre",(data)=>{
            setasesoria(data)
        })
        socket.on("server-vacio-nombre",(message)=>{
            setasesoria(message)
        })
    },[buscador])
  return (
    <div className='mt-2'>
        <form onSubmit={handleserch}> 
        <input type="text" className='form-control' placeholder='ingrese su nombre' onChange={(e)=>setbuscador(e.target.value)} />
        </form>
    
   
    <div className=" w-100 mt-5">
    <table className="table w-100  ">
      <thead className="bg-dark  text-white">
        <tr>
          <th>Nombre</th>
          <th>Turno</th>
        </tr>
      </thead>
      <tbody>
        {asesoria.map((item) => (
          <tr>
            <td>
              <p>{item.nombre}</p>
            </td>
            <td>
              <p>{item.idUsuario}ASE</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
  )
}

export default Asesoria
