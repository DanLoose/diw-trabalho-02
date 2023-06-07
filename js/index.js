let products;
window.addEventListener("load", async event => {

    let [categoriasGerais, categoriasEspecificas, categorias] = await listarCategorias();
    products = await listarProdutos();
    console.log(products);
    renderizarEstruturaCategorias(categoriasGerais, categorias);
    renderizarCategoriasFiltro(categoriasGerais);
    renderizaCategoriasHeader(categoriasGerais);

})

const produtosContainer = document.getElementById('produtos');
const campoFiltragem = document.getElementById("campo-filtragem");
const filtroContainer = document.querySelector(".filtro-container");
const categoriasHeader = document.querySelector("#categorias-header");

// form fields
const nomeInput = document.getElementById("nome");
const selectCategoria = document.querySelector("#categoria");
const precoMinimoInput = document.getElementById("precoMinimo");
const precoMaximoInput = document.getElementById("precoMaximo");
const dropDownSeta = document.getElementById("dropdown-seta");
const botaoFiltro = document.getElementById("botao-filtro");
const inputs = [nomeInput, selectCategoria, precoMinimoInput, precoMaximoInput];

// EVENT LISTENERS
// abre e fecha div de filtro
filtroContainer.addEventListener("click", abreEfechaFiltro);

// habilita e desabilita botao de filtro
inputs.forEach(input => {
    input.addEventListener("input", verificarCamposVazios);
});

// filtra a partir dos dados do input
botaoFiltro.addEventListener("click", filtrar);

// FUNÇÕES

function abreEfechaFiltro() {
    campoFiltragem.classList.toggle("aberto");
    dropDownSeta.classList.toggle("fa-caret-right");
    dropDownSeta.classList.toggle("fa-caret-down");
}

function filtrar(e) {
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
        products.forEach(product => {
            if (product.title.toLowerCase().includes(nome)) {
                nomesFiltrados.push(product);
            }
        })
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

    filtroCompleto = obterIntersecaoArrays(nomesFiltrados, categoriasFiltradas, precoMinFiltrados, precoMaxFiltrados);
    console.log(filtroCompleto);

    produtosContainer.innerHTML = renderizarProdutos(filtroCompleto, 100);

    nomeInput.value = "";
    selectCategoria.value = "";
    precoMinimoInput.value = "";
    precoMaximoInput.value = "";
}

function obterIntersecaoArrays(...arrays) {
    return arrays.reduce((intersecao, array) =>
        intersecao.filter(elemento => array.includes(elemento))
    );
}

function verificarCamposVazios() {
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
                                        <div class="row gap-2 justify-content-space-evenly">
                                            <a href="./screens/categorias.html?categoria=${categoriaMestra}" style="text-decoration: none"> 
                                                <h2 style="color: rgb(255, 101, 0);"> ${categoria} </h2> 
                                            </a>
                                            ${renderizarProdutos(produtos, 4)}
                                        </div>`
    })
}

function renderizarProdutos(produtos, limit) {
    let products = "";

    for (let i = 0; i < (limit > produtos.length ? produtos.length : limit); i++) {

        let produto = produtos[i]
        let avaliacao = produto.rating.rate
        let estrelasAvaliacao = criaElementoAvaliacao(avaliacao)

        products += `
                <a href="./screens/detalhes.html?id=${produto.id}" class="col-12 col-sm-5 col-md-3 col-xl-2 text-decoration-none  py-2 border rounded my-2 text-black"> 
                    <div class="px-3">
                        <img class="d-block ${produtos.length == 1 ? "" : "m-auto"}" width="107px" src=${produto.image} alt="Card image cap">
                    </div>

                    <div class="">
                        <h1 class="fs-6">${produto.title}</h1>
                        <small><span class="text-decoration-line-through small-text"> R$${((produto.price) * (1.2)).toFixed(2)} </span></small> 
                        <h5 style="color: rgb(255, 101, 0);" class="fw-bold"> R$${(produto.price).toFixed(2)} </h5>
                        <small>  <span> (${avaliacao}) </span>${estrelasAvaliacao.innerHTML} </small> 
                    </div>
                </a>`

    }

    return products
}

function renderizarCategoriasFiltro(categorias) {


    for (let i = 0; i < categorias.length; i++) {

        let categoria = categorias[i]

        selectCategoria.innerHTML +=
            `<option value="${slugify(categoria)}">${categoria}</option>`

    }
}

function renderizaCategoriasHeader(categorias) {

    for (let i = 0; i < categorias.length; i++) {

        let categoria = categorias[i]

        categoriasHeader.innerHTML +=
            `<li><a class="dropdown-item" href="#">${categoria}</a></li>`

    }

}

function criaElementoAvaliacao(rate) {
    let myDiv = document.createElement('div')
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(rate)) {
            myDiv.innerHTML += `<i class="fa-solid fa-star" style="color: #ff8800;"></i>`
        } else {
            myDiv.innerHTML += `<i class="fa-solid fa-star" style="color: #cccccc;"></i>`
        }
    }
    return myDiv
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');
}