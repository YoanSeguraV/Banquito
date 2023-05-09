
drop database if exists banquito;

create database banquito;
use banquito;
create table tbl_usuariosCaja(
idUsuario int auto_increment,
nombre varchar(80),
tipoDocumento varchar (5),
identificacion varchar(80),
correo varchar(100),
estadoEspera boolean,
estado boolean,
servicio varchar(10),
constraint PK_ID_USUARIO primary key(idUsuario)
);
create table tbl_usuariosAsesoria(
idUsuario int auto_increment,
nombre varchar(80),
tipoDocumento varchar (5),
identificacion varchar(80),
correo varchar(100),
estadoEspera boolean,
estado boolean,
servicio varchar(10),
constraint PK_ID_USUARIO primary key(idUsuario)
);


create table tbl_empleados(
idEmpledo int auto_increment,
nombre varchar(80),
correo varchar(80),
contrasena varchar(100),
nrDocumento integer,
servicio varchar(10),
constraint PK_ID_EMPLEADO primary key(idEmpledo)
);



create table tbl_turnos(
idTurno int ,
turno int ,
turnoAsesoria int,
constraint PK_ID_TURNO primary key(idTurno)
);
