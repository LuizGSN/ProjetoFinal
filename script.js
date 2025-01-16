const catalogo = document.querySelector("#catalogo")
const qtde_carrinho = document.querySelector("#qtde_carrinho")
const icone_carrinho = document.querySelector("#carrinho");



const lista_carrinho = JSON.parse(localStorage.getItem("lista_carrinho")) || []

qtde_carrinho.textContent = lista_carrinho.length

async function buscarTodosProdutos() {
    const resposta = await fetch("https://fakestoreapi.com/products")
    const dados = await resposta.json()
    console.log(dados);

    dados.forEach((produto) => {
        produto.quantidade = 1
        const novo_elemento = document.createElement("div")
        novo_elemento.id = produto.id
        novo_elemento.classList.add("card")
        console.log(produto);

        novo_elemento.addEventListener("click", (e) => {
            if (e.target.id !== "botao") {
                window.location.href = "./produto.html"
                localStorage.setItem("idProduto_selecionado", e.target.parentElement.id)
            }

        })

        const nome = document.createElement("h2")
        nome.textContent = produto.title

        const imagem = document.createElement("img")
        imagem.src = produto.image

        const preco = document.createElement("p")
        preco.textContent = "R$ " + produto.price

        const botao = document.createElement("button")
        botao.textContent = "Adicionar ao carrinho"
        botao.id = "botao"


        botao.addEventListener("click", () => {
            const lista_carrinho = JSON.parse(localStorage.getItem("lista_carrinho")) || []

            if (lista_carrinho.length > 0) {
                let encontrado = false
                lista_carrinho.forEach((item) => {
                    if (item.id === produto.id) {
                        encontrado = true
                        item.quantidade += 1
                    }
                })
                if (!encontrado) {
                    lista_carrinho.push(produto)
                    qtde_carrinho.textContent = lista_carrinho.length
                }
            } else {
                lista_carrinho.push(produto)
                qtde_carrinho.textContent = lista_carrinho.length
            }

            localStorage.setItem("lista_carrinho", JSON.stringify(lista_carrinho))
            alert("Item adicionado")

        })

        novo_elemento.append(nome, imagem, preco, botao)
        catalogo.append(novo_elemento)
    })
}

buscarTodosProdutos()