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

const container=document.getElementById("productContainer");

container.innerHTML="";

productList.forEach(product=>{

container.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

${product.oldPrice ? `<div class="old-price">₹${product.oldPrice}</div>` : ""}

<div class="price">₹${product.price}</div>

<div class="stock ${product.stock ? "in-stock" : "out-stock"}">
${product.stock ? "🟢 In Stock" : "🔴 Out of Stock"}
</div>

<button class="add-cart"
onclick="addToCart(${product.id})"
${product.stock === false ? "disabled" : ""}>

🛒 Add To Cart

</button>

<button class="view-btn"
onclick="viewDetails(${product.id})">

ℹ️ Details

</button>

</div>

`;

});

}

// ===============================
// Product Details Popup
// ===============================

let currentProductId = null;

// Open Popup
function viewDetails(id){

    const product = products.find(p => p.id === id);

    currentProductId = id;

    document.getElementById("popupImage").src = product.image;

    document.getElementById("popupName").innerText = product.name;

    document.getElementById("popupPrice").innerText = product.price;

    document.getElementById("popupDescription").innerText =
    product.description || "No description available.";

    document.getElementById("productPopup").style.display = "block";

}

// Close Popup
function closeProductPopup(){

    document.getElementById("productPopup").style.display = "none";

}

// Add To Cart From Popup
function popupAddToCart(){

    addToCart(currentProductId);

    closeProductPopup();

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
${product.stock
? `<div class="stock in-stock">🟢 In Stock</div>`
: `<div class="stock out-stock">🔴 Out of Stock</div>`
}

// ===============================
// Cart System
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

<div class="cart-top">

<img src="${item.image}" class="cart-image">

<div class="cart-info">

<b>${item.name}</b>

<p>₹${item.price}</p>

</div>

</div>

<div class="qty-box">

<button onclick="decreaseQty(${item.id})">➖</button>

<span>${item.qty}</span>

<button onclick="increaseQty(${item.id})">➕</button>

</div>

<p><b>Subtotal : ₹${item.price * item.qty}</b></p>

<button onclick="removeCart(${item.id})">

🗑 Remove

</button>

<hr>

</div>

`;

    });

    cartTotal.innerText = total;

    cartCount.innerText = count;
 
    document.getElementById("totalItems").innerText = count;

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

function increaseQty(id){

    const item = cart.find(p=>p.id===id);

    if(item){

        item.qty++;

        updateCart();

    }

}

function decreaseQty(id){

    const item = cart.find(p=>p.id===id);

    if(!item) return;

    if(item.qty>1){

        item.qty--;

    }else{

        cart = cart.filter(p=>p.id!==id);

    }

    updateCart();

}

// Cart Button Click
document

.getElementById("cartBtn")

.addEventListener(

"click",

toggleCart

);


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

`🛒 ${item.name}

Qty : ${item.qty}

Subtotal : ₹${item.price * item.qty}

------------------------

`;

        total += item.price * item.qty;

    });

    message +=

`Total Items : ${count}

Grand Total : ₹${total}

Thank You.`;

    window.open(
        "https://wa.me/918509727933?text=" +
        encodeURIComponent(message),
        "_blank"
    );

});

window.addEventListener("click",function(e){

const popup=document.getElementById("productPopup");

if(e.target===popup){

popup.style.display="none";

}

});

// ===============================
// Start Website
// ===============================

showProducts(products);

updateCart();

window.onclick=function(e){

const popup=document.getElementById("cartPopup");

if(e.target===popup){

popup.style.display="none";

}

}