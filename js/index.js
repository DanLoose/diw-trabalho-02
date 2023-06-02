window.addEventListener("load", async event => {

    let produtos = await listarProdutos();
    let [categoriasGerais, categoriasEspecificas, categorias] = await listarCategorias();
    let produtosCategorias = await listarProdutosCategoria(categorias[1])

    renderizarEstruturaCategorias(categoriasGerais, categorias);
    // renderizarProdutos(produtos);
    // renderizarCategorias(categoriasEspecificas);

})

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
filtroContainer.addEventListener("click", function () {
    campoFiltragem.classList.toggle("aberto");
    dropDownSeta.classList.toggle("fa-caret-right");
    dropDownSeta.classList.toggle("fa-caret-down");
});

inputs.forEach(input => {
    input.addEventListener("input", verificarCamposVazios);
});

botaoFiltro.addEventListener("click", filtrar);

// FUNÇÕES
function filtrar() {
    let produtos
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

        produtosContainer.innerHTML += `<h4 style="color: rgb(255, 101, 0);"> ${categoria} </h4>`
        produtosContainer.innerHTML += renderizarProdutos(produtos, 3)
    })
}

function renderizarProdutos(produtos, limit) {
    let products = "";
    for (let i = 0; i < (limit > produtos.length ? produtos.length : limit); i++) {

        let produto = produtos[i]
        let avaliacao = produto.rating.rate
        let estrelasAvaliacao = criaElementoAvaliacao(avaliacao)

        products += `<a href="./screens/detalhes.html?id=${produto.id}" class="text-decoration-none">
                <div class="row py-2 border rounded my-2 text-black"> 
                    <div class="col-auto px-3 d-flex">
                        <img class="" width="107px" src=${produto.image} alt="Card image cap">
                    </div>

                    <div class="col">
                        <h1 class="fs-6">${produto.title}</h1>
                        <small><span class="text-decoration-line-through small-text"> R$${((produto.price) * (1.2)).toFixed(2)} </span></small> 
                        <h5 style="color: rgb(255, 101, 0);" class="fw-bold"> R$${(produto.price).toFixed(2)} </h5>
                        <small>  <span> (${avaliacao}) </span>${estrelasAvaliacao.innerHTML} </small> 
                    </div>
                </div>
            </a>`

    }

    return products
}

function renderizarCategorias(categorias) {


    for (let i = 0; i < categorias.length; i++) {

        let categoria = categorias[i]

        selectCategoria.innerHTML +=
            `<option value="${slugify(categoria)}">${categoria}</option>`

    }
}

function criaElementoAvaliacao(rate) {
    let myDiv = document.createElement('div')
    for (let i = 1; i <= 5; i++) {
        if (i <= rate) {
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