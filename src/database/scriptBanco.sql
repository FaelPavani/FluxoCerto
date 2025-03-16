create database FluxoCerto;
use FluxoCerto;


create table empresa (id_empresa int primary key auto_increment,
 nomeFantasia varchar(45),
 razaoSocial varchar(45),
 cnpj char(14));

create table usuario (
id int primary key auto_increment,
 nome varchar(45),
 sobrenome varchar(45),
 email varchar(45),
 senha varchar(155),
 fk_empresa int,
 foreign key (fk_empresa)
 references empresa(id_empresa)
 );