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
function addToCart(name, price, image) {

    let item = cart.find(product => product.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });
    }

    updateCart();
}

}
function increaseQty(index) {
    cart[index].qty++;
    updateCart();
}

function decreaseQty(index) {

    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
function updateCart() {

    document.getElementById("cart-count").textContent = cart.length;

    const list = document.getElementById("cart-items");
    list.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        const li = document.createElement("li");

        li.innerHTML = `
<img src="${item.image}" width="60" height="60"
style="border-radius:8px;object-fit:contain;vertical-align:middle;">

<b>${item.name}</b><br>

₹${item.price} × ${item.qty}<br>


        <button onclick="increaseQty(${index})">+</button>

        <button onclick="decreaseQty(${index})">-</button>

        <button onclick="removeItem(${index})">🗑️</button>
        `;

        list.appendChild(li);

    });

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
        message += `${item.name} × ${item.qty} = ₹${item.price * item.qty}%0A`;
    });

    let total = 0;

cart.forEach(item => {
    total += item.price * item.qty;
});

    message += `%0ATotal = ₹${total}`;

    window.open("https://wa.me/918509727933?text=" + message, "_blank");
}
function toggleCart() {

    const cartBox = document.getElementById("cart-box");

    if (cartBox.style.display === "none") {
        cartBox.style.display = "block";
    } else {
        cartBox.style.display = "none";
    }
}
updateCart();