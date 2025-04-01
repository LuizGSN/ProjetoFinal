const elements = {
    nome: document.querySelector("#resposta_nome"),
    descricao: document.querySelector("#resposta_descricao"),
    preco: document.querySelector("#resposta_preco"),
    imagem: document.querySelector("#resposta_img"),
    comprar: document.querySelector("#comprar")
  };
  
  const productId = localStorage.getItem("idProduto_selecionado");
  const API_URL = `https://fakestoreapi.com/products/${productId}`;
  
  let productData = null;
  async function fetchProduct() {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      productData = await response.json();
      return productData;
    } catch (error) {
      console.error("Falha ao buscar produto:", error);
      elements.nome.textContent = "Produto não encontrado";
      return null;
    }
  }
  
  function displayProduct(product) {
    if (!product) return;
    
    elements.nome.textContent = product.title;
    elements.descricao.textContent = product.description;
    elements.preco.textContent = `$${product.price.toFixed(2)}`;
    elements.imagem.src = product.image;
    elements.imagem.alt = product.title;
  }
  
  async function addToCart() {
    if (!productData) {
      productData = await fetchProduct();
      if (!productData) return;
    }
  
    const cartItems = JSON.parse(localStorage.getItem("lista_carrinho")) || [];
    const existingItemIndex = cartItems.findIndex(item => item.id === productData.id);
  
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantidade = (cartItems[existingItemIndex].quantidade || 1) + 1;
    } else {
      const newItem = { ...productData, quantidade: 1 };
      cartItems.push(newItem);
    }
  
    localStorage.setItem("lista_carrinho", JSON.stringify(cartItems));
    alert("Item adicionado ao carrinho com sucesso!");
  }
  
  (async function init() {
    const product = await fetchProduct();
    displayProduct(product);
    
    elements.comprar.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart();
    });
  })();