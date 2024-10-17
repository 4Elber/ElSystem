let cart = [];
let totalAmount = 0;

// Carregar o estado do carrinho do localStorage ao iniciar
window.onload = () => {
    loadCartFromStorage();
    updateCartDisplay();
};

function addToCart(productName, price) {
    // Adiciona o item ao carrinho
    cart.push({ name: productName, price: price });
    totalAmount += price;

    // Atualiza localStorage
    saveCartToStorage();

    // Exibe uma mensagem de confirmação
    showMessage("Produto adicionado ao carrinho!");

    // Atualiza a exibição do carrinho
    updateCartDisplay();
}

function removeFromCart(index) {
    // Remove o item do carrinho e ajusta o total
    totalAmount -= cart[index].price;
    cart.splice(index, 1);

    // Atualiza localStorage
    saveCartToStorage();

    // Atualiza a exibição do carrinho
    updateCartDisplay();
}

function updateCartDisplay() {
    // Atualiza a contagem de itens no carrinho
    document.getElementById('cart-count').innerText = cart.length;

    // Atualiza a lista de itens no carrinho
    let cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    if (cart.length > 0) {
        cart.forEach((item, index) => {
            let li = document.createElement('li');
            li.innerHTML = `${item.name} - R$ ${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button>`;
            cartList.appendChild(li);
        });
    } else {
        cartList.innerHTML = '<li>Nenhum item no carrinho</li>';
    }

    // Atualiza o valor total
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
}

function loadCartFromStorage() {
    let savedCart = localStorage.getItem('cart');
    let savedTotal = localStorage.getItem('totalAmount');
    
    if (savedCart && savedTotal) {
        cart = JSON.parse(savedCart);
        totalAmount = parseFloat(savedTotal);
    }
}

// Função para limpar todo o carrinho
function clearCart() {
    // Limpa o carrinho e o total
    cart = [];
    totalAmount = 0;

    // Atualiza localStorage
    saveCartToStorage();

    // Exibe uma mensagem de confirmação
    showMessage("Carrinho limpo!");

    // Atualiza a exibição do carrinho
    updateCartDisplay();
}

function showMessage(message) {
    let messageDiv = document.getElementById('message');
    messageDiv.innerText = message;
    messageDiv.classList.remove('hidden');
    messageDiv.classList.add('visible');
    
    // Oculta a mensagem após 2 segundos
    setTimeout(() => {
        messageDiv.classList.remove('visible');
        messageDiv.classList.add('hidden');
    }, 2000);
}
