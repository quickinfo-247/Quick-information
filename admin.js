// ====================================
// Quick Information Admin Panel
// admin.js - Part 1
// ====================================

// Admin Password
let ADMIN_PASSWORD =
localStorage.getItem("adminPassword") || "12345";

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

// ===========================
// Page Navigation
// ===========================

function showPage(page){

// সব Section Hide

document.querySelector(".dashboard").style.display="none";

document.querySelector(".product-form").style.display="none";

document.querySelector(".product-list").style.display="none";

// ভবিষ্যতের Settings Section

const settings=document.getElementById("settings");

if(settings){

settings.style.display="none";

}

// কোন Page দেখাবে

if(page==="dashboard"){

document.querySelector(".dashboard").style.display="grid";

}

else if(page==="addproduct"){

document.querySelector(".product-form").style.display="block";

}

else if(page==="allproducts"){

document.querySelector(".product-list").style.display="block";

}

else if(page==="settings"){

if(settings){

settings.style.display="block";

}

}

}

// ===========================
// Image Preview
// ===========================

function previewImage(event){

const file = event.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

const preview = document.getElementById("preview");

preview.src = e.target.result;

preview.style.display = "block";

}

reader.readAsDataURL(file);

}

// ======================
// Search Product
// ======================

function searchAdminProduct(){

const text = document
.getElementById("searchProduct")
.value
.toLowerCase();

const rows = document.querySelectorAll("#productTable table tr");

rows.forEach((row,index)=>{

if(index===0) return;

const name=row.cells[0].innerText.toLowerCase();

if(name.includes(text)){

row.style.display="";

}else{

row.style.display="none";

}

});

}

// ======================
// Change Password
// ======================

function changePassword(){

const oldPass =
document.getElementById("oldPassword").value;

const newPass =
document.getElementById("newPassword").value;

if(oldPass !== ADMIN_PASSWORD){

alert("Current password is incorrect.");

return;

}

if(newPass.length < 4){

alert("Password must be at least 4 characters.");

return;

}

ADMIN_PASSWORD = newPass;

localStorage.setItem(
"adminPassword",
newPass
);

alert("Password changed successfully!");

document.getElementById("oldPassword").value = "";

document.getElementById("newPassword").value = "";

}