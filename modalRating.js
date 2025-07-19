/*modalRating.js*/
function creaStelle(productId, productName, imageUrl) {
  const container = document.createElement("div");
  container.classList.add("rating-container");

  for (let i = 1; i <= 5; i++) {
    const stella = document.createElement("span");
    stella.innerHTML = "★";
    stella.classList.add("star");
    stella.dataset.value = i;

    stella.addEventListener("click", function () {
      const rating = parseInt(this.dataset.value);
      [...container.children].forEach((s, index) => {
        s.classList.toggle("active", index < rating);
      });

      // Mostra la modal
      apriModal(productName, imageUrl, rating);
    });

    container.appendChild(stella);
  }

  return container;
}

function apriModal(nome, img, voto) {
  document.getElementById("modalName").textContent = nome;
  document.getElementById("modalImage").src = img;
  document.getElementById("modalRating").textContent = `Hai votato: ${voto} su 5 stelle`;
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

