import { useState ,useEffect} from "react";

function ProductUpload() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
const [products, setProducts] = useState([]);
 const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products/${id}`,
      {
        method: "DELETE"
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error);
    }

    // UI se bhi remove karo
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
 const handleEdit = async (product) => {
  const name = window.prompt(
    "Enter product name:",
    product.name
  );

  if (!name) return;

  const price = window.prompt(
    "Enter product price:",
    product.price
  );

  if (!price) return;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          price
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error);
    }

    // UI mein updated product
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === product.id
          ? data.product
          : item
      )
    );

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
 useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/products`)
    .then((response) => response.json())
    .then((data) => {
      setProducts(data.products);
    })
    .catch((error) => {
      console.error("Failed to fetch products:", error);
    });
}, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !file) {
      alert("Name, price and image are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("image", file);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "POST",
          body: formData
        }
      );

      alert(response)
      if (!response.ok) {
        throw new Error(response.message || response.error || "Upload failed");
      }

      setProduct(response.product);
const productsResponse = await fetch(
  `${import.meta.env.VITE_API_URL}/api/products`
);

const productsData = await productsResponse.json();

setProducts(productsData.products);
      setName("");
      setPrice("");
      setFile(null);

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
   
  };

  return (
    <div>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Laptop"
          />
        </div>

        <div>
          <label>Price</label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="65000"
          />
        </div>

        <div>
          <label>Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
<div>
  <h2>Products</h2>

  <div>
  <h2>Products</h2>

  {products.map((product) => (
    <div key={product.id}>
      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          width="200"
        />
      )}

      <br />

      <button onClick={() => handleEdit(product)}>
        Edit
      </button>

      <button onClick={() => handleDelete(product.id)}>
        Delete
      </button>
    </div>
  ))}
</div>
</div>
      {product && (
        <div>
          <h2>Product Created</h2>

          <p>
            <strong>Name:</strong> {product.name}
          </p>

          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>

          <img
            src={product.image_url}
            alt={product.name}
            width="300"
          />
        </div>
      )}
    </div>
  );
}

export default ProductUpload;