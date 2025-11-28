<?php

class EmailRepository {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }
    

    public function salvarPreferencias($usuarioId, $emailsPromocionais, $tiposEmail) {
        try {

            $sql = "UPDATE email_preferences SET emails_promocionais = :emails_promocionais, tipos_email = :tipos_email WHERE usuario_id = :usuario_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(':usuario_id', $usuarioId);
            $stmt->bindValue(':emails_promocionais', $emailsPromocionais ? 1 : 0);
            $stmt->bindValue(':tipos_email', json_encode($tiposEmail));
            $stmt->execute();
            

            if ($stmt->rowCount() == 0) {
                $sql = "INSERT INTO email_preferences (usuario_id, emails_promocionais, tipos_email) VALUES (:usuario_id, :emails_promocionais, :tipos_email)";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindValue(':usuario_id', $usuarioId);
                $stmt->bindValue(':emails_promocionais', $emailsPromocionais ? 1 : 0);
                $stmt->bindValue(':tipos_email', json_encode($tiposEmail));
                $stmt->execute();
            }
            
            return true;
        } catch (PDOException $e) {
            error_log('Erro ao salvar preferências: ' . $e->getMessage());
            return false;
        }
    }
    

    public function buscarPreferencias($usuarioId) {
        $sql = "SELECT * FROM email_preferences WHERE usuario_id = :usuario_id ORDER BY id DESC LIMIT 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindValue(':usuario_id', $usuarioId);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    

    public function logEmail($usuarioId, $tipoEmail, $assunto, $status) {
        try {
            $sql = "INSERT INTO email_logs (usuario_id, tipo_email, assunto, status) 
                    VALUES (:usuario_id, :tipo_email, :assunto, :status)";
            
            $stmt = $this->conn->prepare($sql);
            $stmt->bindValue(':usuario_id', $usuarioId);
            $stmt->bindValue(':tipo_email', $tipoEmail);
            $stmt->bindValue(':assunto', $assunto);
            $stmt->bindValue(':status', $status);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            return false;
        }
    }
}

?>