const endpoint = 'https://fakestoreapi.com/'

async function listarProdutos() {
    let produtos = []
    await fetch(endpoint + 'products/')
        .then(res => res.json())
        .then(json => produtos.push(json))
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
    let categorias = []
    await fetch(endpoint + 'products/categories')
        .then(res => res.json())
        .then(json => categorias.push(json))
    return categorias
}

async function listarProdutosCategoria(categoria) {
    let produtos = []
    await fetch(endpoint + 'category/' + categoria)
        .then(res => res.json())
        .then(json => produtos.push(json))
    return produtos
}