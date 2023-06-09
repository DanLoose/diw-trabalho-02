const produtosContainer = document.getElementById('produtos');
const filtroContainer = document.querySelector(".filtro-container");

// form fields
const nomeInput = document.getElementById("nome");
const selectCategoria = document.querySelector("#categoria");
const botaoFiltro = document.getElementById("botao-filtro");
const inputs = [nomeInput, selectCategoria];

// EVENT LISTENERS
window.addEventListener("load", async event => {

    let categorias = await listarCategorias();

    renderizarEstruturaCategorias(categorias);
    renderizarCategoriasFiltro(categorias);
    renderizaCategoriasHeader(categorias);

})

inputs.forEach(input => {
    input.addEventListener("input", lidarComBotaoFiltro);
});

botaoFiltro.addEventListener("click", filtrar);

// FUNÇÕES
async function filtrar(e) {
    e.preventDefault();

    nomeInput.disabled = false;
    selectCategoria.disabled = false;

    let nomesFiltrados = [];
    let categoriasFiltradas = [];

    let nome = nomeInput.value.toLowerCase();
    let categoria = selectCategoria.value;

    if (nome) {
        nomesFiltrados = await listarProdutos(nome)
    }

    if (categoria) {
        categoriasFiltradas = await listarProdutosCategoria(categoria)
    }

    if (nomesFiltrados.length > 0) {
        produtosContainer.innerHTML = `<hr>
        <div class="row gap-2 justify-content-center">
        <a href="index.html"> Voltar </a>
            ${renderizarProdutos(nomesFiltrados, 100)}
        </div>`
        nomeInput.value = "";
        selectCategoria.value = "";
    } else if (categoriasFiltradas.length > 0) {
        produtosContainer.innerHTML = `<hr>
        <div class="row gap-2 justify-content-center">
        <a href="index.html"> Voltar </a>
            ${renderizarProdutos(categoriasFiltradas, 100)}
        </div>`
        nomeInput.value = "";
        selectCategoria.value = "";
    } else {
        produtosContainer.innerHTML = `<hr>
        <div class="row gap-2 justify-content-center">
            <p> Nenhum elemento encontrado. </p>
            <a href="index.html"> Voltar </a>
        </div>`

    }

}

function lidarComBotaoFiltro() {
    const camposPreenchidos = inputs.some(input => input.value !== "");

    if (inputs[0].value) {
        inputs[1].disabled = true
    } else if (inputs[1].value) {
        inputs[0].disabled = true
    }

    if (camposPreenchidos) {
        botaoFiltro.disabled = false;
    } else {
        botaoFiltro.disabled = true;
    }
}

function renderizarEstruturaCategorias(categorias) {
    categorias.forEach(async categoria => {

        let produtos = await listarProdutosCategoria(categoria);

        produtosContainer.innerHTML += `<hr>
                                        <div class="row gap-2 justify-content-center">
                                            <a href="./screens/categorias.html?categoria=${categoria}" style="text-decoration: none"> 
                                                <h2 style="color: rgb(255, 101, 0);"> ${categoria} </h2> 
                                            </a>
                                            ${renderizarProdutos(produtos, 4)}
                                        </div>`
    })
}

function renderizarCategoriasFiltro(categorias) {

    categorias.forEach(categoria => {
        selectCategoria.innerHTML +=
            `<option value="${categoria}">${categoria}</option>`

    })
}
