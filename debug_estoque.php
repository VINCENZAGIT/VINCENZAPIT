<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/Config/Database.php';
require_once __DIR__ . '/Repositories/VeiculoRepository.php';

echo "<h2>Debug - Teste de Conexão e Dados</h2>";

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        echo "<p style='color: green;'>✓ Conexão com banco estabelecida com sucesso!</p>";
    } else {
        echo "<p style='color: red;'>✗ Falha na conexão com o banco</p>";
        exit;
    }
    
    $veiculoRepo = new VeiculoRepository($db);
    $veiculos = $veiculoRepo->buscarComFiltros([]);
    
    echo "<h3>Veículos encontrados: " . count($veiculos) . "</h3>";
    
    foreach ($veiculos as $index => $veiculo) {
        echo "<div style='border: 1px solid #ccc; margin: 10px; padding: 10px;'>";
        echo "<h4>Veículo " . ($index + 1) . "</h4>";
        echo "<strong>ID:</strong> " . ($veiculo->id ?? 'N/A') . "<br>";
        echo "<strong>Marca:</strong> " . ($veiculo->marca ?? 'N/A') . "<br>";
        echo "<strong>Modelo:</strong> " . ($veiculo->modelo ?? 'N/A') . "<br>";
        echo "<strong>Ano:</strong> " . ($veiculo->ano ?? 'N/A') . "<br>";
        echo "<strong>Preço:</strong> " . ($veiculo->preco ?? 'N/A') . "<br>";
        echo "<strong>Foto:</strong> " . ($veiculo->foto ?? 'N/A') . "<br>";
        echo "<strong>Pasta:</strong> " . ($veiculo->pasta ?? 'N/A') . "<br>";
        echo "<strong>Total Imagens:</strong> " . ($veiculo->total_imagens ?? 'N/A') . "<br>";
        
        if (!empty($veiculo->foto)) {
            $caminhoImagem = __DIR__ . '/' . $veiculo->foto;
            if (file_exists($caminhoImagem)) {
                echo "<strong>Status da Imagem:</strong> <span style='color: green;'>✓ Arquivo existe</span><br>";
                echo "<img src='" . $veiculo->foto . "' style='max-width: 200px; height: auto;' alt='Teste'><br>";
            } else {
                echo "<strong>Status da Imagem:</strong> <span style='color: red;'>✗ Arquivo não encontrado em: " . $caminhoImagem . "</span><br>";
            }
        }
        
        echo "<strong>JSON:</strong> <pre>" . json_encode($veiculo, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "</pre>";
        echo "</div>";
    }
    
} catch (Exception $e) {
    echo "<p style='color: red;'>Erro: " . $e->getMessage() . "</p>";
}
?>