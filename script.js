let cart = [];
let totalAmount = 0;

window.onload = () => {
    loadCartFromStorage();
    updateCartDisplay();
};

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    totalAmount += price;
    saveCartToStorage();
    showMessage("Produto adicionado ao carrinho!");
    updateCartDisplay();
}

function removeFromCart(index) {
    totalAmount -= cart[index].price;
    cart.splice(index, 1);
    saveCartToStorage();
    updateCartDisplay();
}

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

function clearCart() {
    cart = [];
    totalAmount = 0;
    saveCartToStorage();
    showMessage("Carrinho limpo!");
    updateCartDisplay();
}

function openCart() {
    document.getElementById('cart-items-section').classList.toggle('active');
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
