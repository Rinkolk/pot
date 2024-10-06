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

function sendMail(){
     let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        adress : document.getElementById("adress").value,
        phone : document.getElementById("phone").value,
     }

     emailjs.send("service_hep84r6","template_sh6vwus",parms).then(alert("Email Sent"))
}
