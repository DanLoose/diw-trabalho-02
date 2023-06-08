let products;


const produtosContainer = document.getElementById('produtos');
const campoFiltragem = document.getElementById("campo-filtragem");
const filtroContainer = document.querySelector(".filtro-container");

// form fields
const nomeInput = document.getElementById("nome");
const selectCategoria = document.querySelector("#categoria");
const precoMinimoInput = document.getElementById("precoMinimo");
const precoMaximoInput = document.getElementById("precoMaximo");
const dropDownSeta = document.getElementById("dropdown-seta");
const botaoFiltro = document.getElementById("botao-filtro");
const inputs = [nomeInput, selectCategoria, precoMinimoInput, precoMaximoInput];

// EVENT LISTENERS
window.addEventListener("load", async event => {

    let [categoriasGerais, categoriasEspecificas, categorias] = await listarCategorias();
    products = await listarProdutos();
    renderizarEstruturaCategorias(categoriasGerais, categorias);
    renderizarCategoriasFiltro(categoriasGerais);
    renderizaCategoriasHeader(categoriasGerais);

})

filtroContainer.addEventListener("click", abreEfechaFiltro);

inputs.forEach(input => {
    input.addEventListener("input", lidarComBotaoFiltro);
});

botaoFiltro.addEventListener("click", filtrar);

// FUNÇÕES
function abreEfechaFiltro() {
    campoFiltragem.classList.toggle("aberto");
    dropDownSeta.classList.toggle("fa-caret-right");
    dropDownSeta.classList.toggle("fa-caret-down");
}

async function filtrar(e) {
    e.preventDefault();

    let nomesFiltrados = [];
    let categoriasFiltradas = [];
    let precoMinFiltrados = [];
    let precoMaxFiltrados = [];
    let filtroCompleto = [];

    let nome = nomeInput.value.toLowerCase();
    let categoria = selectCategoria.value.toLowerCase();
    let precoMin = precoMinimoInput.value;
    let precoMax = precoMaximoInput.value;

    if (nome) {
        nomesFiltrados = await listarProdutos(nome)
        produtosContainer.innerHTML = `<hr>
        <div class="row gap-2 justify-content-center">
            ${renderizarProdutos(nomesFiltrados, 100)}
        </div>`
        return
    } else nomesFiltrados = products

    if (categoria) {
        products.forEach(product => {
            if (product.category.toLowerCase().includes(categoria)) {
                categoriasFiltradas.push(product);

            }
        })
    } else categoriasFiltradas = products

    if (precoMin) {
        products.forEach(product => {
            if (product.price >= precoMin) {
                precoMinFiltrados.push(product);
            }
        })
    } else precoMinFiltrados = products

    if (precoMax) {
        products.forEach(product => {
            if (product.price <= precoMax) {
                precoMaxFiltrados.push(product);
            }
        })
    } else precoMaxFiltrados = products

    filtroCompleto = await obterIntersecaoArrays(nomesFiltrados, categoriasFiltradas, precoMinFiltrados, precoMaxFiltrados);

    produtosContainer.innerHTML = `<hr>
    <div class="row gap-2 justify-content-center">
        ${renderizarProdutos(filtroCompleto, 100)}
    </div>`

    nomeInput.value = "";
    selectCategoria.value = "";
    precoMinimoInput.value = "";
    precoMaximoInput.value = "";
}

function lidarComBotaoFiltro() {
    const camposPreenchidos = inputs.some(input => input.value !== "");
    if (camposPreenchidos) {
        botaoFiltro.disabled = false;
    } else {
        botaoFiltro.disabled = true;
    }
}

function renderizarEstruturaCategorias(categoriasGerais, categorias) {
    categoriasGerais.forEach(async categoria => {

        let categoriaMestra = categorias.find(element => element.includes(categoria))
        let produtos = await listarProdutosCategoria(categoriaMestra);

        produtosContainer.innerHTML += `<hr>
                                        <div class="row gap-2 justify-content-center">
                                            <a href="./screens/categorias.html?categoria=${categoriaMestra}" style="text-decoration: none"> 
                                                <h2 style="color: rgb(255, 101, 0);"> ${categoria} </h2> 
                                            </a>
                                            ${renderizarProdutos(produtos, 4)}
                                        </div>`
    })
}

function renderizarCategoriasFiltro(categorias) {


    for (let i = 0; i < categorias.length; i++) {

        let categoria = categorias[i]

        selectCategoria.innerHTML +=
            `<option value="${slugify(categoria)}">${categoria}</option>`

    }
}
