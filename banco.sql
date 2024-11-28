
CREATE DATABASE GerenciamentoTarefas;
USE GerenciamentoTarefas;


CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(100) NOT NULL,       
    email VARCHAR(100) NOT NULL UNIQUE 
);


CREATE TABLE Tarefa (
    id_tarefa INT AUTO_INCREMENT PRIMARY KEY, 
    id_usuario INT NOT NULL,                  
    descricao TEXT NOT NULL,                  
    nome_setor VARCHAR(50) NOT NULL,         
    prioridade ENUM('baixa', 'média', 'alta') NOT NULL, 
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP, 
    status ENUM('a fazer', 'fazendo', 'pronto') NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)    
);


INSERT INTO Usuario (nome, email)
VALUES 
    ('João Silva', 'joao.silva@email.com'),
    ('Maria Oliveira', 'maria.oliveira@email.com');


INSERT INTO Tarefa (id_usuario, descricao, nome_setor, prioridade, status)
VALUES
    (1, 'Criar relatório mensal', 'Financeiro', 'alta', 'a fazer'),
    (1, 'Organizar reunião de equipe', 'RH', 'média', 'fazendo'),
    (2, 'Atualizar base de dados', 'TI', 'baixa', 'pronto');