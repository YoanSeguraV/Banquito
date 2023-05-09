import { useState } from "react";
import { Link,Navigate } from "react-router-dom";
import io from "socket.io-client";
import Swal from 'sweetalert2'
import fondo from '../assets/fondo.jpg'

const socket = io("http://localhost:4000/");

function Login() {

 
  const [form, setform] = useState({
    correo: "",
    constrasena: "",
  });
  const handleSumbit = ({ target }) => {
    setform({ ...form, [target.name]: target.value });
  };

  const handleOnsumbit = (e) => {
    e.preventDefault();
    socket.emit("client-login", form);
    socket.on("login-bien", ({token,name}) => {
      //  localStorage.setItem("token", token);
      console.log(name)
      console.log(token)

      Swal.fire({
        title: "Bienvenido a mi Banquito",
        icon: "success",
        timer: 1500,
        showConfirmButton:false,
        button:(localStorage.setItem("token", token),localStorage.setItem("name", name))
        
      }).then(()=>{
        window.history.pushState(null, null ,"/peticiones")
        window.location.reload()
      })
    });
    socket.on("login-incorrecto",(message)=>{
      console.log(message)
      Swal.fire({
        icon: "warning",
        text:message,
        timer: 1500,
      })

    })
    socket.on("login-campos",(message)=>{
      
      Swal.fire({
        icon: "warning",
        text:message,
        timer: 1500,
      })

    })
   
  };
  return (
    

      <section class="vh-100 hv-100">
  <div class="container w-75 h-100 ">
    <div class="row mt-5 pb-5" style={{height:"95%"}} >
      <div class="col-sm-6 text-black bg-dark  " >

       

        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">


          <form className="rounded  w-100 mt-4"  onSubmit={handleOnsumbit}>
            <Link
              to={"/"}
              className="text-white nav-link fs-3 py-4 text-center mt-4 fw-bold"
            >
              MI BANQUITO 🏦
            </Link>
            <label className="text-white" htmlFor="">
              Correo Electronico
            </label>
            <input
              type="email"
              className="form-control  my-3"
              name="correo"
              placeholder="ingrese correo"
              onChange={handleSumbit}
            />
            <label className="text-white" htmlFor="">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control my-3"
              name="contrasena"
              placeholder="ingrese passsword"
              onChange={handleSumbit}
            />
            <button type="submit" className="btn btn-primary my-3 w-100 mb-3 ">
              Iniciar Sesion
            </button>
          </form>

          

        </div>

      </div>
      <div class="col-sm-6 px-0 d-none d-sm-block" >
        <img src={fondo}
          alt="Login image" class="w-100 "  style={{objectFit: "cover; object-position: left",height:"100%"}}/>
      </div>
    </div>
  </div>
</section>
   
  );
}

export default Login;
