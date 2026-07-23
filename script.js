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

  // WhatsApp Order
  const buttons = document.querySelectorAll(".product-card button");

  buttons.forEach(button => {
    button.addEventListener("click", function () {

      let product =
        this.parentElement.querySelector("h3").textContent;

      let price =
        this.parentElement.querySelector("p").textContent;

      let message =
        `Hello Quick Information,%0A%0AI want to order:%0A${product}%0APrice: ${price}`;

      window.open(
        `https://wa.me/918509727933?text=${message}`,
        "_blank"
      );

    });
  });

});