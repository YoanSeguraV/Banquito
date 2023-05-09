import express from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import { Server as WebsocketServer } from "socket.io";
import { pool } from "./data/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);
const io = new WebsocketServer(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  socket.on("server-lister", async (op) => {
    try {
      const [rows] = await pool.query("SELECT * FROM tbl_usuariosCaja WHERE estado=1");
      socket.emit("server-listar", rows);
    } catch (error) {
      console.error(error);
    }
  });
//!  asesoria listar
  socket.on("server-lister-asesoria", async () => {
    try {
      const [rows] = await pool.query("SELECT * FROM tbl_usuariosAsesoria WHERE estado=1");
      socket.emit("server-listar-asesoria", rows);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("form-client", async (form) => {
    console.log(form);
    const { nombre, tipoDocumento, identificacion, correo, servicio } = form;

    if (nombre && tipoDocumento && identificacion && correo && servicio) {
      if (servicio === "CAJ") {
        const caja = "CAJ";
        const estados = 1;
        const estadoEspera = 1;
        const [result] = await pool.query(
          "INSERT INTO tbl_usuariosCaja  (nombre,tipoDocumento,identificacion,correo,estadoEspera,estado,servicio) VALUES(?,?,?,?,?,?,?)",
          [
            nombre,
            tipoDocumento,
            identificacion,
            correo,
            estadoEspera,
            estados,
            caja,
          ]
        );
        const [rows] = await pool.query(
          "SELECT * FROM tbl_usuariosCaja WHERE idUsuario=?",
          [result.insertId]
        );

        console.log(rows[0].servicio);
        if (rows[0].servicio == "CAJ") {
          socket.emit("server-insert", result.insertId + "CAJ");
        } else {
          socket.emit("server-insert", result.insertId + "ASE");
        }
      } else {
        {
          /!* Insertar usuario Asesoria*/;
        }
        const asesoria = "ASE";
        const estados = 1;
        const estadoEspera = 1;
        const [result] = await pool.query(
          "INSERT INTO tbl_usuariosAsesoria (nombre,tipoDocumento,identificacion,correo,estadoEspera,estado,servicio) VALUES(?,?,?,?,?,?,?)",
          [
            nombre,
            tipoDocumento,
            identificacion,
            correo,
            estadoEspera,
            estados,
            asesoria,
          ]
        );
        const [rows] = await pool.query(
          "SELECT * FROM tbl_usuariosAsesoria WHERE idUsuario=?",
          [result.insertId]
        );

        console.log(rows[0].servicio);
        if (rows[0].servicio == "CAJ") {
          socket.emit("server-insert", result.insertId + "CAJ");
        } else {
          socket.emit("server-insert", result.insertId + "ASE");
        }
      }
    } else {
      socket.emit("server-formulario-vacio", "complete todos los campos");
    }
  });
  {
    /!* Turnos Contador*/;
  }
  socket.on("client-get-contador-Caja", () => {
    setInterval(async () => {
      const [rows] = await pool.query("SELECT * FROM tbl_turnos");

      socket.emit("server-contador-Caja", rows);
    }, 1000);
  });

  // socket.on("client-get-contador-Asesoria",async()=>{

  //   const[rows]=await pool.query("SELECT turnoAsesoria  FROM tbl_turnos ")

  //     socket.emit("server-contador-Asesoria",rows)

  // })

  {
    /!* Turnos Asesoria cambiar estado*/;
  }
  socket.on("server-contador+", async (id) => {
    console.log(id);
    const [result] = await pool.query(
      "update tbl_turnos set turnoAsesoria=? where idTurno=1 ",
      [id]
    );
    socket.emit("success-contador", "bien hecho");
  });
  {
    /!* Turnos Caja cambiar estado*/;
  }
  socket.on("server-contador-caja", async (id) => {
    console.log(id);
    const [result] = await pool.query(
      "update tbl_turnos set turno=? where idTurno=1 ",
      [id]
    );
    socket.emit("success-contador", "bien hecho");
  });
  {
    /!* Turnos Caja cambiar estadoEspera*/;
  }
  socket.on("server-contador-caja-estado-espera", async (id) => {
    console.log(id);
    const [result] = await pool.query(
      "update tbl_usuariosCaja set estadoEspera=0 where idUsuario=? ",
      [id]
    );
  });

  {
    /!* usuario asesoria cambiar estado*/;
  }
  socket.on("client-asesoria-estado", async (id) => {
    const [result] = await pool.query(
      "update tbl_usuariosAsesoria set estado=0 where idUsuario=? ",
      [id]
    );
  });
  {
    /!* usuario Caja cambiar estado*/;
  }
  socket.on("client-caja-estado", async (id) => {
    const [result] = await pool.query(
      "update tbl_usuariosCaja set estado=0 where idUsuario=? ",
      [id]
    );
  });
  {
    /!* Turnos asesoria cambiar estadoEspera*/;
  }
  socket.on("server-contador-asesoria-estado-espera", async (id) => {
    const [result] = await pool.query(
      "update tbl_usuariosAsesoria set estadoEspera=0 where idUsuario=? ",
      [id]
    );
  });
  // socket.on("client-preguntas", (numero) => {
  //   console.log(numero);

  //   if (numero == 1) {
  //     socket.emit("server-1", {
  //       message: "Su peticion sera atendida por un asesor, puesto de espera ",
  //     });
  //   } else if (numero == 2) {
  //     socket.emit("server-1", {
  //       message: "Su peticion sera atendida en caja puesto de espera ",
  //     });
  //   }
  // });
  {
    /!* Listado de cliente caja*/;
  }
  socket.on("client-usuarios-caja", () => {
    try {
      setInterval(async () => {
        const [rows] = await pool.query(
          "SELECT * FROM tbl_usuariosCaja WHERE estado=1 "
        );
        socket.emit("server-listar-caja", rows);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  });
  {
    /!* Listado de cliente caja atendido*/;
  }
  socket.on("client-usuarios-caja-historial", async () => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM tbl_usuariosCaja WHERE estado=0 "
      );
      socket.emit("server-listar-caja-historial", rows);
    } catch (error) {
      console.error(error);
    }
  });

  {
    /!* Listado de cliente Asesoria*/;
  }
  socket.on("client-usuarios-asesor", () => {
    try {
      setInterval(async () => {
        const [rows] = await pool.query(
          "SELECT * FROM tbl_usuariosAsesoria WHERE estado=? ",
          [1]
        );
        socket.emit("server-listar-asesor", rows);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  });

  {
    /!* Listado de cliente Asesoria estado Atendido*/;
  }
  socket.on("client-usuarios-asesor-historial", async () => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM tbl_usuariosAsesoria WHERE estado=? ",
        [0]
      );
      socket.emit("server-listar-asesor-historial", rows);
    } catch (error) {
      console.error(error);
    }
  });

  // socket.on("client-usuarios-eliminar", async (id) => {
  //   try {
  //     const [result] = await pool.query(
  //       "DELETE FROM tbl_usuarios WHERE idUsuarios=? ",
  //       [id]
  //     );
  //     socket.emit("server-usuario-eliminado", "eliminado correctamnte");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  {
    /!* Buscar cliente caja*/;
  }
  socket.on("client-caja-nombre", async (nombre) => {
    if (nombre) {
      const [rows] = await pool.query(
        "SELECT * FROM tbl_usuarios  WHERE nombre=?",
        [nombre]
      );
      console.log(rows);
      socket.emit("server-caja-nombre", rows);
    } else {
      socket.emit("server-vacio-nombre", [
        { message: "No se encuentra registrado" },
      ]);
    }
  });
  {
    /!* Buscar cliente asesor*/;
  }
  socket.on("client-asesor-nombre", async (nombre) => {
    if (nombre) {
      const [rows] = await pool.query(
        "SELECT * FROM tbl_usuarios  WHERE nombre=?",
        [nombre]
      );
      console.log(rows);
      socket.emit("server-asesor-nombre", rows);
    } else {
      socket.emit("server-vacios-nombre", [
        { message: "No se encuentra registrado" },
      ]);
    }
  });

  socket.on("client-login", async (form) => {
    try {
      console.log(form);
      const { correo, contrasena } = form;
      console.log(contrasena);
      if (correo && contrasena) {
        const [rows] = await pool.query(
          "SELECT * FROM tbl_empleados WHERE correo=?",
          [correo]
        );
        console.log(rows);
        if (
          rows.length === 0 ||
          !(await bcryptjs.compare(contrasena, rows[0].contrasena))
        ) {
          socket.emit("login-incorrecto", "Usuario y/0 contraseña incorrecta");
        } else {
          const token = jwt.sign({ idEmpleado: rows[0].idEmpleado }, "secreto");
          const user = {
            name: rows[0].nombre,
            token: token,
          };
          socket.emit("login-bien", user);
        }
      } else {
        socket.emit("login-campos", "Ingrese Todos los campos");
      }
    } catch (error) {
      socket.emit("login-server", { mesagge: error.mesagge });
    }
  });
});

server.listen(4000);
console.log("server listen on port" + 4000);
