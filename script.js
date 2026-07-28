// ===============================
// Quick Information
// script.js (Part 1)
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let currentCategory = "All";

// ----------------------------
// Show Products
// ----------------------------

function showProducts(productList){

const container = document.getElementById("productContainer");

container.innerHTML="";

productList.forEach(product=>{

container.innerHTML+=`

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

${
product.oldPrice ?

`<div class="old-price">₹${product.oldPrice}</div>`

:

""

}

<div class="price">₹${product.price}</div>

<button class="add-cart"

onclick="addToCart(${product.id})">

🛒 Add To Cart

</button>

</div>

`;

});

}

// ----------------------------
// Filter Category
// ----------------------------

function filterProducts(category){

currentCategory = category;

if(category==="All"){

showProducts(products);

return;

}

const filtered = products.filter(

item=>item.category===category

);

showProducts(filtered);

}

// ----------------------------
// Search Product
// ----------------------------

function searchProducts(){

const keyword = document

.getElementById("searchBox")

.value

.toLowerCase();

const filtered = products.filter(item=>{

const matchName = item.name

.toLowerCase()

.includes(keyword);

const matchCategory =

currentCategory==="All"

||

item.category===currentCategory;

return matchName && matchCategory;

});

showProducts(filtered);

}

// ----------------------------
// Category Button Event
// ----------------------------

document

.querySelectorAll(".category-area button")

.forEach(btn=>{

btn.addEventListener("click",()=>{

filterProducts(

btn.dataset.category

);

});

});

// ----------------------------
// Search Event
// ----------------------------

document

.getElementById("searchBox")

.addEventListener(

"keyup",

searchProducts

);

// ----------------------------
// Load Products
// ----------------------------

showProducts(products);

// ===============================
// Cart System (Part 2)
// ===============================

// Add To Cart
function addToCart(id){

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.qty++;

    }else{

        cart.push({
            ...product,
            qty:1
        });

    }

    updateCart();

}

// Update Cart
function updateCart(){
localStorage.setItem("cart", JSON.stringify(cart));
    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML="";

    let total=0;
    let count=0;

    cart.forEach(item=>{

        total += item.price * item.qty;

        count += item.qty;

        cartItems.innerHTML += `

        <div class="cart-item">

            <b>${item.name}</b><br>

            ₹${item.price} × ${item.qty}

            <br>

            <button onclick="removeCart(${item.id})">

            ❌ Remove

            </button>

            <hr>

        </div>

        `;

    });

    cartTotal.innerText = total;

    cartCount.innerText = count;

}

// Remove Cart Item
function removeCart(id){

    cart = cart.filter(item=>item.id!==id);

    updateCart();

}

// Popup Cart
function toggleCart(){

    const popup=document.getElementById("cartPopup");

    if(popup.style.display==="block"){

        popup.style.display="none";

    }else{

        popup.style.display="block";

    }

}

// Cart Button Click
document

.getElementById("cartBtn")

.addEventListener(

"click",

toggleCart

);

// ===============================
// Buy Now (WhatsApp)
// ===============================

function buyNow(id){

    const product = products.find(p => p.id === id);

    const message =
`Hello,

I want to buy

${product.name}

Price : ₹${product.price}`;

    window.open(
        "https://wa.me/918509727933?text=" +
        encodeURIComponent(message),
        "_blank"
    );

}

// ===============================
// Call Now
// ===============================

function callNow(phone){

    window.location.href = "tel:" + phone;

}

// ===============================
// WhatsApp Cart Order
// ===============================

document
.getElementById("whatsappOrder")
.addEventListener("click",()=>{

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    let message = "Hello, I want to order:\n\n";

    let total = 0;

    cart.forEach(item=>{

        message +=
`${item.name}
Qty : ${item.qty}
Price : ₹${item.price * item.qty}

`;

        total += item.price * item.qty;

    });

    message += "Total : ₹" + total;

    window.open(
        "https://wa.me/918509727933?text=" +
        encodeURIComponent(message),
        "_blank"
    );

});

// ===============================
// Start Website
// ===============================

showProducts(products);

updateCart();