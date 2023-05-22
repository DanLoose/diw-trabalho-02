window.addEventListener("load", async event => {

    let produtos = await listarProdutos()
    renderizarProdutos(produtos[0])

})

const produtosContainer = document.getElementById('produtos')

function renderizarProdutos(produtos) {
    for (let i = 0; i < produtos.length; i++) {

        let produto = produtos[i]
        let avaliacao = produto.rating.rate
        let estrelasAvaliacao = criaElementoAvaliacao(avaliacao)

        console.log(produto)

        produtosContainer.innerHTML +=
            `<a href="./detalhes.html?id=${produto.id}" class="text-decoration-none">
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