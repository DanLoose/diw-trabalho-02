const navbar = document.querySelector("#navbar");
navbar.innerHTML +=
    `
<nav class="navbar navbar-expand-lg bg-secondary-subtle">
        <div class="container-fluid">

            <!-- brand  -->
            <a class="navbar-brand" href="/index.html">Danilo's Ecommerce</a>

            <!-- botao  -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- itens escondidos  -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/screens/sobremim.html">Sobre Mim</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Categorias
                        </a>
                        <ul id="categorias-header" class="dropdown-menu">
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
`