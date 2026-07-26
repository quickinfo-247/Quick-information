// ===============================
// Quick Information - script.js
// ===============================

// Load cart from browser

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// -------------------------------
// Search Products
// -------------------------------
function searchProducts() {
    const input = document.getElementById("search");
    const filter = input.value.toLowerCase();

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
// -------------------------------
// Category Filter
// -------------------------------
function filterCategory(category) {
console.log(category);
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {

        if (category === "all") {
            card.style.display = "";
        } else if (card.dataset.category === category) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

}

// -------------------------------
// Add to Cart
// -------------------------------
function addToCart(name, price, image) {

    const item = cart.find(product => product.name === name);

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

// -------------------------------
// Update Cart
// -------------------------------
function updateCart() {

    document.getElementById("cart-count").textContent = cart.length;

    const list = document.getElementById("cart-items");
    list.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        const li = document.createElement("li");

        li.innerHTML = `
            <img src="${item.image}"
                 width="60"
                 height="60"
                 style="border-radius:8px;object-fit:contain;vertical-align:middle;margin-right:10px;">

            <b>${item.name}</b><br>

            ₹${item.price} × ${item.qty}
            = ₹${item.price * item.qty}

            <br><br>

            <button onclick="increaseQty(${index})">➕</button>

            <button onclick="decreaseQty(${index})">➖</button>

            <button onclick="removeItem(${index})">🗑️</button>

            <hr>
        `;

        list.appendChild(li);

    });

    document.getElementById("cart-total").textContent = total;

    localStorage.setItem("cart", JSON.stringify(cart));
}

// -------------------------------
// Increase Quantity
// -------------------------------
function increaseQty(index) {

    cart[index].qty++;

    updateCart();
}

// -------------------------------
// Decrease Quantity
// -------------------------------
function decreaseQty(index) {

    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

// -------------------------------
// Remove Item
// -------------------------------
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}

// -------------------------------
// WhatsApp Order
// -------------------------------
function sendWhatsAppOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello Quick Information,%0A%0AI want to order:%0A%0A";

    let total = 0;

    cart.forEach(item => {

        message += `${item.name}%0A`;
        message += `Qty : ${item.qty}%0A`;
        message += `Price : ₹${item.price * item.qty}%0A%0A`;

        total += item.price * item.qty;

    });

    message += `Total Amount : ₹${total}`;

    window.open(
        "https://wa.me/918509727933?text=" + message,
        "_blank"
    );
}

// -------------------------------
// Open / Close Cart
// -------------------------------
function toggleCart() {

    const cartBox = document.getElementById("cart-box");

    if (
        cartBox.style.display === "none" ||
        cartBox.style.display === ""
    ) {
        cartBox.style.display = "block";
    } else {
        cartBox.style.display = "none";
    }
}

// -------------------------------
// Load Cart on Page Load
// -------------------------------
updateCart();
// -------------------------------
// Product Popup
// -------------------------------

function openPopup(name, price, image, description){

    document.getElementById("popup-image").src = image;
    document.getElementById("popup-title").textContent = name;
    document.getElementById("popup-price").textContent = "₹" + price;
    document.getElementById("popup-description").textContent = description;

    document.getElementById("popup-cart").onclick = function(){
        addToCart(name, price, image);
        closePopup();
    };

    document.getElementById("popup-buy").onclick = function(){
        window.open(
            "https://wa.me/918509727933?text=I want to buy " + encodeURIComponent(name),
            "_blank"
        );
    };

    document.getElementById("product-popup").style.display = "block";
}

function closePopup(){
    document.getElementById("product-popup").style.display = "none";
}
// =======================
// Auto Banner Slider
// =======================

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

if(slides.length > 0){

setInterval(()=>{

slides[currentSlide].classList.remove("active");

currentSlide++;

if(currentSlide >= slides.length){
currentSlide = 0;
}

slides[currentSlide].classList.add("active");

},3000);

}
// ===== Auto Banner Slider =====

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

setInterval(()=>{

    currentSlide++;

    if(currentSlide>=slides.length){
        currentSlide=0;
    }

    showSlide(currentSlide);

},3000);
// ===== Banner Slider =====

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

if (slides.length > 0) {

    setInterval(function () {

        slides[currentSlide].classList.remove("active");

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        slides[currentSlide].classList.add("active");

    }, 3000);

}