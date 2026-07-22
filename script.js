document.addEventListener("DOMContentLoaded", function () {
    console.log("Quick Information Website Loaded");

    const orderButton = document.querySelector("button");

    if (orderButton) {
        orderButton.addEventListener("click", function () {
            alert("Welcome to Quick Information!\nOnline Order System Coming Soon.");
        });
    }
});
