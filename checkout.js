window.onload = () => {
    // Carrega os dados do carrinho do localStorage
    const cartForCheckout = JSON.parse(localStorage.getItem('cartForCheckout'));
    const totalForCheckout = localStorage.getItem('totalForCheckout');

    // Exibe os itens do carrinho e o total
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');
    checkoutTotal.innerText = totalForCheckout;

    if (cartForCheckout && cartForCheckout.length > 0) {
        checkoutItems.innerHTML = cartForCheckout.map(item => `<p>${item.name} - R$ ${item.price.toFixed(2)}</p>`).join('');
    } else {
        checkoutItems.innerHTML = '<p>Nenhum item no carrinho</p>';
    }
};

// Lida com o envio do formulário de checkout
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Compra concluída com sucesso!");

    // Limpa os dados do carrinho no localStorage
    localStorage.removeItem('cartForCheckout');
    localStorage.removeItem('totalForCheckout');
});
