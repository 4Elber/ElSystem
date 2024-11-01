let cart = [];
let totalAmount = 0;

window.onload = () => {
    loadCartFromStorage();
    updateCartDisplay();
};

// Função para adicionar um item ao carrinho
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    totalAmount += price;
    saveCartToStorage();
    showMessage("Produto adicionado ao carrinho!");
    updateCartDisplay();
}

// Função para exibir ou esconder o carrinho
function toggleCart() {
    const cartSection = document.getElementById('cart-items-section');
    cartSection.classList.toggle('active');
}

// Função para remover um item do carrinho
function removeFromCart(index) {
    totalAmount -= cart[index].price;
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartDisplay();
}

// Função para exibir o carrinho
function updateCartDisplay() {
    document.getElementById('cart-count').innerText = cart.length;
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
    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
}

// Função para abrir a seção de finalização de compra
function openCheckout() {
    document.getElementById('checkout-section').classList.remove('hidden');
    document.getElementById('checkout-items').innerHTML = cart.map(item => `<p>${item.name} - R$ ${item.price.toFixed(2)}</p>`).join('');
    document.getElementById('checkout-total').innerText = totalAmount.toFixed(2);
}

// Função para fechar a seção de finalização de compra
function openCheckout() {
    // Verifica se o carrinho tem itens
    if (cart.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
        return; // Impede a abertura da página de checkout se o carrinho estiver vazio
    }
    
    // Armazena os itens do carrinho no localStorage para uso na página de checkout
    localStorage.setItem('cartForCheckout', JSON.stringify(cart));
    localStorage.setItem('totalForCheckout', totalAmount.toFixed(2));
    
    // Abre a página de checkout em uma nova aba
    window.open('checkout.html', '_blank');
}

// Finalizar compra
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Compra concluída com sucesso!");
    clearCart();  // Limpa o carrinho após a compra
    closeCheckout();
});

// Funções auxiliares
function clearCart() {
    cart = [];
    totalAmount = 0;
    saveCartToStorage();
    updateCartDisplay();
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

function showMessage(message) {
    let messageDiv = document.getElementById('message');
    messageDiv.innerText = message;
    messageDiv.classList.remove('hidden');
    messageDiv.classList.add('visible');
    setTimeout(() => {
        messageDiv.classList.remove('visible');
        messageDiv.classList.add('hidden');
    }, 2000);
}
