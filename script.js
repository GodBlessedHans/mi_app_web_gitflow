const cartCount = document.querySelector("#cartCount");
const toast = document.querySelector("#toast");
const cartButton = document.querySelector("#cartButton");
const orderPanel = document.querySelector("#orderPanel");
const cartItemsContainer = document.querySelector("#cartItems");
const subtotalValue = document.querySelector("#subtotalValue");
const shippingValue = document.querySelector("#shippingValue");
const discountValue = document.querySelector("#discountValue");
const totalValue = document.querySelector("#totalValue");
const recommendationTitle = document.querySelector("#recommendationTitle");
const recommendationText = document.querySelector("#recommendationText");
const quoteButton = document.querySelector("#quoteButton");
const checkoutButton = document.querySelector("#checkoutButton");
const clearCartButton = document.querySelector("#clearCart");
const usageType = document.querySelector("#usageType");
const channelSelect = document.querySelector("#channelSelect");
const budgetSelect = document.querySelector("#budgetSelect");

const productCatalog = {
    "Falcon T18 Command": { price: 429, type: "sim" },
    "Vector V12 Range": { price: 289, type: "rc" },
    "Scout S8 Lite": { price: 179, type: "compact" }
};

let cartItems = [];

const showToast = (message) => {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2400);
};

const getRecommendation = () => {
    const type = usageType?.value || "sim";
    const channels = Number(channelSelect?.value || 12);
    const budget = Number(budgetSelect?.value || 350);

    if (type === "sim" || channels >= 18) {
        return {
            title: "Falcon T18 Command",
            text: `Ideal para simulacion premium con ${channels} canales y un presupuesto cercano a USD ${budget}.`
        };
    }

    if (type === "rc") {
        return {
            title: "Vector V12 Range",
            text: `Perfecto para RC avanzado con ${channels} canales, equilibrio entre respuesta y portabilidad.`
        };
    }

    return {
        title: "Scout S8 Lite",
        text: `Recomendado para entrenamiento o uso compacto con un rango de gasto hasta USD ${budget}.`
    };
};

const renderCart = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    const shipping = cartItems.length > 0 ? (subtotal > 500 ? 0 : 29) : 0;
    const discount = subtotal >= 500 ? subtotal * 0.1 : 0;
    const total = subtotal + shipping - discount;

    cartCount.textContent = String(cartItems.length);

    if (!cartItemsContainer) return;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Aun no has seleccionado articulos.</p>';
    } else {
        cartItemsContainer.innerHTML = cartItems
            .map(
                (item) => `
                    <div class="cart-item">
                        <div>
                            <strong>${item.name}</strong>
                            <span>${item.type}</span>
                        </div>
                        <span>USD ${item.price}</span>
                    </div>
                `
            )
            .join("");
    }

    subtotalValue.textContent = `USD ${subtotal}`;
    shippingValue.textContent = `USD ${shipping}`;
    discountValue.textContent = `-USD ${discount.toFixed(0)}`;
    totalValue.textContent = `USD ${total}`;
};

const addProductToCart = (productName) => {
    const product = productCatalog[productName];
    if (!product) return;

    cartItems.push({ name: productName, price: product.price, type: product.type });
    renderCart();
    showToast(`${productName} agregado al pedido`);
};

const toggleCart = () => {
    if (!orderPanel) return;
    orderPanel.classList.toggle("open");
};

const updateRecommendation = () => {
    const recommendation = getRecommendation();
    if (recommendationTitle && recommendationText) {
        recommendationTitle.textContent = recommendation.title;
        recommendationText.textContent = recommendation.text;
    }
};

if (cartButton) {
    cartButton.addEventListener("click", toggleCart);
}

clearCartButton?.addEventListener("click", () => {
    cartItems = [];
    renderCart();
    showToast("Pedido limpio");
});

checkoutButton?.addEventListener("click", () => {
    if (cartItems.length === 0) {
        showToast("Elige al menos un producto");
        return;
    }

    showToast("Cotizacion enviada a tu asesor");
});

quoteButton?.addEventListener("click", () => {
    updateRecommendation();
    showToast("Recomendacion preparada");
});

document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
        addProductToCart(button.dataset.product);
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

[usageType, channelSelect, budgetSelect].forEach((element) => {
    element?.addEventListener("change", updateRecommendation);
});

renderCart();
updateRecommendation();
