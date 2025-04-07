CREATE DATABASE seu_banco;
USE seu_banco;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  cargo varchar(9),
  cpf char(13),
  linha varchar (10),
  dataNasc date,
  dataEntrada datetime default current_timestamp,
  senha varchar(100) NOT NULL,
  fk_responsavel int,
  fk_empresa int,
  constraint ct_responsavel foreign key (fk_responsavel) references users(id),
  constraint CT_empresa foreign key (fk_empresa) references empresa(id),
  constraint chkCargo Check (cargo in ("analista","gestor")),
  constraint chkLinha check (linha in ("azul", "verde","vermelha"))
);


create table empresa ( 
id int primary key auto_increment,
nomeEmpresa varchar (45),
cnpjEmpresa char(14),
Responsavel varchar (45),
nomeFantasia varchar(45),
razaoSocial varchar(45),
email varchar(45));

create table dados (id int primary key auto_increment,
 dataColeta date,
 tipoDado varchar(45),
 linha varchar(10),
 constraint chkLinha check (linha in ("azul", "verde","vermelha")))
;




