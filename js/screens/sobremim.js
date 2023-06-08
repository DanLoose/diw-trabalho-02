window.addEventListener("load", async event => {

    let [categoriasGerais] = await listarCategorias();
    renderizaCategoriasHeader(categoriasGerais);

})