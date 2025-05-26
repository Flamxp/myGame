function displayGames() {
  const username = localStorage.getItem("username");
  if (!username) {
    console.warn("Ingen användare inloggad.");
    return;
  }

  const libraryKey = `wish_${username}`;
  const games = JSON.parse(localStorage.getItem(libraryKey)) || [];

  const container = document.getElementById("game-container");
  container.innerHTML = "";

  if (games.length === 0) {
    container.innerHTML = "<p>Inga spel finns.</p>";
    return;
  }

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-grid";
    card.onclick = () => window.location.href = game.url;

    card.innerHTML = `
      <div class="game-card">
        <img src="${game.image}" alt="${game.title}">
        <div class="game-info">
          <h3>${game.title}</h3>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", displayGames);    