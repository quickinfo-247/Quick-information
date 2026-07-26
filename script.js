let cart = [];

// Search
function searchProducts() {
    const input = document.getElementById("search");
    const filter = input.value.toLowerCase();

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();

        card.style.display = title.includes(filter) ? "" : "none";
    });
}

// Add to Cart
function addToCart(name, price) {

    let item = cart.find(product => product.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    updateCart();
} {
    cart.push({ name, price });

    document.getElementById("cart-count").textContent = cart.length;

    const list = document.getElementById("cart-items");

    const li = document.createElement("li");
    li.textContent = `${name} - ₹${price}`;
    list.appendChild(li);

    let total = 0;
    cart.forEach(item => total += item.price);

    document.getElementById("cart-total").textContent = total;
}

// WhatsApp Order
function sendWhatsAppOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello, I want to order:%0A%0A";

    cart.forEach(item => {
        message += `${item.name} - ₹${item.price}%0A`;
    });

    let total = 0;
    cart.forEach(item => total += item.price);

    message += `%0ATotal = ₹${total}`;

    window.open("https://wa.me/918509727933?text=" + message, "_blank");
}