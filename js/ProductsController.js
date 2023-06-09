const endpoint = 'https://diwserver.vps.webdock.cloud/'

async function listarProdutos(filtro) {
    let produtos;
    let query = filtro ? "/search?query=" + filtro : "";
    await fetch(endpoint + 'products' + query)
        .then(res => res.json())
        .then(json => {
            produtos = (json.products) || json
        })
    return produtos

}

async function listarProduto(id) {
    let produto
    await fetch(endpoint + 'products/' + id)
        .then(res => res.json())
        .then(json => produto = json)
    return produto
}

async function listarCategorias() {
    let categorias;
    await fetch(endpoint + 'products/categories')
        .then(res => res.json())
        .then(json => categorias = json)

    return categorias
}

async function listarProdutosCategoria(categoria) {
    let produtos;
    await fetch(endpoint + 'products/category/' + categoria)
        .then(res => res.json())
        .then(json => produtos = json)
    return produtos.products
}