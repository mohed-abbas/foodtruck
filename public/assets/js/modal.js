import { cart } from "./cart.js";

const modal = document.getElementById("order-modal");
const content = document.getElementById("modal-content");

/*
 * Toggle the visibility of the modal.
 * This function adds or removes classes to show or hide the modal.
 *
 * @param {boolean} show - If true, shows the modal; if false, hides it.
 * @returns {void}
 * @throws {Error} If modal or content elements are not found.
 */
export function toggleModal(show) {
  modal.classList.toggle("opacity-0", !show);
  modal.classList.toggle("pointer-events-none", !show);
}

/*
 * Populate the modal with the current cart items and their totals.
 * This function clears the modal content and adds each item in the cart,
 * along with a summary of the total price, tax, and final amount.
 *
 * @returns {void}
 * @throws {Error} If content element is not found.
 */
export function populateModal() {
  content.innerHTML = "";
  let ht = 0;
  cart.forEach(({ name, price, qty }) => {
    const lineTotal = price * qty;
    ht += lineTotal;
    const row = document.createElement("div");
    row.className = "flex justify-between";
    row.innerHTML = `<span>${name} x${qty}</span><span>${lineTotal.toFixed(
      2
    )}€</span>`;
    content.appendChild(row);
  });

  const tva = ht * 0.1;
  const ttc = ht + tva;
  const summary = document.createElement("div");
  summary.className = "mt-4 border-t pt-4 space-y-2";
  summary.innerHTML = `
    <div class="flex justify-between"><span>Prix HT :</span><span>${ht.toFixed(
      2
    )}€</span></div>
    <div class="flex justify-between"><span>TVA (10%) :</span><span>${tva.toFixed(
      2
    )}€</span></div>
    <div class="flex justify-between font-bold"><span>Total TTC :</span><span>${ttc.toFixed(
      2
    )}€</span></div>
  `;
  content.appendChild(summary);
}

/*
 * Setup the modal event listeners for order, cancel, and close buttons.
 * This function binds click events to the buttons to show or hide the modal.
 *
 * @param {HTMLElement} orderBtn - The button to open the modal.
 * @param {HTMLElement} cancelBtn - The button to cancel the order.
 * @param {HTMLElement} closeBtn - The button to close the modal.
 * @returns {void}
 * @throws {Error} If any of the buttons are not valid HTMLElements.
 */
export function setupModal(orderBtn, cancelBtn, closeBtn) {
  orderBtn.addEventListener("click", () => {
    populateModal();
    toggleModal(true);
  });
  cancelBtn.addEventListener("click", () => toggleModal(false));
  closeBtn.addEventListener("click", () => toggleModal(false));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) toggleModal(false);
  });
}
