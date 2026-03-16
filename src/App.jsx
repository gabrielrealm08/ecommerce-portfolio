import { useMemo, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Minimal Backpack",
    category: "Accessories",
    price: 129,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Classic Sneakers",
    category: "Footwear",
    price: 94,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Essential Overshirt",
    category: "Apparel",
    price: 76,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Desk Set",
    category: "Home",
    price: 58,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Leather Wallet",
    category: "Accessories",
    price: 49,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Running Shoes",
    category: "Footwear",
    price: 110,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Cotton Hoodie",
    category: "Apparel",
    price: 65,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Modern Lamp",
    category: "Home",
    price: 72,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = ["All", "Accessories", "Footwear", "Apparel", "Home"];

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="app">
      <header className="header">
        <h1>Northstar Store</h1>
        <p>E-commerce portfolio project</p>
        <div className="cart-box">
          <strong>Cart:</strong> {totalItems} items (${totalPrice})
        </div>
      </header>

      <section className="hero">
        <h2>Modern e-commerce storefront</h2>
        <p>
          Built with React and Vite. Great for your portfolio, GitHub, and
          Vercel deployment.
        </p>
      </section>

      <section className="stats">
        <div className="stat-card">
          <h3>8</h3>
          <p>Featured Products</p>
        </div>
        <div className="stat-card">
          <h3>4</h3>
          <p>Categories</p>
        </div>
        <div className="stat-card">
          <h3>100%</h3>
          <p>Responsive Layout</p>
        </div>
        <div className="stat-card">
          <h3>React</h3>
          <p>Built with Modern Tools</p>
        </div>
      </section>

      <section className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="products">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>⭐ {product.rating}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </section>

      <section className="features">
        <h2>Why Shop With Us</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Fast Delivery</h3>
            <p>Quick shipping on all featured items.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Checkout</h3>
            <p>Portfolio demo built to simulate real online shopping UX.</p>
          </div>
          <div className="feature-card">
            <h3>Modern UI</h3>
            <p>Responsive design with search, category filters, and cart state.</p>
          </div>
        </div>
      </section>

<footer className="footer">
  <h3>Northstar Store</h3>
  <p>Built by Gabriel Oyibo as a front-end portfolio project using React and Vite.</p>
  <p>© {new Date().getFullYear()} Gabriel Oyibo. All rights reserved.</p>
</footer>
    </div>
  );
}

export default App;