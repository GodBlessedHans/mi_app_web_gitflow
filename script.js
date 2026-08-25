const cartCount = document.querySelector("#cartCount");
const toast = document.querySelector("#toast");
const configButton = document.querySelector(".config-card .button");
let cartTotal = 0;

document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
        cartTotal += 1;
        cartCount.textContent = String(cartTotal);
        toast.textContent = `${button.dataset.product} agregado al pedido`;
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 2200);
    });
});

document.querySelectorAll(".filter").forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach((button) => button.classList.remove("active"));
        filterButton.classList.add("active");

        const selectedType = filterButton.dataset.filter;
        document.querySelectorAll(".product-card").forEach((card) => {
            card.hidden = selectedType !== "all" && card.dataset.type !== selectedType;
        });
    });
});

if (configButton) {
    configButton.addEventListener("click", () => {
        toast.textContent = "Recomendacion preparada. Un asesor puede continuar contigo.";
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 2200);
    });
}
