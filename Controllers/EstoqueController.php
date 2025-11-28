<?php


require_once __DIR__ . '/../Config/Database.php';
require_once __DIR__ . '/../Repositories/VeiculoRepository.php';

class EstoqueController {

    public function index() {

        $database = new Database();
        $db = $database->getConnection();


        $veiculoRepo = new VeiculoRepository($db);


        $filtros = [
            'marca'       => $_GET['marca'] ?? null,
            'modelo'      => $_GET['modelo'] ?? null,
            'ano'         => $_GET['ano'] ?? null,
            'combustivel' => $_GET['combustivel'] ?? null,
            'cambio'      => $_GET['cambio'] ?? null
        ];


        $veiculos = $veiculoRepo->buscarComFiltros($filtros);


        require_once __DIR__ . '/../views/estoque/index.php';

        require_once __DIR__ . '/../views/partials/header.php';
        
        require_once __DIR__ . '/../views/partials/footer.php';
    }
}