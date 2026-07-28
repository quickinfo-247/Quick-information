// ==============================
// Quick Information V3
//
// ==============================

import { products } from "./products.js";

// Shopping Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Wishlist

let wishlist = JSON.parse(
localStorage.getItem("wishlist")
) || [];

function toggleWishlist(name){

if(wishlist.includes(name)){

wishlist = wishlist.filter(
item => item !== name
);

}else{

wishlist.push(name);

}

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

loadProducts();

}

// ==============================
// Load Products
// ==============================

function loadProducts() {

    const container = document.getElementById("product-grid");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
<div class="badge">SALE</div>
<div class="product-card" data-category="${product.category}">

<div class="wishlist"

onclick="toggleWishlist('${product.name}')">

${wishlist.includes(product.name) ? "❤️" : "🤍"}

</div>

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p class="price">₹${product.price}</p>

<span class="stock">🟢 In Stock</span>

<div class="product-btns">

<button onclick="openPopup('${product.name}',${product.price},'${product.image}','${product.description}')">

View

</button>

<button onclick="addToCart('${product.name}',${product.price},'${product.image}')">

🛒 Add

</button>

</div>

</div>

`;

    });

}

// ===========================
// Featured Products
// ===========================

function loadFeaturedProducts(){

const container =
document.getElementById("featured-products");

if(!container) return;

container.innerHTML="";

products
.filter(product => product.featured)
.forEach(product=>{

container.innerHTML += `

<div class="product-card">

<div class="badge">⭐ Featured</div>

<img src="${product.image}">

<h3>${product.name}</h3>

<p>

<del>₹${product.oldPrice}</del>

</p>

<h2 style="color:#1565c0;">

₹${product.price}

</h2>

<p>

⭐ ${product.rating}/5

</p>

<p>

${product.stock}

</p>

<div class="product-btns">

<button onclick="openPopup(

'${product.name}',

${product.price},

'${product.image}',

'${product.description}'

)">

View

</button>

</div>

</div>

`;

});

}

// ==============================
// Search Product
// ==============================

function searchProducts(){

const input=document.getElementById("search").value.toLowerCase();

const cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

const title=card.querySelector("h3").textContent.toLowerCase();

if(title.includes(input)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

// ==============================
// Category Filter
// ==============================

function filterCategory(category){

const cards=document.querySelectorAll(".product-card");

cards.forEach(card=>{

if(category==="all"){

card.style.display="block";

}

else if(card.dataset.category===category){

card.style.display="block";

}

else{

card.style.display="none";

}

});

}

// ==============================
// Shopping Cart
// Part 2
// ==============================

function addToCart(name, price, image) {

    const item = cart.find(p => p.name === name);

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

// ==============================
// Update Cart
// ==============================

function updateCart() {

    document.getElementById("cart-count").textContent = cart.length;

    const list = document.getElementById("cart-items");

    list.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        list.innerHTML += `

<li>

<img src="${item.image}"

width="60"

style="vertical-align:middle;margin-right:10px;">

<b>${item.name}</b>

<br>

₹${item.price} × ${item.qty}

= ₹${item.price * item.qty}

<br><br>

<button onclick="increaseQty(${index})">➕</button>

<button onclick="decreaseQty(${index})">➖</button>

<button onclick="removeItem(${index})">🗑️</button>

</li>

`;

    });

    document.getElementById("cart-total").textContent = total;

    localStorage.setItem("cart", JSON.stringify(cart));

}

// ==============================
// Quantity +
// ==============================

function increaseQty(index){

    cart[index].qty++;

    updateCart();

}

// ==============================
// Quantity -
// ==============================

function decreaseQty(index){

    if(cart[index].qty>1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    updateCart();

}

// ==============================
// Remove Item
// ==============================

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}

// ==============================
// Product Popup
// ==============================

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
            "https://wa.me/918509727933?text=" +
            encodeURIComponent("I want to buy " + name),
            "_blank"
        );
    };

    document.getElementById("product-popup").style.display = "block";
}

function closePopup(){
    document.getElementById("product-popup").style.display = "none";
}

// ==============================
// Toggle Cart
// ==============================

function toggleCart(){

    const cartBox = document.getElementById("cart-box");

    if(cartBox.style.display==="block"){
        cartBox.style.display="none";
    }else{
        cartBox.style.display="block";
    }

}

// ==============================
// WhatsApp Order
// ==============================

function sendWhatsAppOrder(){

    if(cart.length===0){
        alert("Your cart is empty.");
        return;
    }

    let message = "Hello Quick Information,%0A%0A";
    message += "I want to order:%0A%0A";

    let total = 0;

    cart.forEach(item=>{

        message += `${item.name}%0A`;
        message += `Qty : ${item.qty}%0A`;
        message += `Price : ₹${item.price*item.qty}%0A%0A`;

        total += item.price * item.qty;

    });

    message += `Total : ₹${total}`;

    window.open(
        "https://wa.me/918509727933?text="+message,
        "_blank"
    );

}

// ==============================
// Banner Slider
// ==============================

let currentSlide = 0;

function startSlider(){

    const slides = document.querySelectorAll(".slide");

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

// ==============================
// Close Popup Outside Click
// ==============================

window.onclick = function(event){

    const popup = document.getElementById("product-popup");

    if(event.target===popup){
        closePopup();
    }

};

// ==============================
// Page Load
// ==============================

window.onload = function(){

    loadProducts();
    loadFeaturedProducts();
    updateCart();
    startSlider();

};

// ==============================
// Make Functions Available to HTML
// ==============================

window.searchProducts = searchProducts;
window.filterCategory = filterCategory;
window.addToCart = addToCart;
window.openPopup = openPopup;
window.closePopup = closePopup;
window.toggleCart = toggleCart;
window.sendWhatsAppOrder = sendWhatsAppOrder;
window.increaseQty = increaseQty;
window.decreaseQty = decreaseQty;
window.removeItem = removeItem;

console.log("Quick Information V3 Loaded Successfully");

// ===========================
// Back To Top Button
// ===========================

const topBtn = document.getElementById("topBtn");

window.onscroll = function(){

if(document.body.scrollTop > 300 ||

document.documentElement.scrollTop > 300){

topBtn.style.display = "block";

}else{

topBtn.style.display = "none";

}

}

function topFunction(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}