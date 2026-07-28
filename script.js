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
onclick="openImage('${product.image}')"
onerror="this.src='images/no-image.png'">

<h3>${product.name}</h3>

<button class="desc-btn" onclick="toggleDesc(${product.id})">
ℹ Description
</button>

<p id="desc-${product.id}" class="description" style="display:none;">
${product.description}
</p>

<p>
${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ""}
<span class="price">₹${product.price}</span>
</p>


<p class="${product.stock==="Available" ? "stock" : "out-stock"}">
${product.stock==="Available" ? "✓ Available" : "✕ Out of Stock"}
</p>

${product.stock === "Available"
? `<button onclick="addToCart(${product.id})">
Add to Cart
</button>`
: `<button class="disabled-btn" disabled>
Out of Stock
</button>`
}

</div>

`;
});

}


function addToCart(id){

let product = products.find(p=>p.id===id);

if(product.stock !== "Available"){
    alert("This product is currently out of stock.");
    return;
}

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
"https://wa.me/918509727933?text="+message
);

}





displayProducts(products);

updateCart();

document.getElementById("closeCart").onclick=function(){

document.getElementById("cartPopup").style.display="none";

}

function closeCart(){

document.getElementById("cartPopup").style.display="none";

}

function openImage(src){
    document.getElementById("popupImage").src = src;
    document.getElementById("imagePopup").style.display = "flex";
}

function closeImage(){
    document.getElementById("imagePopup").style.display = "none";
}

function toggleDesc(id){

const desc = document.getElementById("desc-" + id);

if(desc.style.display==="none"){
    desc.style.display="block";
}else{
    desc.style.display="none";
}

}