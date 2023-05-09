import { Route, Routes } from "react-router-dom";
import Cajas from "../pages/Trabajadores/Cajas";
import NavbarEmpleado from "../components/NavbarEmpleado";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Preguntas from "../pages/Preguntas";
import Asesoria from "../pages/Trabajadores/Asesoria";
import PrivateRouter from "./PrivateRouter";
import Historial from "../pages/Trabajadores/Historial";
import CajaHistorial from "../components/CajaHistorial";
import AsesoriaHistorial from "../components/AsesoriaHistorial";
import Turnos from "../pages/Turnos";
import Navbar from "../components/Navbar";

function AppRouter() {
  return (
    <Routes>
      {/* <Route path='/preguntas' element={<Preguntas/>}/> */}
      <Route path="/" element={<Navbar />}>
        <Route index element={<Homepage />} />
        <Route path="turno" element={<Turnos />} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRouter />}>
        <Route path="/peticiones" element={<NavbarEmpleado />}>
          <Route index element={<Cajas />} />
          <Route path="asesoria" element={<Asesoria />} />
          <Route path="historial" element={<Historial />}>
            <Route index element={<CajaHistorial />} />
            <Route path="asesoriahistorial" element={<AsesoriaHistorial />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
