document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.carousel-container').forEach(container => {
    const carousel = container.querySelector('.product-carousel');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' });
    });
  });
});
