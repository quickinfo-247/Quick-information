// ===================================
// Quick Information
// Checkout System
// checkout.js - Part 1
// ===================================

// Load Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const DELIVERY_CHARGE = 30;

// ======================
// Load Order Summary
// ======================

function loadCheckout(){

    const items = document.getElementById("checkoutItems");

    let total = 0;

    items.innerHTML = "";

    cart.forEach(item=>{

        const subTotal = item.price * item.qty;

        total += subTotal;

        items.innerHTML += `

        <div>

            <span>${item.name} × ${item.qty}</span>

            <span>₹${subTotal}</span>

        </div>

        `;

    });

    document.getElementById("deliveryCharge").innerText =
        DELIVERY_CHARGE;

    document.getElementById("grandTotal").innerText =
        total + DELIVERY_CHARGE;

}

// ======================
// Place Order
// ======================

function placeOrder(){

    const name = document.getElementById("customerName").value.trim();

    const mobile = document.getElementById("customerMobile").value.trim();

    const whatsapp = document.getElementById("customerWhatsapp").value.trim();

    const address = document.getElementById("customerAddress").value.trim();

    const pin = document.getElementById("customerPin").value.trim();

    if(
        !name ||
        !mobile ||
        !address ||
        !pin
    ){

        alert("Please fill all required fields.");

        return;

    }

    let message =

`🛒 *New Order*

👤 Name: ${name}

📞 Mobile: ${mobile}

💬 WhatsApp: ${whatsapp}

📍 Address: ${address}

📮 PIN: ${pin}

----------------------

📦 Order Details

`;

    let total = 0;

    cart.forEach(item=>{

        const sub = item.price * item.qty;

        total += sub;

        message +=

`${item.name}

Qty: ${item.qty}

Price: ₹${sub}

----------------------

`;

    });

    total += DELIVERY_CHARGE;

    message +=

`🚚 Delivery: ₹${DELIVERY_CHARGE}

💰 Grand Total: ₹${total}`;

    window.open(

"https://wa.me/918509727933?text=" +

encodeURIComponent(message),

"_blank"

);

    localStorage.removeItem("cart");

    document.getElementById("orderSuccess").style.display = "block";

    document.querySelector(".checkout-container").style.display = "none";

}

// ======================
// Initialize
// ======================

document.getElementById("placeOrderBtn").onclick = placeOrder;

window.onload = function(){

    loadCheckout();

};