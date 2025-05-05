CREATE DATABASE IF NOT EXISTS FluxoCerto;
USE FluxoCerto;

CREATE TABLE empresa (
 id INT PRIMARY KEY AUTO_INCREMENT,
 nomeEmpresa VARCHAR(45),
 cnpjEmpresa CHAR(14),
 Responsavel VARCHAR(45),
 nomeFantasia VARCHAR(45),
 razaoSocial VARCHAR(45),
 email VARCHAR(45)
);

CREATE TABLE users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(50) NOT NULL,
 cargo VARCHAR(9),
 cpf CHAR(13),
 linha VARCHAR(10),
 dataNasc DATE,
 dataEntrada DATETIME DEFAULT CURRENT_TIMESTAMP,
 senha VARCHAR(100) NOT NULL,
 fk_responsavel INT,
 fk_empresa INT,
 CONSTRAINT ct_responsavel FOREIGN KEY (fk_responsavel) REFERENCES users(id),
 CONSTRAINT CT_empresa FOREIGN KEY (fk_empresa) REFERENCES empresa(id),
 CONSTRAINT chkCargo CHECK (cargo IN ("analista", "gestor")),
 CONSTRAINT chkLinha CHECK (linha IN ("azul", "verde", "vermelha"))
);

CREATE TABLE dados (
 id INT PRIMARY KEY AUTO_INCREMENT,
 dataColeta DATE,
 tipoDado VARCHAR(45),
 linha VARCHAR(10),
 CONSTRAINT chkDadosLinha CHECK (linha IN ("azul", "verde", "vermelha"))
);
