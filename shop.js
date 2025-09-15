document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll('.filter-sidebar input[type="checkbox"]');
    const searchInput = document.querySelector('.search-box input');
    const productCards = document.querySelectorAll('.product-card');

    function filterProducts() {
    const checkedCategories = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const searchTerm = searchInput.value.trim().toLowerCase();

    productCards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const priceText = card.querySelector('p').textContent.replace(/[^0-9.]/g, '');
        const price = parseFloat(priceText);
        const category = card.dataset.category;

        let categoryMatch = checkedCategories.length === 0 || checkedCategories.includes(category);
        let searchMatch = searchTerm === "" || name.includes(searchTerm);
        let priceMatch = true;

        if (document.querySelector('input[value="under50"]')?.checked) priceMatch = price < 50;
        if (document.querySelector('input[value="50-100"]')?.checked) priceMatch = price >= 50 && price <= 100;
        if (document.querySelector('input[value="over100"]')?.checked) priceMatch = price > 100;

        card.style.display = (categoryMatch && searchMatch && priceMatch) ? "" : "none";
    });
}


    checkboxes.forEach(cb => cb.addEventListener("change", filterProducts));
    searchInput.addEventListener("input", filterProducts);
});
