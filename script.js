const cartCount = document.querySelector("#cartCount");
const toast = document.querySelector("#toast");
const configButton = document.querySelector(".config-card .button");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector("#mobileNav");
const configResult = document.querySelector("#configResult");
let cartTotal = 0;

const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2200);
};

document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
        cartTotal += 1;
        cartCount.textContent = String(cartTotal);
        showToast(`${button.dataset.product} agregado al pedido`);
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
        const useCase = document.querySelector("#useCase").value;
        const channels = Number(document.querySelector("#channels").value);
        const budget = document.querySelector("#budget").value;
        let model = "Scout S8 Lite";
        let reason = "ligero, directo y perfecto para una estacion compacta";

        if (useCase === "sim" && (channels >= 18 || budget === "pro")) {
            model = "Falcon T18 Command";
            reason = "sus perfiles, sensores Hall y 18 canales aprovechan al maximo una cabina de simulacion";
        } else if (useCase === "rc" || channels >= 12 || budget === "mid") {
            model = "Vector V12 Range";
            reason = "equilibra telemetria, respuesta y portabilidad para vuelo RC avanzado";
        }

        configResult.innerHTML = `<strong>Recomendacion: ${model}.</strong> Te conviene porque ${reason}.`;
        showToast(`Tu setup ideal es ${model}`);
    });
}

if (menuButton && mobileNav) {
    menuButton.addEventListener("click", () => {
        const isOpen = !mobileNav.hidden;
        mobileNav.hidden = isOpen;
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menuButton.textContent = isOpen ? "Menu" : "Cerrar";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileNav.hidden = true;
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "Menu";
        });
    });
}
