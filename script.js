// =========================================
// Quick Information Website V2
// script.js - Part 1
// =========================================

// Shopping Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =======================
// Search Products
// =======================

function searchProducts() {

    let input = document.getElementById("search").value.toLowerCase();

    let cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {

        let title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

// =======================
// Category Filter
// =======================

function filterCategory(category) {

    let cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {

        if (category === "all") {

            card.style.display = "block";

        }

        else if (card.dataset.category === category) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}

// =======================
// Add To Cart
// =======================

function addToCart(name, price, image) {

    let item = cart.find(product => product.name === name);

    if (item) {

        item.qty++;

    }

    else {

        cart.push({

            name: name,

            price: price,

            image: image,

            qty: 1

        });

    }

    updateCart();

}

// =======================
// Update Cart
// =======================

function updateCart() {

    document.getElementById("cart-count").textContent = cart.length;

    let list = document.getElementById("cart-items");

    list.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        list.innerHTML += `

<li>

<b>${item.name}</b><br>

₹${item.price} × ${item.qty}

<br>

₹${item.price * item.qty}

<br><br>

<button onclick="increaseQty(${index})">+</button>

<button onclick="decreaseQty(${index})">-</button>

<button onclick="removeItem(${index})">🗑️</button>

</li>

`;

    });

    document.getElementById("cart-total").textContent = total;

    localStorage.setItem("cart", JSON.stringify(cart));

}

// =========================================
// script.js - Part 2
// =========================================

// =======================
// Increase Quantity
// =======================

function increaseQty(index){

    cart[index].qty++;

    updateCart();

}

// =======================
// Decrease Quantity
// =======================

function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

}

// =======================
// Remove Item
// =======================

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

// =======================
// Toggle Cart
// =======================

function toggleCart(){

    let cartBox = document.getElementById("cart-box");

    if(

        cartBox.style.display=="none" ||

        cartBox.style.display==""

    ){

        cartBox.style.display="block";

    }else{

        cartBox.style.display="none";

    }

}

// =======================
// Product Popup
// =======================

function openPopup(name,price,image,description){

    document.getElementById("popup-image").src=image;

    document.getElementById("popup-title").textContent=name;

    document.getElementById("popup-price").textContent="₹"+price;

    document.getElementById("popup-description").textContent=description;

    document.getElementById("popup-cart").onclick=function(){

        addToCart(name,price,image);

        closePopup();

    };

    document.getElementById("popup-buy").onclick=function(){

        window.open(

        "https://wa.me/918509727933?text="+
        encodeURIComponent("I want to buy : "+name),

        "_blank"

        );

    };

    document.getElementById("product-popup").style.display="block";

}

// =======================
// Close Popup
// =======================

function closePopup(){

    document.getElementById("product-popup").style.display="none";

}

// =========================================
// script.js - Part 3
// =========================================

// =======================
// WhatsApp Order
// =======================

function sendWhatsAppOrder(){

    if(cart.length===0){

        alert("Your cart is empty!");

        return;

    }

    let message="Hello Quick Information,%0A%0A";
    message+="I want to order:%0A%0A";

    let total=0;

    cart.forEach(item=>{

        message+="• "+item.name+"%0A";
        message+="Qty : "+item.qty+"%0A";
        message+="Price : ₹"+(item.price*item.qty)+"%0A%0A";

        total += item.price*item.qty;

    });

    message+="--------------------%0A";
    message+="Total : ₹"+total;

    window.open(
        "https://wa.me/918509727933?text="+message,
        "_blank"
    );

}

// =======================
// Banner Slider
// =======================

let currentSlide = 0;

function startSlider(){

    const slides=document.querySelectorAll(".slide");

    if(slides.length===0) return;

    setInterval(function(){

        slides[currentSlide].classList.remove("active");

        currentSlide++;

        if(currentSlide>=slides.length){

            currentSlide=0;

        }

        slides[currentSlide].classList.add("active");

    },3000);

}

// =======================
// Close Popup Outside Click
// =======================

window.onclick=function(event){

    const popup=document.getElementById("product-popup");

    if(event.target===popup){

        closePopup();

    }

}

// =======================
// Initialize
// =======================

window.onload=function(){

    updateCart();

    startSlider();

}

console.log("Quick Information Website V2 Loaded Successfully");
