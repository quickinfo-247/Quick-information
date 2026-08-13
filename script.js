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

// ===============================
// GitHub Order Tracking
// ===============================

async function trackOrder(){

    const input =
        document.getElementById("orderIdInput");

    const result =
        document.getElementById("trackingResult");

    const orderId =
        input.value.trim().toUpperCase();

    if(orderId === ""){

        result.innerHTML = `
            <div class="tracking-error">
                ⚠️ Please enter your Order ID.
            </div>
        `;

        return;
    }

    result.innerHTML = `
        <div class="tracking-loading">
            🔄 Checking your order...
        </div>
    `;

    try{

        const response = await fetch(
            "orders.json?time=" + Date.now()
        );

        if(!response.ok){

            throw new Error("Orders file not found");

        }

        const orders = await response.json();

        const order = orders[orderId];

        if(!order){

            result.innerHTML = `
                <div class="tracking-error">

                    ❌ Order not found.

                    <br><br>

                    Please check your Order ID.

                </div>
            `;

            return;
        }

        showOrderStatus(orderId, order.status);

    }

    catch(error){

        console.error(error);

        result.innerHTML = `
            <div class="tracking-error">

                ⚠️ Unable to check order.

                <br>

                Please try again later.

            </div>
        `;

    }

}


// ===============================
// Show Order Status
// ===============================

function showOrderStatus(orderId, status){

    const result =
        document.getElementById("trackingResult");

    let icon = "📦";
    let statusClass = "status-received";

    if(status === "Order Received"){

        icon = "🟡";
        statusClass = "status-received";

    }

    else if(status === "Preparing"){

        icon = "🔵";
        statusClass = "status-preparing";

    }

    else if(status === "Out for Delivery"){

        icon = "🟠";
        statusClass = "status-delivery";

    }

    else if(status === "Delivered"){

        icon = "🟢";
        statusClass = "status-delivered";

    }

    result.innerHTML = `

        <div class="tracking-result">

            <h3>Order ID</h3>

            <p class="order-id">
                ${orderId}
            </p>

            <div class="order-status ${statusClass}">

                <span class="status-icon">
                    ${icon}
                </span>

                <span>
                    ${status}
                </span>

            </div>

        </div>

    `;

}

// ===============================
// Track Button Popup
// ===============================

const trackBtn = document.getElementById("trackBtn");

const trackPopup = document.getElementById("trackPopup");

const closeTrackPopup =
    document.getElementById("closeTrackPopup");


trackBtn.addEventListener("click", function(){

    trackPopup.style.display = "flex";

});


closeTrackPopup.addEventListener("click", function(){

    trackPopup.style.display = "none";

});


window.addEventListener("click", function(event){

    if(event.target === trackPopup){

        trackPopup.style.display = "none";

    }

});