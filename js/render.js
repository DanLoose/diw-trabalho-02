
function renderizaCategoriasHeader(categorias) {

    const categoriasHeader = document.querySelector("#categorias-header");

    for (let i = 0; i < categorias.length; i++) {

        let categoria = categorias[i]

        categoriasHeader.innerHTML +=
            `<li><a class="dropdown-item" href="#">${categoria}</a></li>`

    }

}

function renderizarProdutos(produtos, limit) {
    let products = "";

    for (let i = 0; i < (limit > produtos.length ? produtos.length : limit); i++) {

        let produto = produtos[i]
        let avaliacao = produto.rating.rate
        let estrelasAvaliacao = criaElementoAvaliacao(avaliacao)

        products += cardProduto(produto, produtos, avaliacao, estrelasAvaliacao)

    }

    return products
}