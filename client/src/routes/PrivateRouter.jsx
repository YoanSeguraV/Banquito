import {Navigate,Outlet} from 'react-router-dom'

function PrivateRouter() {
    const islogged=localStorage.getItem("token")
    if(!islogged){
       return <Navigate to={"/"}/>
    }
  return (
   <Outlet/>
  )
}

export default PrivateRouter
