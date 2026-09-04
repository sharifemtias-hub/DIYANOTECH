document.addEventListener("DOMContentLoaded", () => {

  const menuButton = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
    });
  }

  // Lightweight card interaction
  const cards = document.querySelectorAll(
    ".solution-card, .security-card"
  );

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform .25s ease";
    });
  });

});
