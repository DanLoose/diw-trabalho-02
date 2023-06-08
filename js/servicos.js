
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function criaElementoAvaliacao(avaliacao) {
    let divAvaliacao = document.createElement('div')
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(avaliacao)) {
            divAvaliacao.innerHTML += `<i class="fa-solid fa-star" style="color: #ff8800;"></i>`
        } else {
            divAvaliacao.innerHTML += `<i class="fa-solid fa-star" style="color: #cccccc;"></i>`
        }
    }
    return divAvaliacao
}
