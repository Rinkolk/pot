let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для добавления товара в корзину
function addToCart(item, price) {
    cart.push({ item, price });
    updateCart();
    saveCart();
}

// Функция для обновления отображения корзины
function updateCart() {
    const cartContents = document.getElementById('cartContents');
    if (cart.length === 0) {
        cartContents.innerHTML = 'Нет товаров в корзине.';
    } else {
        const itemsHTML = cart.map((item, index) => `
            <div class="cart-item">
                ${item.item} - ${item.price}₽
                <button onclick="removeFromCart(${index})">Удалить</button>
            </div>
        `).join('');

        const total = calculateTotal();
        cartContents.innerHTML = `
            ${itemsHTML}
            <br><strong>Общая стоимость: ${total}₽</strong>
        `;
    }
}

// Функция для вычисления общей стоимости
function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

// Функция для очистки корзины
function clearCart() {
    cart = [];
    updateCart();
    saveCart();
}

// Функция для сохранения корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция для перехода к оформлению заказа
function checkout() {
    window.location.href = 'checkout.html'; // Переход на страницу оформления заказа
}

// Функция для отправки заказа
function submitOrder(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    // Валидация формы
    if (!formData.get('name') || !formData.get('email')) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }

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
        alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
    });
}

// Инициализация EmailJS
emailjs.init("yNhmfV4hoZvtDhRmfb");

// Обработчик отправки формы заказа через EmailJS
document.getElementById('form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращает обновление страницы

   // Валидация формы перед отправкой
   const formData = new FormData(this);
   if (!formData.get('name') || !formData.get('email')) {
       alert('Пожалуйста, заполните все обязательные поля.');
       return;
   }

   emailjs.sendForm('service_q170446', 'template_gyj77m8', this)
   .then(function() {
       alert('Сообщение успешно отправлено!');
       submitOrder(event); // Отправка заказа после успешной отправки EmailJS
   }, function(error) {
       alert('Ошибка отправки: ' + error);
   });
});
