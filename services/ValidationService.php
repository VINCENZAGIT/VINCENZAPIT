<?php

class ValidationService {
    public static function validarTermosAceitos($dadosPost) {
        if (!isset($dadosPost['aceitar_termos']) || $dadosPost['aceitar_termos'] !== '1') {
            return [
                'valido' => false,
                'mensagem' => 'Você deve aceitar os Termos de Uso para se registrar!'
            ];
        }
        
        if (!isset($dadosPost['aceitar_consentimento']) || $dadosPost['aceitar_consentimento'] !== '1') {
            return [
                'valido' => false,
                'mensagem' => 'Você deve aceitar os Termos de Consentimento para se registrar!'
            ];
        }
        
        return [
            'valido' => true,
            'mensagem' => 'Termos aceitos com sucesso'
        ];
    }
    public static function validarSenhas($senha, $repetirSenha) {
        if ($senha !== $repetirSenha) {
            return [
                'valido' => false,
                'mensagem' => 'As senhas não conferem!'
            ];
        }
        
        if (strlen($senha) < 6) {
            return [
                'valido' => false,
                'mensagem' => 'A senha deve ter pelo menos 6 caracteres!'
            ];
        }
        
        return [
            'valido' => true,
            'mensagem' => 'Senhas válidas'
        ];
    }
    public static function validarRedefinicaoSenha($senhaAtual, $novaSenha, $confirmarSenha, $senhaHashBanco) {
        if (!password_verify($senhaAtual, $senhaHashBanco)) {
            return [
                'valido' => false,
                'mensagem' => 'Senha atual incorreta!'
            ];
        }
        
        $validacaoNovasSenhas = self::validarSenhas($novaSenha, $confirmarSenha);
        if (!$validacaoNovasSenhas['valido']) {
            return $validacaoNovasSenhas;
        }
        
        if (password_verify($novaSenha, $senhaHashBanco)) {
            return [
                'valido' => false,
                'mensagem' => 'A nova senha deve ser diferente da senha atual!'
            ];
        }
        
        return [
            'valido' => true,
            'mensagem' => 'Nova senha válida'
        ];
    }
    public static function validarRegistroCompleto($dadosPost) {
        $validacaoSenhas = self::validarSenhas($dadosPost['senha'], $dadosPost['repetir_senha']);
        if (!$validacaoSenhas['valido']) {
            return $validacaoSenhas;
        }
        
        $validacaoTermos = self::validarTermosAceitos($dadosPost);
        if (!$validacaoTermos['valido']) {
            return $validacaoTermos;
        }
        
        return [
            'valido' => true,
            'mensagem' => 'Todos os dados são válidos'
        ];
    }
}

?>