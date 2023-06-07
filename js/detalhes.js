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
                    <h2 class="text-center"> ${produto.title} </h2> 
                </div>
            </div>

            <div class="row"> 
                <div class="col-8 text-center"> 
                    <img class="" width="50%" src=${produto.image} alt="Card image cap">
                </div>
                <div class="col d-flex flex-column justify-content-center"> 
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

            <div class="row"> 
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th>Marca</th>
                            <td>${produto.brandName}</td>
                        </tr>
                        <tr>
                            <th>Categoria</th>
                            <td>${produto.category}</td>
                        </tr>
                        <tr>
                            <th>Cor</th>
                            <td>${produto.baseColour}</td>
                        </tr>
                        <tr>
                            <th>Ano</th>
                            <td>${produto.year}</td>
                        </tr>
                        <tr>
                            <th>Temporada</th>
                            <td>${produto.season}</td>
                        </tr>
                        <tr>
                            <th>Uso</th>
                            <td>${produto.usage}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `

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