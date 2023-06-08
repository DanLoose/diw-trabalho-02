function cardProduto(produto, produtos, avaliacao, estrelasAvaliacao) {
    return `
        <a href="/screens/detalhes.html?id=${produto.id}" class="col text-decoration-none  py-2 border rounded my-2 text-black"> 
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