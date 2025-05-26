(function () {
    if (typeof Storage === "undefined") {
      console.error("Local storage is not supported in this browser.");
      return;
    }

    function addToWishlist() {
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
  
      const wishKey = `wish_${username}`;
      let wish = JSON.parse(localStorage.getItem(wishKey)) || [];
  
      const alreadyInWishlist = wish.some((g) => g.title === gameData.title);
      if (alreadyInWishlist) {
        alert("Spelet finns redan i kundvagnen.");
        return;
      }
  
      wish.push(gameData);
      localStorage.setItem(wishKey, JSON.stringify(wish));
      alert("Spelet har lagts till i kundvagnen.");
    }
  
    
    window.addEventListener("DOMContentLoaded", () => {
    });
  
    
    window.addToWishlist = addToWishlist;
  })();