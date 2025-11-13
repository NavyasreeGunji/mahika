# Mahika Shopping Store

A full-stack e-commerce web application for selling dresses, jewelry, shoes, and bags with modern features and purple-themed UI.

## Features

### Customer Features
- 🛍️ Browse products by category (Dresses, Jewelry, Shoes, Bags)
- 🔍 Search products by name or category
- ❤️ Wishlist functionality
- 🛒 Shopping cart with quantity management
- 💳 UPI payment integration (PhonePe & Google Pay)
- 👤 User profile with order history
- 📦 Multiple product images with size selection
- 🔄 Sort products by price and name

### Admin Features
- 🔐 Password-protected admin panel (password: admin123)
- ➕ Add new products with multiple images
- 📏 Size management (S, M, L, XL, XXL)
- 📊 Stock management

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Responsive design
- Purple gradient theme (#667eea to #764ba2)

### Backend
- Java 17
- Spring Boot
- H2 In-Memory Database
- REST API

## Project Structure

```
shopping-app/
├── frontend/
│   └── index.html          # Single-page application
├── backend/
│   └── src/
│       └── main/
│           ├── java/com/shopping/
│           │   ├── model/
│           │   │   ├── Product.java
│           │   │   ├── Order.java
│           │   │   └── OrderItem.java
│           │   ├── repository/
│           │   │   ├── ProductRepository.java
│           │   │   └── OrderRepository.java
│           │   ├── service/
│           │   │   ├── ProductService.java
│           │   │   └── OrderService.java
│           │   └── controller/
│           │       ├── ProductController.java
│           │       └── OrderController.java
│           └── resources/
│               └── application.properties
├── RUN_APP.bat             # Quick launcher
└── README.md

```

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven
- Modern web browser

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend will run on `http://localhost:8080`

2. **Open Frontend**
   - Double-click `RUN_APP.bat`, or
   - Open `frontend/index.html` in your browser

### Quick Start
Simply run `RUN_APP.bat` to launch the application.

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Add new product
- `GET /api/products/{id}` - Get product by ID
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/email/{email}` - Get orders by customer email

## Features in Detail

### Search & Filter
- Real-time product search
- Category filtering
- Sort by price (low to high, high to low)
- Sort by name (A to Z)

### Payment
- UPI payment integration
- PhonePe support
- Google Pay support
- Order confirmation

### Admin Panel
- Password: `admin123`
- Add products with multiple images
- Set available sizes
- Manage stock quantities

## Sample Products
- Handwoven Cotton Kurta - ₹1,899
- Silver Oxidized Earrings - ₹899
- Leather Kolhapuri Chappals - ₹1,299
- Handcrafted Jute Bag - ₹799
- Block Print Palazzo Set - ₹2,299
- Brass Statement Necklace - ₹1,599

## Design
- Modern minimalist design inspired by contemporary e-commerce sites
- Purple gradient theme
- Responsive layout
- Clean product cards with wishlist buttons
- Announcement bar for promotions

## Currency
All prices are in Indian Rupees (₹)

## License
This project is for educational purposes.

## Author
Mahika Shopping Store Team
