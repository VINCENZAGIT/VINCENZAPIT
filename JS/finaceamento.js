
let veiculosFiltrados = [...CARROS_DATA];
let currentCarData = {};
let selectedInstallments = 12;
let popupCurrentImage = 1;
let popupMax = 1;
let popupCurrentCar = "";
let isDragging = false;
let initialX = 0;


function parsePrice(priceString) {
    if (typeof priceString !== 'string') return priceString;
    return parseFloat(priceString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
}

function formatarMoeda(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}



function carregarVeiculos() {
    const grid = document.getElementById('cars-grid');
    grid.innerHTML = '';
    

    if (veiculosFiltrados.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%; padding:20px;">Nenhum veículo encontrado para simulação.</p>';
        return;
    }

    veiculosFiltrados.forEach(veiculo => {
        const card = document.createElement('div');
        card.className = 'car-card';

        card.onclick = () => openCarPopup(veiculo.modelo, veiculo.preco, veiculo.foto || `${veiculo.pasta}/1.webp`);
        
        let imagemCapa = veiculo.foto || `${veiculo.pasta}/1.webp`;
        let precoAntigo = formatarMoeda(veiculo.preco * 1.25);

        card.innerHTML = `
            <img src="${imagemCapa}" alt="${veiculo.modelo}" class="vehicle-img" onerror="this.src='https://via.placeholder.com/320x200?text=Sem+Foto'">
            <h3>${veiculo.marca} ${veiculo.modelo}</h3>
            <div class="price-container">
                <span class="old-price">${precoAntigo}</span>
                <span class="new-price">${formatarMoeda(veiculo.preco)}</span>
            </div>
        `;
        
        grid.appendChild(card);
    });
}



function carregarFiltros() {

    const marcas = [...new Set(CARROS_DATA.map(v => v.marca))];

    const categorias = ['hatch', 'sedan', 'suv', 'pickup', 'premium', 'elétrico']; 
    

    const selectMarca = document.getElementById('filter-marca');
    const selectCategoria = document.getElementById('filter-categoria');
    
    selectMarca.innerHTML = '<option value="">Todas as Marcas</option>';
    
    marcas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        selectMarca.appendChild(option);
    });
    

    if (selectCategoria.options.length <= 1) { // Só preenche se estiver vazio
         categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat.toUpperCase();
            selectCategoria.appendChild(option);
        });
    }
}

function aplicarFiltros() {

    
    const precoFiltro = document.getElementById('filtroPreco').value;
    const categoriaFiltro = document.getElementById('filtroCategoria').value;
    
    veiculosFiltrados = CARROS_DATA.filter(veiculo => {
        let mostrar = true;
        const precoNumerico = parsePrice(veiculo.preco);
        

        if (precoFiltro) {
            let [min, max] = precoFiltro.includes('+') ? 
                [parseInt(precoFiltro.replace('+', '')), Infinity] : 
                precoFiltro.split('-').map(p => parseInt(p));
            
            if (precoNumerico < min || precoNumerico > max) {
                mostrar = false;
            }
        }
        

        if (categoriaFiltro && veiculo.categoria !== categoriaFiltro) {
             mostrar = false;
        }
        
        return mostrar;
    });

    carregarVeiculos();
}

function limparFiltros() {
    document.getElementById('filtroPreco').value = '';
    document.getElementById('filtroCategoria').value = '';
    veiculosFiltrados = [...CARROS_DATA];
    carregarVeiculos();
}



function openCarPopup(carModel, carPrice, carImage) {
    const popup = document.getElementById('car-popup');
    const priceEl = document.getElementById('popup-price');
    const titleEl = document.getElementById('popup-title');
    

    let carData = CARROS_DATA.find(car => `${car.marca} ${car.modelo}` === carModel); 
    if (!carData) return;
    

    const data = {
        name: carModel,
        price: parsePrice(carData.preco),
        folder: carData.pasta,
        maxImages: parseInt(carData.total_imagens)
    };
    
    currentCarData = data;


    popupCurrentCar = data.folder;
    popupCurrentImage = 1;
    popupMax = data.maxImages;


    titleEl.textContent = `${carData.marca} ${carData.modelo}`;
    priceEl.textContent = formatarMoeda(data.price);
    

    document.getElementById('popup-model').textContent = carData.modelo;
    document.getElementById('popup-year').textContent = carData.ano;
    document.getElementById('popup-fuel').textContent = carData.combustivel;
    document.getElementById('popup-transmission').textContent = carData.cambio;
    
    updatePopupImage();
    updateInstallmentOptions();
    setupPopup360();
    
    popup.style.display = 'flex';
}


document.addEventListener('DOMContentLoaded', () => {
    carregarFiltros();
    carregarVeiculos();

});