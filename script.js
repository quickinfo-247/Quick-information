let cart = [];

// ======================
// Show Products
// ======================

function showProducts(list){

const productList = document.getElementById("product-list");

productList.innerHTML = "";

list.forEach(product=>{

productList.innerHTML += `

<div class="product">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<div class="price">₹${product.price}</div>

<button class="cart"
onclick="addToCart('${product.name}',${product.price})">

🛒 Add to Cart

</button>

<button class="buy"
onclick="buyNow('${product.name}',${product.price})">

💬 Buy Now

</button>

</div>

`;

});

}

// ======================
// Filter
// ======================

function filterProducts(category){

if(category==="All"){

showProducts(products);

return;

}

const filtered = products.filter(

p=>p.category===category

);

showProducts(filtered);

}

// ======================
// Cart
// ======================

function addToCart(name,price){

const item = cart.find(p=>p.name===name);

if(item){

item.qty++;

}else{

cart.push({

name,

price,

qty:1

});

}

updateCart();

}

// ======================
// Update Cart
// ======================

function updateCart(){

const cartItems = document.getElementById("cart-items");

const cartCount = document.getElementById("cart-count");

const cartTotal = document.getElementById("cart-total");

cartItems.innerHTML="";

let total=0;

let count=0;

cart.forEach(item=>{

const sub=item.price*item.qty;

total+=sub;

count+=item.qty;

cartItems.innerHTML+=`

<p>

${item.name}

x${item.qty}

= ₹${sub}

</p>

`;

});

cartTotal.innerText=total;

cartCount.innerText=count;

}


// ======================
// WhatsApp Cart Order
// ======================

function sendWhatsAppOrder(){

if(cart.length===0){

alert("Cart is empty.");

return;

}

let msg="Hello, I want to order:%0A%0A";

let total=0;

cart.forEach(item=>{

msg+=`${item.name}

Qty:${item.qty}

₹${item.price*item.qty}

%0A`;

total+=item.price*item.qty;

});

msg+=`%0ATotal : ₹${total}`;

window.open(

"https://wa.me/918509727933?text="+msg,

"_blank"

);

}

// ======================

showProducts(products);