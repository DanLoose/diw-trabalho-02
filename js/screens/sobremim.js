window.addEventListener("load", async event => {

    let categorias = await listarCategorias();
    renderizaCategoriasHeader(categorias);

})