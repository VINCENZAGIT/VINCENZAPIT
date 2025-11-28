<?php

require_once __DIR__ . '/../Models/Veiculo.php';

class VeiculoRepository {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }


    public function buscarComFiltros($filtros = []) {
        $sql = "SELECT * FROM veiculos WHERE 1=1";
        $params = [];


        if (!empty($filtros['marca'])) {
            $sql .= " AND marca LIKE :marca";
            $params[':marca'] = '%' . $filtros['marca'] . '%';
        }

        if (!empty($filtros['modelo'])) {
            $sql .= " AND modelo LIKE :modelo";
            $params[':modelo'] = '%' . $filtros['modelo'] . '%';
        }

        if (!empty($filtros['ano'])) {
            $sql .= " AND ano = :ano";
            $params[':ano'] = $filtros['ano'];
        }

        if (!empty($filtros['combustivel'])) {
            $sql .= " AND combustivel = :combustivel";
            $params[':combustivel'] = $filtros['combustivel'];
        }

        if (!empty($filtros['cambio'])) {
            $sql .= " AND cambio = :cambio";
            $params[':cambio'] = $filtros['cambio'];
        }


        $sql .= " ORDER BY id DESC";


        try {
            $stmt = $this->conn->prepare($sql);
            $stmt->execute($params);


            return $stmt->fetchAll(PDO::FETCH_CLASS, 'Veiculo');
            
        } catch (PDOException $e) {

            echo "Erro na consulta: " . $e->getMessage();
            return [];
        }
    }
}