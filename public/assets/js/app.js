// public/assets/js/app.js
import { loadMenu, renderMenu, menuData } from "./menu.js";
import { loadCart, saveCart, addToCart, renderCart, cart } from "./cart.js";
import { setupModal } from "./modal.js";
import { submitOrder } from "./orders.js";

const menuContainer = document.getElementById("menu");
const orderBtn = document.getElementById("order-btn");
const cancelOrderBtn = document.getElementById("cancel-order-btn");
const confirmOrderBtn = document.getElementById("confirm-order-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

/*
 * Initialize the application.
 */
async function init() {
  // Load and render cart first
  loadCart();
  renderCart(); // Don't pass cartContainer parameter

  // Setup modal
  setupModal(orderBtn, cancelOrderBtn, closeModalBtn);

  // Setup order confirmation button
  confirmOrderBtn.addEventListener("click", async () => {
    await submitOrder();
  });

  // Load menu & render it
  try {
    await loadMenu();
    // Make menuData available to other modules
    window.menuData = menuData;
    renderMenu(menuContainer);
  } catch (err) {
    console.error("Erreur menu:", err);
    menuContainer.innerHTML = `<p class="text-red-600">Impossible de charger le menu.</p>`;
  }

  // Hook up Add-to-cart
  menuContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-id]");
    if (!btn) return;
    const id = +btn.dataset.id;
    addToCart(id);
    renderCart();
  });
}

document.addEventListener("DOMContentLoaded", init);
