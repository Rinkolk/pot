let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
    saveCart();
}

function updateCart() {
    const cartContents = document.getElementById('cartContents');
    if (cart.length === 0) {
        cartContents.innerHTML = 'Нет товаров в корзине.';
    } else {
        cartContents.innerHTML = cart.map((item, index) => `
            ${item.item} - ${item.price}₽
            <button onclick="removeFromCart(${index})">Удалить</button>
        `).join('<br>');

        // Вычисляем и отображаем общую стоимость
        const total = calculateTotal();
        cartContents.innerHTML += `<br><strong>Общая стоимость: ${total}₽</strong>`;
    }
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

function clearCart() {
    cart = [];
    updateCart();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function checkout() {
    window.location.href = 'checkout.html';
}

function submitOrder(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('cart', JSON.stringify(cart));

    fetch('order.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        clearCart();
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

emailjs.init("yNhmfV4hoZvtDhRmfb");

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращает обновление страницы

    emailjs.sendForm('service_q170446', 'template_gyj77m8', this)
    .then(function() {
        alert('Сообщение успешно отправлено!');
    }, function(error) {
        alert('Ошибка отправки: ' + error);
    });
});
