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
function submitOrder(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const form = document.getElementById('form');
    const formData = new FormData(form);

    fetch('order.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Или response.json(), если ожидается JSON
        }
        throw new Error('Сетевая ошибка.');
    })
    .then(data => {
        console.log(data); // Обработка успешного ответа
        alert('Заказ успешно отправлен!');
    })
    .catch(error => {
        console.error('Произошла ошибка при отправке:', error);
        alert('Ошибка при отправке заказа. Пожалуйста, попробуйте снова.');
    });
}
