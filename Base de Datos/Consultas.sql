use banquito;
select * from tbl_usuariosCaja;
select * from tbl_usuariosAsesoria;
select * from tbl_empleados;
select * from tbl_turnos;
insert into tbl_turnos( idTurno,turno,turnoAsesoria) value(1,1,1) ;
insert into tbl_turnos(turno) value(1);



delete from tbl_usuarios where turno =2;