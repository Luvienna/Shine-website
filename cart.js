document.addEventListener("DOMContentLoaded", () => {
    const CART_KEY = "cart";
    const cartLink = document.getElementById("cart-link");

    // === CART STORAGE FUNCTIONS ===
    function loadCart() {
        try {
            return JSON.parse(localStorage.getItem(CART_KEY)) || [];
        } catch {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    // === CART ICON UPDATE ===
    function cartHasItems(cart) {
        return Array.isArray(cart) && cart.some(item => item.quantity > 0);
    }

    function updateCartIndicator() {
        const cart = loadCart();
        if (cartHasItems(cart)) {
            cartLink.classList.add("has-items");
        } else {
            cartLink.classList.remove("has-items");
        }
    }

    // === ADD TO CART BUTTON HANDLER ===
    function addToCart(product) {
        const cart = loadCart();
        const existing = cart.find(it => it.name === product.name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        saveCart(cart);
        updateCartIndicator();
    }

    function attachAddToCartButtons() {
        document.querySelectorAll(".product-card button").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const card = e.currentTarget.closest(".product-card");
                const name = card.querySelector("h4").textContent.trim();
                const price = parseFloat(card.querySelector("p").textContent.replace(/[^0-9.]/g, ""));
                const image = card.querySelector("img").getAttribute("src");

                addToCart({ name, price, image });
            });
        });
    }

    // === RENDER CART (ONLY ON CART PAGE) ===
    function renderCartPage() {
        const cartContainer = document.getElementById("cart-container");
        const cartTotal = document.getElementById("cart-total");
        if (!cartContainer || !cartTotal) return; // not on cart page

        const cart = loadCart();
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotal.innerHTML = "";
            updateCartIndicator();
            return;
        }

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" width="80">
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="cart-qty">
                    <button data-index="${index}" class="remove-item">Remove</button>
                </div>
            `;
        });

        cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    }

    // === CART PAGE EVENTS ===
    function attachCartPageEvents() {
        const cartContainer = document.getElementById("cart-container");
        if (!cartContainer) return; // not on cart page

        cartContainer.addEventListener("change", (e) => {
            if (e.target.classList.contains("cart-qty")) {
                const index = e.target.dataset.index;
                const cart = loadCart();
                cart[index].quantity = parseInt(e.target.value);
                saveCart(cart);
                renderCartPage();
            }
        });

        cartContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove-item")) {
                const index = e.target.dataset.index;
                const cart = loadCart();
                cart.splice(index, 1);
                saveCart(cart);
                renderCartPage();
            }
        });
    }

    // === INIT ===
    updateCartIndicator();
    attachAddToCartButtons();
    renderCartPage();
    attachCartPageEvents();
});
