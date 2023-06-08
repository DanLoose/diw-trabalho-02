const produtoContainer = document.getElementById('produto-info')

window.addEventListener("load", async event => {

    const searchParams = new URL(location.href).searchParams
    let id = searchParams.get('id')
    let produto = await listarProduto(id)

    renderizarProduto(produto)
    let [categoriasGerais] = await listarCategorias();
    renderizaCategoriasHeader(categoriasGerais);
})

function renderizarProduto(produto) {

    let avaliacao = produto.rating.rate
    let estrelasAvaliacao = criaElementoAvaliacao(avaliacao)



    produtoContainer.innerHTML +=
        `
            <div class="row"> 
                <div class="col"> 
                    <h2 class="text-center"> ${produto.title} </h2> 
                </div>
            </div>

            <div class="row flex-column flex-sm-row"> 
                <div class="col-7 text-center m-auto"> 
                    <img class="" width="50%" src=${produto.image} alt="Card image cap">
                </div>
                <div class="col d-flex flex-column justify-content-center mb-3 align-items-center"> 
                    <div> 
                        ${estrelasAvaliacao.innerHTML} <span>${produto.rating.rate} (${produto.rating.count})  </span>
                    </div>
                    <div>
                        <span class="text-decoration-line-through small-text"> R$${((produto.price) * (1.2)).toFixed(2).replace('.', ',')} </span>
                        <h1 style="color: rgb(255, 101, 0);" class="fw-bold"> R$ ${(produto.price).toFixed(2).replace('.', ',')} </h1>
                        <span class="small-text">ou em 10x de R$${(produto.price / 10).toFixed(2).replace('.', ',')} sem juros </span>    
                    </div>
                     <div>
                        <button style="background-color: rgb(255, 101, 0); color:white;" class="btn"> <b>COMPRAR AGORA</b> </button>
                    </div>
                </div>
            </div>

            <div class="row"> 
                ${produto.description}
            </div>

            <br>

            ${tabelaProduto(produto)}
        `

}

