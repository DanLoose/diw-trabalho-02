window.addEventListener("load", async event => {

    const searchParams = new URL(location.href).searchParams
    let id = searchParams.get('id')
    let objetoProduto = await listarProduto(id)

    renderizarProduto(objetoProduto)

})


const produtoContainer = document.getElementById('produto-info')

function renderizarProduto(produto) {
    console.log(produto)


    let avaliacao = produto.rating.rate
    let estrelasAvaliacao = criaElementoAvaliacao(avaliacao)

    produtoContainer.innerHTML +=
        `
            <div class="row"> 
                <div class="col"> 
                    <h5> ${produto.title} </h5> 
                </div>
            </div>
            <div class="row"> 
                <div class="col text-center"> ${estrelasAvaliacao.innerHTML} <span> (${produto.rating.count})  </span></div>
            </div>
            <div class="row"> 
                <div class="col text-center"> 
                    <img class="" width="50%" src=${produto.image} alt="Card image cap">
                </div>
            </div>
            <div class="row"> 
                <span class="text-decoration-line-through small-text"> R$${((produto.price) * (1.2)).toFixed(2).replace('.', ',')} </span>
                <h1 style="color: rgb(255, 101, 0);" class="fw-bold"> R$ ${(produto.price).toFixed(2).replace('.', ',')} </h1>
            </div>
            <div class="row"> 
                ${produto.description}
            </div>
        `

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