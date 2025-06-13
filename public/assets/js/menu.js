export let menuData = []; // This will hold the menu data loaded from the JSON file

/*
 * Load the menu data from a JSON file.
 * This function fetches the menu data and stores it in the `menuData` variable.
 * It should be called once at the start of the application.
 *
 * @returns {Promise<void>} A promise that resolves when the menu is loaded.
 * @throws {Error} If the fetch request fails.
 */
export async function loadMenu() {
  const res = await fetch("./assets/data/menu.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  menuData = await res.json();

  console.log("Menu loaded:", menuData);
}

/*
 * Render the menu items into a given container.
 * This function creates card elements for each menu item and appends them to the specified container.
 *
 * @param {HTMLElement} container - The container element where the menu items will be rendered.
 * @returns {void}
 * @throws {Error} If the container is not a valid HTMLElement.
 */
export function renderMenu(container) {
  //   container.innerHTML = "";
  menuData.forEach((item) => {
    const card = document.createElement("div");
    card.className = [
      "bg-white",
      "rounded-2xl",
      "shadow-lg",
      "overflow-hidden",
      "flex",
      "flex-col",
      "transform",
      "hover:scale-105",
      "transition",
    ].join(" ");
    card.innerHTML = `
      <img src="${item.image}"
           alt="${item.name}"
           class="w-full h-40 object-cover" />
      <div class="p-4 flex-1 flex flex-col">
        <h3 class="text-xl font-semibold mb-2">${item.name}</h3>
        <p class="text-gray-600 flex-1">${item.description}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-lg font-bold">${item.price.toFixed(2)}€</span>
          <button data-id="${item.id}"
                  class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
            Ajouter
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
