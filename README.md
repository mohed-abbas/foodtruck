FoodTruck Web App
A simple full-stack application for a food truck business. It provides a web interface where customers can browse the menu, manage a shopping cart and place orders.

Features
Interactive Menu: Browse food items with images, descriptions, and prices
Shopping Cart: Add, remove, and manage items in your cart
Local Storage: Cart persists between sessions using browser storage
Responsive Design: Works on mobile, tablet, and desktop devices
Order Simulation: Visual feedback during order processing
Technologies Used
HTML5
CSS3 with Tailwind CSS
Vanilla JavaScript (ES6+)
Modules for organized code structure
LocalStorage API for cart persistence
Express server with SQLite database

## Development

Install dependencies and start the server:

```bash
npm install
npm start
```

The application will be available at `http://localhost:3000`.

### Docker

You can also run the application using Docker:

```bash
docker build -t foodtruck .
docker run -p 3000:3000 foodtruck
```
