# Sobre o projeto
Trabalho Prático 2 de Desenvolvimento de Interfaces Web, 
Sistemas de informção Noturno - PUC Minas 01/2023

Tecnologias: 
* HTML
* CSS
* JavaScript
* Bootstrap
* Consumo de APIs


## Alunos integrantes da equipe
Danilo Mascarenhas Loose
[LinkedIn](https://www.linkedin.com/in/danilo-loose/)

## Professores responsáveis
João Caram

## Instruções de utilização
Acesse o link a seguir para ver o site publicado: 
https://trabalho-2-diw.000webhostapp.com/index.html

### Detalhes de implementação: 
Todas as páginas a seguir são responsivas.
O site consiste em 4 páginas: 
- Index (Home page)

        Impressão dos produtos recuperados por meio da API. Filtro de produtos por meio de categorias e por meio do nome. Só é possível usar um filtro por vez.

- Categorias 
  
        Essa página é aberta ao clicar em alguma catégoria (no título) e imprime diversos produtos daquela categoria. 
- Sobre mim 
  
      Algumas informações sobre o desenvolvedor.

- Detalhes
  
       Ao clicar em qualquer produto, essa página será aberta e será impresso na tela todas as informações daquele produto retornados por meio da API. 


### Scripts
Na pasta js encontram se todos os scripts do site. 
Na pasta "componentes" estão os elementos que se repetem em estilo idependete de qual página ele foi renderizado, exemplo: 
1. navbar 
2. footer
3. card de produtos (sem detalhes)
4. tabela de detalhes do protudo

Na pasta screens se ecnontra o script individual de cada página, com as implementações necessárias para que os botões e renderizações funcionem. Diretamente na pasta de js se encontram os scripts padrão de serviços: 
1. ProductsController responsável por fazer todas as iterações com a API. 
2. Render responsável por renderizar outros elementos que podem se repetir em páginas diferentes, como o dropdown de categorias do header
3. Servicos responsável por ter todas as funções que não pertencem necessariamente a uma pagina, como função de slugify, criar as estrelas de avaliação e outros.  