export const cartKey = "foodtruck-cart"; // Custom key for localStorage

export const cart = new Map(); // Use Map for better performance with large carts

// Get the buttons for emptying the cart and ordering
const emptyCartBtn = document.getElementById("empty-cart-btn");
const orderBtn = document.getElementById("order-btn");

/*
 * Load the cart from localStorage.
 */
export function loadCart() {
  try {
    const saved = localStorage.getItem(cartKey);
    if (saved) {
      const items = JSON.parse(saved);
      items.forEach(([id, item]) => cart.set(id, item));
    }
  } catch (err) {
    console.error("Failed to load cart:", err);
  }
}

/*
 * Save the current cart to localStorage.
 */
export function saveCart() {
  try {
    const items = Array.from(cart.entries());
    localStorage.setItem(cartKey, JSON.stringify(items));

    updateCartButtons(false); // Hide buttons if cart is empty
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
}
/*
 * Add an item to the cart by ID.
 * If item already exists, increment its quantity.
 * If not, add it with quantity 1.
 *
 * @param {number} id - The ID of the menu item to add.
 */
export function addToCart(id) {
  // Find the corresponding menu item
  const item = window.menuData.find((item) => item.id === id);
  if (!item) return;

  // If already in cart, increment qty, otherwise add new
  if (cart.has(id)) {
    cart.get(id).qty += 1;
  } else {
    cart.set(id, {
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
    });
  }
  saveCart();
}

/*
 * Remove one item from the cart by ID.
 * If quantity goes to 0, remove the item entirely.
 *
 * @param {number} id - The ID of the item to remove.
 */
export function removeFromCart(id) {
  const item = cart.get(id);
  if (!item) return;
  if (item.qty > 1) {
    item.qty -= 1; // Decrement quantity
  } else {
    cart.delete(id); // Remove item if qty is 1
  }
  saveCart();
  renderCart(); // Re-render cart after removal
}
/*
 * Clear the entire cart.
 * This will remove all items and reset the cart.
 */
export function emptyCart() {
  cart.clear();
  saveCart();
}

export function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  //Clear previous contents
  itemsEl.innerHTML = "";
  totalEl.textContent = "";

  // If empty cart
  if (cart.size === 0) {
    itemsEl.innerHTML = `<p class="text-gray-600">Votre panier est vide.</p>`;
    updateCartButtons(false);
    return;
  }

  // Otherwise, list items & compute total
  let total = 0;
  cart.forEach(({ id, name, price, qty }) => {
    total += price * qty;
    const row = document.createElement("div");
    row.className =
      "flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer";
    row.innerHTML = `<span data-id="${id}">${name} x${qty}</span><span>${(
      price * qty
    ).toFixed(2)}€</span>`;
    itemsEl.appendChild(row);
    // Add click listener to remove item
    row.querySelector("[data-id]").addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent event bubbling
      removeFromCart(id);
    });
  });

  //Show total
  totalEl.textContent = `Total : ${total.toFixed(2)}€`;

  // Show buttons if cart has items
  updateCartButtons(true);

  // Add empty cart button
  emptyCartBtn.addEventListener("click", () => {
    emptyCart();
    renderCart(); // Re-render cart after emptying
  });
}

// Helper function to set button state
function setButtonState(button, isEnabled) {
  button.classList.toggle("hidden", !isEnabled);
  button.disabled = !isEnabled;
}

function updateCartButtons(isVisible) {
  setButtonState(emptyCartBtn, isVisible);
  setButtonState(orderBtn, isVisible);
}
