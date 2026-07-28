let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productContainer = document.getElementById("productContainer");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


function displayProducts(list){

productContainer.innerHTML="";

list.forEach(product=>{

productContainer.innerHTML += `

<div class="product-card">

<img src="${product.image}" 
onerror="this.src='images/no-image.png'">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="addToCart(${product.id})">
Add to Cart
</button>

<button onclick="buyNow('${product.name}',${product.price})">
Buy Now
</button>

</div>

`;

});

}


function addToCart(id){

let product = products.find(p=>p.id===id);

let item = cart.find(p=>p.id===id);


if(item){

item.qty++;

}else{

cart.push({
...product,
qty:1
});

}

saveCart();

}



function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();

}



function updateCart(){

cartCount.innerText = cart.reduce((a,b)=>a+b.qty,0);

cartItems.innerHTML="";

let total=0;


cart.forEach(item=>{

total += item.price * item.qty;


cartItems.innerHTML +=`

<div class="cart-item">

<img src="${item.image}">

<div>
${item.name}<br>
₹${item.price} × ${item.qty}

<br>

<button onclick="changeQty(${item.id},-1)">-</button>

<button onclick="changeQty(${item.id},1)">+</button>

<button onclick="removeItem(${item.id})">
Delete
</button>

</div>

</div>

`;

});


cartTotal.innerText=total;

}



function changeQty(id,value){

let item=cart.find(p=>p.id===id);

item.qty += value;


if(item.qty<=0){

removeItem(id);

}

else{

saveCart();

}

}



function removeItem(id){

cart = cart.filter(p=>p.id!==id);

saveCart();

}



document.getElementById("cartBtn").onclick=function(){

let box=document.getElementById("cartPopup");

box.style.display =
box.style.display==="block" ? "none":"block";

}



document.getElementById("searchBox").onkeyup=function(){

let value=this.value.toLowerCase();

let result=products.filter(p=>
p.name.toLowerCase().includes(value)
);

displayProducts(result);

}



document.querySelectorAll(".category-area button")
.forEach(btn=>{

btn.onclick=function(){

let cat=this.dataset.category;


if(cat==="All"){

displayProducts(products);

}

else{

displayProducts(
products.filter(p=>p.category===cat)
);

}

}

});



document.getElementById("whatsappOrder")
.onclick=function(){

let message="New Order%0A%0A";

cart.forEach(item=>{

message += 
`${item.name} Qty:${item.qty} Price:${item.price}%0A`;

});


message += `%0ATotal ₹${cartTotal.innerText}`;


window.open(
"https://wa.me/919163215683?text="+message
);

}



function buyNow(name,price){

let msg =
`Order:%0A${name}%0APrice ₹${price}`;

window.open(
"https://wa.me/919163215683?text="+msg
);

}



displayProducts(products);

updateCart();