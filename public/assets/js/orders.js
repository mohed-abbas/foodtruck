// orders.js
import { cart, saveCart, renderCart } from "./cart.js";
import { toggleModal } from "./modal.js";

/*
 * Submit the order and simulate a progress bar.
 */
export async function submitOrder() {
  // Create a progress tracker
  const progressEl = document.createElement("div");
  progressEl.className =
    "fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg";
  progressEl.innerHTML = `<p>Envoi de votre commande...</p>
    <div class="w-full bg-gray-200 rounded-full h-2.5">
      <div class="bg-green-600 h-2.5 rounded-full w-0 transition-all duration-300"></div>
    </div>`;
  document.body.appendChild(progressEl);

  const progressBar = progressEl.querySelector("div > div");

  // Simulate API request
  try {
    // Fake progress updates
    for (let i = 0; i <= 100; i += 20) {
      progressBar.style.width = i + "%";
      await new Promise((r) => setTimeout(r, 500)); // Wait half a second
    }

    // Simulate successful order
    progressEl.innerHTML = `<p class="text-green-600 font-bold">Commande confirmée !</p>`;

    // Clear cart after successful order
    cart.clear();
    saveCart();
    renderCart();

    // Close modal
    toggleModal(false);

    // Remove progress element after a delay
    setTimeout(() => {
      progressEl.remove();
    }, 3000);
  } catch (err) {
    console.error("Order submission error:", err);
    progressEl.innerHTML = `<p class="text-red-600">Erreur lors de l'envoi de la commande.</p>`;
    setTimeout(() => {
      progressEl.remove();
    }, 3000);
  }
}
