create database policiadoexercito;
use policiadoexercito;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	sobrenome VARCHAR(50),
	email VARCHAR(50),
	telefone CHAR(11),
	senha VARCHAR(50)
);

create table Resultado(
	idQuiz int,
	fkUsuario int,
	constraint pkComposta primary key (idQuiz, fkUsuario),
	constraint fkUser foreign key (fkUsuario) references usuario(id),
	pontos int,
	tempo varchar(45),
	porcentagemAcertos int
) auto_increment = 100;


create table faleConosco(
	idFaleConosco int primary key auto_increment,
	fkUsuario int,
	constraint fkUsuarioFaleConosco foreign key (fkusuario) references usuario(id),
	nome varchar(50),
	email varchar(50),
	mensagem varchar(150)
) auto_increment = 5000;

