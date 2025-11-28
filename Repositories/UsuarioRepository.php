<?php
require_once __DIR__ . '/../Models/Usuario.php';

class UsuarioRepository {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }


    public function criar(Usuario $usuario) {
        try {
            $sql = "INSERT INTO usuarios (nome, data_nascimento, email, telefone, senha) VALUES (:nome, :data, :email, :tel, :senha)";
            
            $stmt = $this->conn->prepare($sql);
            
            $senhaSegura = password_hash($usuario->senha, PASSWORD_DEFAULT);

            $stmt->bindValue(':nome', $usuario->nome);
            $stmt->bindValue(':data', $usuario->data_nascimento);
            $stmt->bindValue(':email', $usuario->email);
            $stmt->bindValue(':tel', $usuario->telefone);
            $stmt->bindValue(':senha', $senhaSegura);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            die("ERRO NO BANCO DE DADOS: " . $e->getMessage());
        }
    }


    public function buscarPorEmail($email) {
        $sql = "SELECT * FROM usuarios WHERE email = :email";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':email', $email);
        $stmt->execute();
        
        return $stmt->fetchObject('Usuario');
    }
    
    public function atualizarSenha($userId, $novaSenha) {
        try {
            $sql = "UPDATE usuarios SET senha = :senha WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            
            $senhaSegura = password_hash($novaSenha, PASSWORD_DEFAULT);
            $stmt->bindValue(':senha', $senhaSegura);
            $stmt->bindValue(':id', $userId);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            return false;
        }
    }
}
?>