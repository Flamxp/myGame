(function () {
  if (typeof Storage === "undefined") {
    console.error("Local storage is not supported in this browser.");
    return;
  }

  function updateCartBadge() {
    const username = localStorage.getItem("username");
    if (!username) {
      console.warn("No username found in localStorage.");
      return;
    }

    const cartKey = `cart_${username}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const badge = document.getElementById("cart-badge");
    if (!badge) {
      console.error("Cart badge element not found.");
      return;
    }

    if (cart.length > 0) {
      badge.classList.remove("hidden");
      badge.innerText = cart.length;
    } else {
      badge.classList.add("hidden");
    }
  }

  function addToCart() {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Du måste vara inloggad för att lägga till i kundvagnen.");
      return;
    }

    const priceElement = document.getElementById("game-price");
    const titleElement = document.getElementById("game-title");
    const imageElement = document.getElementById("game-image");

    const libraryKey = `library_${username}`;
    const library = JSON.parse(localStorage.getItem(libraryKey)) || [];
    const isInLibrary = library.some((g) => g.title === titleElement.innerText);



    if (isInLibrary) {
    alert("Spelet finns redan i biblioteket.");
    console.error("Spelet finns redan i biblioteket.");
    return;
}


    if (!priceElement || !titleElement || !imageElement) {
      console.error("One or more required elements (price, title, image) are missing.");
      return;
    }

    const priceText = priceElement.innerText;
    const numericPrice = parseFloat(priceText.replace("$", ""));

    const gameData = {
      title: titleElement.innerText,
      image: imageElement.getAttribute("src"),
      price: numericPrice,
      url: window.location.pathname,
    };

    const cartKey = `cart_${username}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const alreadyInCart = cart.some((g) => g.title === gameData.title);
    if (alreadyInCart) {
      alert("Spelet finns redan i kundvagnen.");
      return;
    }

    cart.push(gameData);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert("Spelet har lagts till i kundvagnen.");
    updateCartBadge();
  }

  
  window.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
  });

  
  window.addToCart = addToCart;
  window.updateCartBadge = updateCartBadge;
})();