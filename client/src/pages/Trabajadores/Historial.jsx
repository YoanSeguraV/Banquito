import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Historial() {
  return (
    <div>
        <h1 className='text-center mt-2'>Historial📄</h1>
      <form className='d-flex justify-content-center mt-4'>
        
          <Link className='btn btn-primary mx-2' to={""}>CAJA</Link>
           <Link className='btn btn-success mx-2' to={"asesoriahistorial"}> ASESORIA</Link>
         
        
      </form>
      <Outlet/>
    </div>

  )
}

export default Historial
