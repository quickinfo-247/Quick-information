// ==========================================
// QUICK INFORMATION - MAIN SCRIPT
// ==========================================


// ==========================================
// CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productContainer =
    document.getElementById("productContainer");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(list){

    if(!productContainer) return;

    productContainer.innerHTML = "";

    list.forEach(product => {

        const stockAvailable =
            product.stock === "Available" ||
            product.stock === true ||
            product.stock === undefined;

        productContainer.innerHTML += `

        <div class="product-card">

            <img
                src="${product.image}"
                alt="${product.name}"
                onclick="openImage('${product.image}')"
                onerror="this.src='images/no-image.png'"
            >

            <h3>${product.name}</h3>

            <button
                class="desc-btn"
                onclick="toggleDesc(${product.id})">
                ℹ Description
            </button>

            <p
                id="desc-${product.id}"
                class="description"
                style="display:none;">
                ${product.description || "No description available."}
            </p>

            <p>

                ${
                    product.oldPrice
                    ?
                    `<span class="old-price">
                        ₹${product.oldPrice}
                    </span>`
                    :
                    ""
                }

                <span class="price">
                    ₹${product.price}
                </span>

            </p>


            ${
                stockAvailable
                ?

                `<p class="stock">
                    ✓ Available
                </p>

                <button
                    onclick="addToCart(${product.id})">
                    🛒 Add to Cart
                </button>`

                :

                `<p class="out-stock">
                    ✕ Out of Stock
                </p>

                <button
                    class="disabled-btn"
                    disabled>
                    Out of Stock
                </button>`
            }

        </div>

        `;

    });

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id){

    const product =
        products.find(p => p.id === id);

    if(!product) return;


    const stockAvailable =
        product.stock === "Available" ||
        product.stock === true ||
        product.stock === undefined;


    if(!stockAvailable){

        alert("This product is currently out of stock.");

        return;

    }


    const existing =
        cart.find(item => item.id === id);


    if(existing){

        existing.qty++;

    }

    else{

        cart.push({

            ...product,

            qty: 1

        });

    }


    saveCart();

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart(){

    if(!cartCount || !cartItems || !cartTotal){
        return;
    }


    let count = 0;

    let total = 0;


    cartItems.innerHTML = "";


    cart.forEach(item => {

        count += item.qty;

        total +=
            item.price * item.qty;


        cartItems.innerHTML += `

        <div class="cart-item">

            <div class="cart-top">

                <img
                    src="${item.image}"
                    class="cart-image"
                    onerror="this.src='images/no-image.png'"
                >

                <div class="cart-info">

                    <b>
                        ${item.name}
                    </b>

                    <p>
                        ₹${item.price}
                    </p>

                </div>

            </div>


            <div class="qty-box">

                <button
                    onclick="changeQty(${item.id},-1)">
                    −
                </button>

                <span>
                    ${item.qty}
                </span>

                <button
                    onclick="changeQty(${item.id},1)">
                    +
                </button>

            </div>


            <p>
                <b>
                    Subtotal :
                    ₹${item.price * item.qty}
                </b>
            </p>


            <button
                onclick="removeItem(${item.id})">
                🗑 Delete
            </button>

            <hr>

        </div>

        `;

    });


    cartCount.innerText = count;

    cartTotal.innerText = total;

}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQty(id,value){

    const item =
        cart.find(p => p.id === id);


    if(!item) return;


    item.qty += value;


    if(item.qty <= 0){

        removeItem(id);

        return;

    }


    saveCart();

}


// ==========================================
// REMOVE CART ITEM
// ==========================================

function removeItem(id){

    cart =
        cart.filter(p => p.id !== id);

    saveCart();

}


// ==========================================
// CART BUTTON
// ==========================================

const cartBtn =
    document.getElementById("cartBtn");


if(cartBtn){

    cartBtn.addEventListener(
        "click",
        function(){

            const box =
                document.getElementById("cartPopup");


            if(!box) return;


            if(box.style.display === "block"){

                box.style.display = "none";

            }

            else{

                box.style.display = "block";

            }

        }
    );

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCart(){

    const box =
        document.getElementById("cartPopup");


    if(box){

        box.style.display = "none";

    }

}


// ==========================================
// SEARCH
// ==========================================

const searchBox =
    document.getElementById("searchBox");


if(searchBox){

    searchBox.addEventListener(
        "keyup",
        function(){

            const value =
                this.value
                .toLowerCase()
                .trim();


            const result =
                products.filter(product => {

                    return product.name
                        .toLowerCase()
                        .includes(value);

                });


            displayProducts(result);

        }
    );

}


// ==========================================
// CATEGORY
// ==========================================

document
.querySelectorAll(".category-area button")
.forEach(button => {

    button.addEventListener(
        "click",
        function(){

            const category =
                this.dataset.category;


            if(category === "All"){

                displayProducts(products);

            }

            else{

                displayProducts(

                    products.filter(
                        product =>
                        product.category === category
                    )

                );

            }

        }
    );

});


// ==========================================
// WHATSAPP CART ORDER
// ==========================================

const whatsappOrder =
    document.getElementById("whatsappOrder");


if(whatsappOrder){

    whatsappOrder.addEventListener(
        "click",
        function(){

            if(cart.length === 0){

                alert("Your cart is empty.");

                return;

            }


            let message =
                "Hello, I want to order:\n\n";


            let total = 0;


            cart.forEach(item => {

                const subtotal =
                    item.price * item.qty;


                message +=
`${item.name}
Qty : ${item.qty}
Price : ₹${subtotal}

`;


                total += subtotal;

            });


            message +=
                `Total : ₹${total}`;


            window.open(

                "https://wa.me/918509727933?text=" +
                encodeURIComponent(message),

                "_blank"

            );

        }
    );

}


// ==========================================
// IMAGE POPUP
// ==========================================

function openImage(src){

    const image =
        document.getElementById("popupImage");

    const popup =
        document.getElementById("imagePopup");


    if(image){

        image.src = src;

    }


    if(popup){

        popup.style.display = "flex";

    }

}


function closeImage(){

    const popup =
        document.getElementById("imagePopup");


    if(popup){

        popup.style.display = "none";

    }

}


// ==========================================
// DESCRIPTION
// ==========================================

function toggleDesc(id){

    const desc =
        document.getElementById(
            "desc-" + id
        );


    if(!desc) return;


    if(desc.style.display === "none"){

        desc.style.display = "block";

    }

    else{

        desc.style.display = "none";

    }

}


// ==========================================
// GITHUB ORDER TRACKING
// ==========================================

async function trackOrder(){

    const input =
        document.getElementById("orderIdInput");

    const result =
        document.getElementById("trackingResult");


    if(!input || !result){

        alert(
            "Tracking system is not connected correctly."
        );

        return;

    }


    const orderId =
        input.value
        .trim()
        .toUpperCase();


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

        const response =
            await fetch(
                "orders.json?time=" +
                Date.now()
            );


        if(!response.ok){

            throw new Error(
                "orders.json not found"
            );

        }


        const orders =
            await response.json();


        const order =
            orders[orderId];


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


        showOrderStatus(

            orderId,

            order.status

        );

    }


    catch(error){

        console.error(
            "Tracking Error:",
            error
        );


        result.innerHTML = `

            <div class="tracking-error">

                ⚠️ Unable to check order.

                <br><br>

                Please check your internet
                connection and try again.

            </div>

        `;

    }

}


// ==========================================
// SHOW ORDER STATUS
// ==========================================

function showOrderStatus(
    orderId,
    status
){

    const result =
        document.getElementById(
            "trackingResult"
        );


    if(!result) return;


    let icon = "📦";

    let statusClass =
        "status-received";


    if(status === "Order Received"){

        icon = "🟡";

        statusClass =
            "status-received";

    }


    else if(status === "Preparing"){

        icon = "🔵";

        statusClass =
            "status-preparing";

    }


    else if(status === "Out for Delivery"){

        icon = "🟠";

        statusClass =
            "status-delivery";

    }


    else if(status === "Delivered"){

        icon = "🟢";

        statusClass =
            "status-delivered";

    }


    result.innerHTML = `

        <div class="tracking-result">

            <h3>
                Order ID
            </h3>

            <p class="order-id">
                ${orderId}
            </p>

            <div
                class="order-status ${statusClass}">

                ${icon}
                ${status}

            </div>

        </div>

    `;

}


// ==========================================
// TRACK POPUP
// ==========================================

function openTrackPopup(){

    const popup =
        document.getElementById(
            "trackPopup"
        );


    if(popup){

        popup.style.display = "flex";

    }

}


function closeTrackPopup(){

    const popup =
        document.getElementById(
            "trackPopup"
        );


    if(popup){

        popup.style.display = "none";

    }

}


// ==========================================
// TRACK BUTTON
// ==========================================

document.addEventListener(
    "click",
    function(event){

        const button =
            event.target.closest(
                "#trackBtn"
            );


        if(button){

            openTrackPopup();

        }

    }
);


// ==========================================
// CLOSE TRACK POPUP
// ==========================================

document.addEventListener(
    "click",
    function(event){

        const popup =
            document.getElementById(
                "trackPopup"
            );


        if(
            popup &&
            event.target === popup
        ){

            closeTrackPopup();

        }

    }
);


// ==========================================
// START WEBSITE
// ==========================================

displayProducts(products);

updateCart();