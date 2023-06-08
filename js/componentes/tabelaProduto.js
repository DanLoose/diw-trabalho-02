function tabelaProduto(produto) {
    return `<div class="row"> 
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
            </div>`
}