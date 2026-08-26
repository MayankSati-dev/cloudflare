import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("Loading...");

  async function getProducts() {
    try {
      const response = await fetch(`${API_URL}/api/projects`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      setProducts(data);
      setMessage("Backend connected successfully");
    } catch (error) {
      console.error(error);
      setMessage("Backend connection failed");
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        fontFamily: "Arial",
        padding: "20px"
      }}
    >
      <h1>Cloudflare Full Stack Demo</h1>

      <p>{message}</p>

      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;