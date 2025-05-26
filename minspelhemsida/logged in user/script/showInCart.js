  function renderCart() {
    const username = localStorage.getItem("username");
    if (!username) return;

    const cartKey = `cart_${username}`;
    const libraryKey = 'library_${username}`;';
    const library = JSON.parse(localStorage.getItem(libraryKey)) || [];
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const list = document.getElementById("cart-list");
    const total = document.getElementById("total-price");

    list.innerHTML = "";

    let totalPrice = 0;

    cart.forEach((game) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.alignItems = "center";
      li.style.marginBottom = "15px";
      li.innerHTML = `
        <img src="${game.image}" alt="${game.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
        <div style="flex: 1;">
          <div><strong>${game.title}</strong></div>
          <div style="color: #94a3b8;">${game.price.toFixed(2)} kr</div>
        </div>
      `;
      totalPrice += game.price;
      list.appendChild(li);
    });

    total.textContent = "Totalt: " + totalPrice.toFixed(2) + " kr";
  }

  function checkout() {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Du måste vara inloggad.");
      return;
    }
  
    const cartKey = `cart_${username}`;
    const libraryKey = `library_${username}`;
  
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    if (cart.length === 0) {
      alert("Din kundvagn är tom.");
      return;
    }

    const wishKey = `wish_${username}`;
let wish = JSON.parse(localStorage.getItem(wishKey)) || [];

cart.forEach((game) => {
  const isInWishlist = wish.some((g) => g.title === game.title);
  if (isInWishlist) {
    wish = wish.filter((g) => g.title !== game.title);
  }
});

localStorage.setItem(wishKey, JSON.stringify(wish));
  
    // Hämta befintliga spel i biblioteket (om några)
    const library = JSON.parse(localStorage.getItem(libraryKey)) || [];
  
    // Lägg till endast spel som inte redan finns i biblioteket
    cart.forEach((game) => {
      const alreadyInLibrary = library.some((g) => g.title === game.title);
      if (!alreadyInLibrary) {
        library.push(game);
        
      }});
  
    // Spara tillbaka till biblioteket
    localStorage.setItem(libraryKey, JSON.stringify(library));
  
    // Töm kundvagnen
    localStorage.removeItem(cartKey);
  
    alert("Spelen har lagts till i ditt bibliotek!");
    renderCart();
    updateCartBadge?.();
  }
  

  function addToLibrary() {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Du måste vara inloggad för att lägga till i kundvagnen.");
      return;
    }

    const priceElement = document.getElementById("game-price");
    const titleElement = document.getElementById("game-title");
    const imageElement = document.getElementById("game-image");

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

  document.addEventListener("DOMContentLoaded", renderCart);