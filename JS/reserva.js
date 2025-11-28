
document.addEventListener('DOMContentLoaded', function() {
    configurarDatasMinimas();
    configurarMascaras();
    carregarTema();
});


function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function carregarTema() {
    const tema = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (tema === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}


function configurarDatasMinimas() {
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    
    const hojeStr = hoje.toISOString().split('T')[0];
    const amanhaStr = amanha.toISOString().split('T')[0];
    
    const inputRetirada = document.getElementById('dataRetirada');
    const inputDevolucao = document.getElementById('dataDevolucao');
    

    inputRetirada.min = hojeStr;
    inputDevolucao.min = amanhaStr;
    

    inputRetirada.addEventListener('change', function() {
        const dataRetirada = new Date(this.value);
        const proximoDia = new Date(dataRetirada);
        proximoDia.setDate(dataRetirada.getDate() + 1);
        
        inputDevolucao.min = proximoDia.toISOString().split('T')[0];
        

        if (inputDevolucao.value && inputDevolucao.value <= this.value) {
            inputDevolucao.value = '';
        }
        
        atualizarPeriodo();
    });
    
    inputDevolucao.addEventListener('change', atualizarPeriodo);
    

    inputRetirada.value = hojeStr;
    inputDevolucao.value = amanhaStr;
    

    setTimeout(atualizarPeriodo, 100);
}


function configurarMascaras() {

    document.getElementById('cpf').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });
    

    document.getElementById('telefone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });
}


function atualizarPeriodo() {
    const dataRetirada = document.getElementById('dataRetirada').value;
    const dataDevolucao = document.getElementById('dataDevolucao').value;
    const diasElement = document.getElementById('diasSelecionados');
    
    if (!dataRetirada || !dataDevolucao) {
        diasElement.textContent = 'Selecione as datas';
        document.querySelectorAll('.valor-total').forEach(el => el.textContent = '0');
        return;
    }
    
    const dias = calcularDias(dataRetirada, dataDevolucao);
    
    if (dias <= 0) {
        diasElement.textContent = 'Datas inválidas';
        diasElement.style.color = '#e74c3c';
        document.querySelectorAll('.valor-total').forEach(el => el.textContent = '0');
        return;
    }
    

    diasElement.style.color = '#27ae60';
    diasElement.innerHTML = `
        <strong>${dias} ${dias === 1 ? 'dia' : 'dias'}</strong><br>
        <small>${formatarData(dataRetirada)} → ${formatarData(dataDevolucao)}</small>
    `;
    

    document.querySelectorAll('.card').forEach(card => {
        const precoDiario = parseInt(card.dataset.preco);
        const total = precoDiario * dias;
        const elementoTotal = card.querySelector('.valor-total');
        

        elementoTotal.style.transform = 'scale(1.1)';
        elementoTotal.style.color = '#27ae60';
        elementoTotal.textContent = total.toLocaleString('pt-BR');
        
        setTimeout(() => {
            elementoTotal.style.transform = 'scale(1)';
        }, 200);
    });
}


function limparDatas() {
    document.getElementById('dataRetirada').value = '';
    document.getElementById('dataDevolucao').value = '';
    document.getElementById('diasSelecionados').textContent = 'Selecione as datas';
    document.getElementById('diasSelecionados').style.color = '#495057';
    
    document.querySelectorAll('.valor-total').forEach(el => {
        el.textContent = '0';
        el.style.color = '#e74c3c';
    });
}


function calcularDias(dataInicio, dataFim) {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diffTime = fim - inicio;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}


function abrirReserva(categoria, preco) {
    const dataRetirada = document.getElementById('dataRetirada').value;
    const dataDevolucao = document.getElementById('dataDevolucao').value;
    
    if (!dataRetirada || !dataDevolucao) {
        mostrarAlerta('⚠️ Atenção', 'Por favor, selecione as datas de retirada e devolução primeiro.', 'warning');

        document.querySelectorAll('.date-input').forEach(input => {
            input.style.borderColor = '#ff6b6b';
            input.style.boxShadow = '0 0 0 3px rgba(255, 107, 107, 0.2)';
            setTimeout(() => {
                input.style.borderColor = '#e1e8ed';
                input.style.boxShadow = 'none';
            }, 2000);
        });
        return;
    }
    
    const dias = calcularDias(dataRetirada, dataDevolucao);
    if (dias <= 0) {
        mostrarAlerta('❌ Erro', 'Data de devolução deve ser posterior à data de retirada', 'error');
        return;
    }
    
    const total = preco * dias;
    

    document.getElementById('veiculoSelecionado').textContent = 
        categoria.charAt(0).toUpperCase() + categoria.slice(1);
    
    document.getElementById('periodoReserva').textContent = 
        `${formatarData(dataRetirada)} até ${formatarData(dataDevolucao)} (${dias} ${dias === 1 ? 'dia' : 'dias'})`;
    
    document.getElementById('valorTotal').textContent = 
        `Total: R$ ${total.toLocaleString('pt-BR')}`;
    

    window.dadosReserva = {
        categoria,
        preco,
        dataRetirada,
        dataDevolucao,
        dias,
        total
    };
    
    // Mostrar modal
    document.getElementById('modalReserva').style.display = 'block';
}

// Fechar modal
function fecharModal() {
    document.getElementById('modalReserva').style.display = 'none';
    document.getElementById('formReserva').reset();
}

function fecharModalSucesso() {
    document.getElementById('modalSucesso').style.display = 'none';
    location.reload();
}
function enviarReserva(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const dados = Object.fromEntries(formData);
    

    if (!validarCPF(dados.cpf)) {
        alert('CPF inválido');
        return;
    }
    

    const reserva = {
        ...dados,
        ...window.dadosReserva,
        codigo: gerarCodigoReserva()
    };
    

    const btnConfirmar = document.querySelector('.btn-confirmar');
    btnConfirmar.textContent = 'Processando...';
    btnConfirmar.disabled = true;
    
    setTimeout(() => {

        fecharModal();
        
        // Mostrar modal de sucesso
        document.getElementById('codigoReserva').textContent = reserva.codigo;
        document.getElementById('modalSucesso').style.display = 'block';
        

        btnConfirmar.textContent = 'Confirmar Reserva';
        btnConfirmar.disabled = false;
        

        salvarReserva(reserva);
        
    }, 2000);
}


function mostrarAlerta(titulo, mensagem, tipo = 'info') {
    const cores = {
        info: '#3498db',
        warning: '#f39c12',
        error: '#e74c3c',
        success: '#27ae60'
    };
    
    const alerta = document.createElement('div');
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-left: 4px solid ${cores[tipo]};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    alerta.innerHTML = `
        <div style="font-weight: 600; color: ${cores[tipo]}; margin-bottom: 5px;">${titulo}</div>
        <div style="color: #666; font-size: 14px;">${mensagem}</div>
    `;
    
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        alerta.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alerta.remove(), 300);
    }, 3000);
}


function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    
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
    return resto === parseInt(cpf.charAt(10));
}


function gerarCodigoReserva() {
    return 'VIN' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
}


function formatarData(data) {
    return new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');
}


function salvarReserva(reserva) {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
}


window.onclick = function(event) {
    const modalReserva = document.getElementById('modalReserva');
    const modalSucesso = document.getElementById('modalSucesso');
    
    if (event.target === modalReserva) {
        fecharModal();
    }
    if (event.target === modalSucesso) {
        fecharModalSucesso();
    }
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModal();
        fecharModalSucesso();
    }
});