const produtosContainer = document.getElementById('produtos');

window.addEventListener("load", async event => {

    const searchParams = new URL(location.href).searchParams
    let categoria = searchParams.get('categoria')
    let produtos = await listarProdutosCategoria(categoria);
    let [categoriasGerais] = await listarCategorias();
    renderizaCategoriasHeader(categoriasGerais)

    produtosContainer.innerHTML += `<h4 style="color: rgb(255, 101, 0);"> ${categoria.split(" - ")[0]} </h4>`;
    produtosContainer.innerHTML += `<div class="row gap-2 justify-content-center">
                                        ${renderizarProdutos(produtos, 4)}
                                    </div>`


})

