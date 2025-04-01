const carrinho = document.querySelector("#carrinho");
const lista_carrinho = JSON.parse(localStorage.getItem("lista_carrinho")) || [];

function criarElemento(tag, classes = [], atributos = {}, conteudo = "") {
  const elemento = document.createElement(tag);
  
  if (classes.length) {
    elemento.classList.add(...classes);
  }
  
  for (const [attr, value] of Object.entries(atributos)) {
    elemento.setAttribute(attr, value);
  }
  
  if (conteudo) {
    elemento.textContent = conteudo;
  }
  
  return elemento;
}

function exibirCarrinhoVazio() {
  carrinho.innerHTML = "";
  
  const mensagemVazia = criarElemento("div", ["mensagem-vazia"]);
  
  const gif = criarElemento("img", [], {
    src: "carrinho-vazio.gif",
    alt: "Carrinho vazio",
    width: "125"
  });
  
  const titulo = criarElemento("h2", [], {}, "Seu carrinho está vazio");
  const descricao = criarElemento("p", [], {}, "Que tal conferir produtos incríveis e achar um especial para você?");
  
  const botaoNovidades = criarElemento("a", ["botao-novidades"], {
    href: "index.html"
  }, "Confira as Novidades");
  
  mensagemVazia.append(gif, titulo, descricao, botaoNovidades);
  carrinho.append(mensagemVazia);
}

function exibirItensCarrinho() {
  carrinho.innerHTML = "";
  
  let total = 0;
  
  lista_carrinho.forEach((item) => {
    const item_carrinho = criarElemento("div", ["item"]);
    
    const nome = criarElemento("h2", [], {}, item.title);
    const imagem = criarElemento("img", [], {
      src: item.image,
      width: "80",
      alt: item.title
    });
    
    const preco = criarElemento("p", [], {}, `R$ ${item.price.toFixed(2)}`);
    const quantidade = criarElemento("p", [], {}, `Quantidade: ${item.quantidade}`);
    
    const subtotal = item.price * item.quantidade;
    total += subtotal;
    
    const subtotalElem = criarElemento("p", [], {}, `Subtotal: R$ ${subtotal.toFixed(2)}`);
    
    const botaoRemover = criarElemento("button", [], {}, "Remover");
    botaoRemover.addEventListener("click", (event) => {
      event.stopPropagation();
      removerItemDoCarrinho(item.id);
    });
    
    item_carrinho.append(nome, imagem, preco, quantidade, subtotalElem, botaoRemover);
    carrinho.append(item_carrinho);
  });
  
  const totalElem = criarElemento("div", ["total"]);
  totalElem.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
  carrinho.append(totalElem);
  
  const finalizarCompra = criarElemento("button", ["finalizar-compra"], {}, "Finalizar Compra");
  finalizarCompra.addEventListener("click", finalizarCompraHandler);
  
  carrinho.append(finalizarCompra);
}

function finalizarCompraHandler() {
  alert("Compra finalizada! Obrigado por comprar conosco.");
  localStorage.removeItem("lista_carrinho"); 
  window.location.href = "index.html";
}

function removerItemDoCarrinho(id) {
  const listaAtualizada = lista_carrinho.filter(item => item.id !== id);
  
  if (listaAtualizada.length !== lista_carrinho.length) {
    localStorage.setItem("lista_carrinho", JSON.stringify(listaAtualizada));
    alert("Item removido do carrinho!");
    window.location.reload();
  } else {
    alert("Item não encontrado no carrinho.");
  }
}

if (lista_carrinho.length === 0) {
  exibirCarrinhoVazio();
} else {
  exibirItensCarrinho();
}