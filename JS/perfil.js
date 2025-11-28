let campoEditando = null;

function editarCampo(campo) {
    if (campoEditando && campoEditando !== campo) {
        cancelarEdicao(campoEditando);
    }

    const display = document.getElementById(`${campo}-display`);
    const input = document.getElementById(`${campo}-input`);
    const icon = display.parentElement.querySelector('.edit-icon');

    display.style.display = 'none';
    input.style.display = 'block';
    input.value = display.textContent;
    input.focus();

    icon.className = 'fa-solid fa-check edit-icon';
    icon.onclick = () => salvarCampo(campo);

    campoEditando = campo;

    input.onkeypress = function(e) {
        if (e.key === 'Enter') {
            salvarCampo(campo);
        } else if (e.key === 'Escape') {
            cancelarEdicao(campo);
        }
    };
}

function salvarCampo(campo) {
    const display = document.getElementById(`${campo}-display`);
    const input = document.getElementById(`${campo}-input`);
    const icon = display.parentElement.querySelector('.edit-icon');

    if (!input.value.trim()) {
        alert('Campo não pode estar vazio!');
        return;
    }

    if (campo === 'email' && !validarEmail(input.value)) {
        alert('Email inválido!');
        return;
    }

    if (campo === 'cpf' && !validarCPF(input.value)) {
        alert('CPF inválido!');
        return;
    }

    display.textContent = input.value;
    
    display.style.display = 'block';
    input.style.display = 'none';

    icon.className = 'fa-solid fa-pen edit-icon';
    icon.onclick = () => editarCampo(campo);

    campoEditando = null;

    console.log(`Campo ${campo} atualizado para: ${input.value}`);
}

function cancelarEdicao(campo) {
    const display = document.getElementById(`${campo}-display`);
    const input = document.getElementById(`${campo}-input`);
    const icon = display.parentElement.querySelector('.edit-icon');

    display.style.display = 'block';
    input.style.display = 'none';

    icon.className = 'fa-solid fa-pen edit-icon';
    icon.onclick = () => editarCampo(campo);

    campoEditando = null;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

document.addEventListener('DOMContentLoaded', function() {
    const fotoContainer = document.getElementById('foto-container');
    const uploadFoto = document.getElementById('upload-foto');
    const fotoPerfil = document.getElementById('foto-perfil');

    fotoContainer.addEventListener('click', function() {
        uploadFoto.click();
    });

    uploadFoto.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                fotoPerfil.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

function salvarPerfil() {
    if (campoEditando) {
        salvarCampo(campoEditando);
    }

    const dadosPerfil = {
        nome: document.getElementById('nome-display').textContent,
        email: document.getElementById('email-display').textContent,
        telefone: document.getElementById('telefone-display').textContent,
        nascimento: document.getElementById('nascimento-display').textContent,
        cpf: document.getElementById('cpf-display').textContent,
        cep: document.getElementById('cep-display').textContent,
        endereco: document.getElementById('endereco-display').textContent,
        cidade: document.getElementById('cidade-display').textContent,
        estado: document.getElementById('estado-display').textContent
    };

    console.log('Salvando perfil:', dadosPerfil);
    
    const btnSalvar = document.getElementById('btn-salvar');
    const textoOriginal = btnSalvar.innerHTML;
    
    btnSalvar.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Salvando...';
    btnSalvar.disabled = true;
    
    setTimeout(() => {
        btnSalvar.innerHTML = '<i class="fa-solid fa-check"></i> Salvo!';
        setTimeout(() => {
            btnSalvar.innerHTML = textoOriginal;
            btnSalvar.disabled = false;
        }, 2000);
    }, 1500);
}

function alterarSenha() {
    const senhaAtual = prompt('Digite sua senha atual:');
    if (!senhaAtual) return;

    const novaSenha = prompt('Digite a nova senha:');
    if (!novaSenha) return;

    const confirmarSenha = prompt('Confirme a nova senha:');
    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    if (novaSenha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
    }

    console.log('Alterando senha...');
    alert('Senha alterada com sucesso!');
}

document.addEventListener('DOMContentLoaded', function() {
    const cpfInput = document.getElementById('cpf-input');
    
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone-input');
    
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep-input');
    
    cepInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep-input');
    
    cepInput.addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('endereco-input').value = data.logradouro;
                        document.getElementById('cidade-input').value = data.localidade;
                        document.getElementById('estado-input').value = data.uf;
                    }
                })
                .catch(error => {
                    console.log('Erro ao buscar CEP:', error);
                });
        }
    });
});