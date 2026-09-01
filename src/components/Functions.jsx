export const handleDelete = async (id) => {
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


export const handleEdit = async (product) => {
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