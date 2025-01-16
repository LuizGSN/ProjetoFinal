const carrinho = document.querySelector("#carrinho");
const lista_carrinho = JSON.parse(localStorage.getItem("lista_carrinho")) || [];

if (lista_carrinho.length === 0) {
    const mensagemVazia = document.createElement("div");
    mensagemVazia.classList.add("mensagem-vazia");

    const gif = document.createElement("img");
    gif.src = "carrinho-vazio.gif";
    gif.alt = "Carrinho vazio";
    gif.width = 125;

    const titulo = document.createElement("h2");
    titulo.textContent = "Seu carrinho está vazio";

    const descricao = document.createElement("p");
    descricao.textContent = "Que tal conferir produtos incríveis e achar um especial para você?";

    const botaoNovidades = document.createElement("a");
    botaoNovidades.textContent = "Confira as Novidades";
    botaoNovidades.href = "index.html";
    botaoNovidades.classList.add("botao-novidades");


    mensagemVazia.append(gif, titulo, descricao, botaoNovidades);
    carrinho.append(mensagemVazia);

} else {
    let total = 0;

    lista_carrinho.forEach((item) => {
        const item_carrinho = document.createElement("div");
        item_carrinho.classList.add("item");

        const nome = document.createElement("h2");
        nome.textContent = item.title;

        const imagem = document.createElement("img");
        imagem.src = item.image;
        imagem.width = 80;

        const preco = document.createElement("p");
        preco.textContent = "R$ " + item.price;

        const quantidade = document.createElement("p");
        quantidade.textContent = "Quantidade: " + item.quantidade;

        const subtotal = item.price * item.quantidade;
        total += subtotal;

        const subtotalElem = document.createElement("p");
        subtotalElem.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.addEventListener("click", (event) => {
            event.stopPropagation();
            removerItemDoCarrinho(item.id);
        });

        item_carrinho.append(nome, imagem, preco, quantidade, subtotalElem, botaoRemover);
        carrinho.append(item_carrinho);
    });

    const totalElem = document.createElement("div");
    totalElem.classList.add("total");
    totalElem.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
    carrinho.append(totalElem);

    const finalizarCompra = document.createElement("button");
    finalizarCompra.textContent = "Finalizar Compra";
    finalizarCompra.classList.add("finalizar-compra");
    finalizarCompra.addEventListener("click", () => {
        alert("Compra finalizada! Obrigado por comprar conosco.");
        localStorage.removeItem("lista_carrinho"); 
        window.location.href = "index.html";
    });

    carrinho.append(finalizarCompra);
}

function removerItemDoCarrinho(id) {
    const lista_carrinho = JSON.parse(localStorage.getItem("lista_carrinho")) || [];

    const index = lista_carrinho.findIndex((item) => item.id === id);
    if (index !== -1) {
        lista_carrinho.splice(index, 1);
        localStorage.setItem("lista_carrinho", JSON.stringify(lista_carrinho));

        alert("Item removido do carrinho!");
        window.location.reload();
    } else {
        alert("Item não encontrado no carrinho.");
    }
}
