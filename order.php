<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "decoratepots@gmail.com"; // Ваш email
    $subject = "Новый заказ";
    
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $address = htmlspecialchars($_POST['address']);
    $phone = htmlspecialchars($_POST['phone']);
    $cart = json_decode(htmlspecialchars($_POST['cart']), true);
    
    $message = "Имя: $name\nEmail: $email\nАдрес: $address\nТелефон: $phone\n\nКорзина:\n";
    foreach ($cart as $item) {
        $message .= "- {$item['item']} - {$item['price']}₽\n";
    }
    $headers = "From: no-reply@decoratepots.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "Заказ успешно отправлен!";
    } else {
        echo "Ошибка при отправке заказа.";
    }
} else {
    echo "Неверный метод запроса.";
}
?>