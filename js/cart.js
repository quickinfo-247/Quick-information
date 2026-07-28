// ===================================
// Quick Information
// Shopping Cart
// cart.js - Part 1
// ===================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const DELIVERY_CHARGE = 30;

// ======================
// Load Cart
// ======================

function loadCart(){

const container = document.getElementById("cartList");

container.innerHTML = "";

let subtotal = 0;

cart.forEach((item,index)=>{

const total = item.price * item.qty;

subtotal += total;

container.innerHTML += `

<div class="cart-item">

<img src="${item.image}" alt="${item.name}">

<div class="item-info">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<div class="qty-box">

<button onclick="decreaseQty(${index})">-</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<button class="delete-btn"

onclick="removeItem(${index})">

🗑 Delete

</button>

</div>

<div>

<b>₹${total}</b>

</div>

</div>

`;

});

document.getElementById("subTotal").innerText = subtotal;

document.getElementById("grandTotal").innerText =
subtotal + DELIVERY_CHARGE;

}

// ======================
// Increase Quantity
// ======================

window.increaseQty = function(index){

    cart[index].qty++;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

// ======================
// Decrease Quantity
// ======================

window.decreaseQty = function(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

// ======================
// Remove Item
// ======================

window.removeItem = function(index){

    if(confirm("Remove this product from cart?")){

        cart.splice(index,1);

        localStorage.setItem("cart", JSON.stringify(cart));

        loadCart();

    }

}

// ======================
// Initialize
// ======================

window.onload = function(){

    loadCart();

}