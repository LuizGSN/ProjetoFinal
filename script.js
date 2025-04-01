const DOM = {
    catalogo: document.querySelector("#catalogo"),
    qtde_carrinho: document.querySelector("#qtde_carrinho"),
    icone_carrinho: document.querySelector("#carrinho")
  };
  
  const carrinho = {
    itens: JSON.parse(localStorage.getItem("lista_carrinho")) || [],
    
    atualizarContador() {
      DOM.qtde_carrinho.textContent = this.itens.length;
    },
    
    adicionarItem(produto) {
      const itemExistente = this.itens.find(item => item.id === produto.id);
      
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        this.itens.push({ ...produto, quantidade: 1 });
      }
      
      this.salvar();
      this.atualizarContador();
    },
    
    salvar() {
      localStorage.setItem("lista_carrinho", JSON.stringify(this.itens));
    }
  };
  
  carrinho.atualizarContador();
  
  const ApiService = {
    BASE_URL: "https://fakestoreapi.com/products",
    
    async buscarProdutos() {
      try {
        const response = await fetch(this.BASE_URL);
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        return await response.json();
      } catch (error) {
        console.error("Falha na requisição:", error);
        DOM.catalogo.innerHTML = `<p class="error">Não foi possível carregar os produtos. Tente novamente mais tarde.</p>`;
        return [];
      }
    }
  };
  
  function criarCardProduto(produto) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = produto.id;

    const handleClick = (e) => {
      if (!e.target.closest("button")) {
        localStorage.setItem("idProduto_selecionado", produto.id);
        window.location.href = "./produto.html";
      }
    };
    
    card.addEventListener("click", handleClick);
    card.innerHTML = `
      <img src="${produto.image}" alt="${produto.title}" loading="lazy">
      <div class="card-content">
        <h2>${produto.title}</h2>
        <p class="price">R$ ${produto.price.toFixed(2)}</p>
        <button class="btn-add">Adicionar ao carrinho</button>
      </div>
    `;
    const btn = card.querySelector(".btn-add");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      carrinho.adicionarItem(produto);
      mostrarFeedback("Item adicionado ao carrinho!");
    });
    
    return card;
  }
  
  function mostrarFeedback(mensagem) {
    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.textContent = mensagem;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      feedback.classList.add("show");
    }, 10);
    
    setTimeout(() => {
      feedback.classList.remove("show");
      setTimeout(() => feedback.remove(), 300);
    }, 2000);
  }
  
  async function carregarProdutos() {
    const produtos = await ApiService.buscarProdutos();
    
    if (produtos.length) {
      DOM.catalogo.innerHTML = "";
      
      const fragment = document.createDocumentFragment();
      produtos.forEach(produto => {
        fragment.appendChild(criarCardProduto(produto));
      });
      
      DOM.catalogo.appendChild(fragment);
    }
  }
  
  document.addEventListener("DOMContentLoaded", carregarProdutos);