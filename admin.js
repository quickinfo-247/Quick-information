// ====================================
// Quick Information Admin Panel
// admin.js - Part 1
// ====================================

// Admin Password
const ADMIN_PASSWORD = "12345";

// Product List
let products = [];

// Edit Index
let editIndex = -1;

// ======================
// Login
// ======================

function login() {

    const password =
        document.getElementById("password").value;

    if (password === ADMIN_PASSWORD) {

        document.getElementById("loginBox").style.display = "none";

        document.getElementById("adminPanel").style.display = "block";

        loadProducts();

    } else {

        document.getElementById("loginError").textContent =
            "Wrong Password";

    }

}

// ======================
// Logout
// ======================

function logout() {

    location.reload();

}

// ======================
// Load Products
// ======================

function loadProducts() {

    const saved = localStorage.getItem("adminProducts");

    if (saved) {

        products = JSON.parse(saved);

    }

    updateDashboard();

    showProducts();

}

// ======================
// Save Product
// ======================

function saveProduct() {

    const product = {

        name: document.getElementById("pname").value,

        price: Number(document.getElementById("pprice").value),

        image: document.getElementById("pimage").value,

        category: document.getElementById("pcategory").value,

        description: document.getElementById("pdescription").value

    };

    if (

        product.name === "" ||

        product.price <= 0

    ) {

        alert("Please enter Product Name and Price.");

        return;

    }

    if (editIndex === -1) {

        products.push(product);

    } else {

        products[editIndex] = product;

        editIndex = -1;

    }

    localStorage.setItem(

        "adminProducts",

        JSON.stringify(products)

    );

    clearForm();

    updateDashboard();

    showProducts();

}

// ======================
// Dashboard
// ======================

function updateDashboard() {

    document.getElementById("totalProducts").textContent = products.length;

}

// ======================
// Show Products
// ======================

function showProducts() {

    let html = `

    <table>

    <tr>

    <th>Name</th>

    <th>Price</th>

    <th>Category</th>

    <th>Action</th>

    </tr>

    `;

    products.forEach((product,index)=>{

        html += `

        <tr>

        <td>${product.name}</td>

        <td>₹${product.price}</td>

        <td>${product.category}</td>

        <td>

        <button class="edit-btn"

        onclick="editProduct(${index})">

        Edit

        </button>

        <button class="delete-btn"

        onclick="deleteProduct(${index})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

    html += "</table>";

    document.getElementById("productTable").innerHTML = html;

}

// ======================
// Edit Product
// ======================

function editProduct(index){

    editIndex = index;

    const p = products[index];

    document.getElementById("pname").value = p.name;

    document.getElementById("pprice").value = p.price;

    document.getElementById("pimage").value = p.image;

    document.getElementById("pcategory").value = p.category;

    document.getElementById("pdescription").value = p.description;

}

// ======================
// Delete Product
// ======================

function deleteProduct(index){

    if(confirm("Delete this product?")){

        products.splice(index,1);

        localStorage.setItem(

        "adminProducts",

        JSON.stringify(products)

        );

        updateDashboard();

        showProducts();

    }

}

// ======================
// Clear Form
// ======================

function clearForm(){

    document.getElementById("pname").value="";

    document.getElementById("pprice").value="";

    document.getElementById("pimage").value="";

    document.getElementById("pcategory").value="lights";

    document.getElementById("pdescription").value="";

}

// ======================
// Export Products.js
// ======================

function exportProducts(){

    let content = "const products = ";

    content += JSON.stringify(products, null, 4);

    content += ";\n\nexport { products };";

    const blob = new Blob([content], {
        type: "text/javascript"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "products.js";

    link.click();

}

// ======================
// Initialize
// ======================

window.onload = function(){

    const saved = localStorage.getItem("adminProducts");

    if(saved){

        products = JSON.parse(saved);

    }

}