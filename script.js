document.addEventListener("DOMContentLoaded", () => {

  // Search
  const search = document.getElementById("search");

  if (search) {
    search.addEventListener("keyup", function () {
      let value = this.value.toLowerCase();
      let cards = document.querySelectorAll(".product-card");

      cards.forEach(card => {
        let name = card.querySelector("h3").textContent.toLowerCase();

        if (name.includes(value)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

function searchProducts() {
    const input = document.getElementById("search");
    const filter = input.value.toLowerCase();

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(filter)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}
let cart = [];

function addToCart(name, price){

    cart.push({name,price});

    document.getElementById("cart-count").textContent = cart.length;

    const list=document.getElementById("cart-items");

    const li=document.createElement("li");

    li.textContent=name+" - ₹"+price;

    list.appendChild(li);

    let total=0;

    cart.forEach(item=>total+=item.price);

    document.getElementById("cart-total").textContent=total;

}
function sendWhatsAppOrder(){

let message="Hello, I want to order:%0A%0A";

cart.forEach(item=>{
message+=item.name+" - ₹"+item.price+"%0A";
});

let total=0;

cart.forEach(item=>total+=item.price);

message+="%0ATotal = ₹"+total;

window.open("https://wa.me/918509727933?text="+message,"_blank");

}