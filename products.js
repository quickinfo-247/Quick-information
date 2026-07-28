const products = [

{
    name:"9W Ultra LED Bulb",
    price:50,
    image:"images/bulb9w.jpg",

images:[
"images/bulb9w.jpg",
"images/bulb9w_2.jpg",
"images/bulb9w_3.jpg"
],
    category:"lights",
    description:"9W Energy Saving LED Bulb",

    featured:true,

    rating:5,

    stock:"In Stock",

    oldPrice:60
},

{
    name: "Philips AC/DC Bulb",
    price: 280,
    image: "images/philips.jpg",
    category: "lights",
    description: "Original Philips AC/DC LED Bulb"
},

{
    name: "Oreva AC/DC Bulb",
    price: 250,
    image: "images/oreva.jpg",
    category: "lights",
    description: "Rechargeable LED Bulb"
},

{
    name: "20W T5 Tube Light",
    price: 120,
    image: "images/t5tube.jpg",
    category: "lights",
    description: "20W LED Tube Light"
},

{
    name: "555 Motor",
    price: 110,
    image: "images/555motor.jpg",
    category: "electronics",
    description: "High Speed DC Motor"
},

{
    name: "12V 2A Adapter",
    price: 180,
    image: "images/adapter12v2a.jpg",
    category: "cctv",
    description: "12 Volt 2A Power Adapter"
},

{
    name: "12V 5A SMPS",
    price: 580,
    image: "images/smps12v5a.jpg",
    category: "cctv",
    description: "12 Volt 5A CCTV SMPS"
},

{
    name: "4 Channel DVR",
    price: 2950,
    image: "images/dvr4ch.jpg",
    category: "cctv",
    description: "4 Channel CCTV DVR"
},

{
    name: "19 Inch Monitor",
    price: 2450,
    image: "images/monitor19.jpg",
    category: "cctv",
    description: "LED Monitor"
},

{
    name: "3+1 CCTV Cable",
    price: 1280,
    image: "images/cable3plus1.jpg",
    category: "cctv",
    description: "Copper CCTV Cable"
}

];

export { products };

import { products } from "./products.js";

// =========================
// Get Product ID
// =========================

const params = new URLSearchParams(window.location.search);

const id = Number(params.get("id"));

const product = products[id];

let currentImage = 0;

// =========================
// Load Product
// =========================

function loadProduct(){

if(!product){

document.body.innerHTML="<h2>Product Not Found</h2>";

return;

}

document.getElementById("productName").innerText = product.name;

document.getElementById("oldPrice").innerHTML = "₹"+product.oldPrice;

document.getElementById("newPrice").innerHTML = "₹"+product.price;

document.getElementById("rating").innerHTML = "⭐ "+product.rating+"/5";

document.getElementById("stock").innerHTML = product.stock;

document.getElementById("description").innerHTML = product.description;

document.getElementById("mainImage").src = product.images[0];

loadGallery();

}

// =========================
// Thumbnail Gallery
// =========================

function loadGallery(){

const gallery = document.getElementById("gallery");

gallery.innerHTML = "";

product.images.forEach((img,index)=>{

gallery.innerHTML += `

<img src="${img}"

onclick="changeImage(${index})">

`;

});

}

window.changeImage = function(index){

currentImage = index;

document.getElementById("mainImage").src = product.images[index];

}

// =========================
// Add To Cart
// =========================

window.addToCart = function(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({

name:product.name,

price:product.price,

image:product.image,

qty:1

});

localStorage.setItem("cart",JSON.stringify(cart));

alert("✅ Product Added To Cart");

}

// =========================
// WhatsApp Buy
// =========================

window.buyNow = function(){

const msg =

`Hello, I want to order

${product.name}

Price : ₹${product.price}`;

window.open(

"https://wa.me/918509727933?text="+

encodeURIComponent(msg),

"_blank"

);

}

document.getElementById("addCartBtn").onclick = addToCart;

document.getElementById("buyBtn").onclick = buyNow;

// =========================
// Share Product
// =========================

window.shareProduct = function(){

const shareData = {

title: product.name,

text: product.description,

url: window.location.href

};

if(navigator.share){

navigator.share(shareData);

}else{

navigator.clipboard.writeText(window.location.href);

alert("Product Link Copied!");

}

}

// =========================
// Related Products
// =========================

function loadRelatedProducts(){

const container = document.getElementById("relatedProducts");

if(!container) return;

container.innerHTML = "";

products
.filter(p => p.category === product.category && p.name !== product.name)
.slice(0,4)
.forEach((p,index)=>{

const realIndex = products.findIndex(item => item.name === p.name);

container.innerHTML += `

<div class="product-card">

<img src="${p.image}" alt="${p.name}">

<h3>${p.name}</h3>

<p>₹${p.price}</p>

<a href="product.html?id=${realIndex}">

<button>View Details</button>

</a>

</div>

`;

});

}

// =========================
// Initialize
// =========================

window.onload = function(){

loadProduct();

loadRelatedProducts();

};