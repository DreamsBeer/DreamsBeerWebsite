const form = document.getElementById("beerForm");
const modal = document.getElementById("successModal");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    modal.classList.add("flex");
});

function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}