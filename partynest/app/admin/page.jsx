"use client";
import React, { useState, useEffect } from "react";
import "./admin.css";

export default function AdminDashboard() {
  const [section, setSection] = useState("overview");
  const [products, setProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    console.log("Section changed:", section);
    if (section === "products") fetchProducts();
  },[section]);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products...");
      const res = await fetch("/api/products");
      console.log(res);
      const data = await res.json();
      console.log("🔍 Fetched products:", data);
      setProducts(data);
    } catch (err) {
      console.error("❌ Failed to fetch products:", err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageBase64(reader.result.split(",")[1]); // remove base64 prefix
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      if (imageBase64) {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: imageBase64,
            fileName: "product-" + Date.now(),
          }),
        });

        const uploadData = await uploadRes.json();
        console.log("📦 Upload response:", uploadData);

        if (!uploadData?.url) {
          alert("Image upload failed!");
          setLoading(false);
          return;
        }

        imageUrl = uploadData.url;
        console.log("✅ Image uploaded:", imageUrl);
      }

      const finalProduct = {
        ...formData,
        imageUrl: imageUrl,
      };

      console.log("🧾 Final product payload:", finalProduct);

      const productRes = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalProduct),
      });

      const productData = await productRes.json();
      console.log("📥 Product creation response:", productData);

      if (productRes.ok) {
        alert("✅ Product added successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          image: "",
          category: "",
        });
        setImagePreview("");
        setImageBase64("");

        if (section === "products") fetchProducts(); // refresh list
      } else {
        alert("❌ Failed to add product");
      }
    } catch (err) {
      console.error("🚨 Add product error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error("🚨 Delete error:", err);
    }
  };

  const renderSection = () => {
    switch (section) {
      case "add-product":
        return (
          <div className="add-product-section">
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct} className="admin-form">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
              <input type="file" accept="image/*" onChange={handleImageChange} required />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "150px", marginTop: "1rem", borderRadius: "8px" }}
                />
              )}

              <button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
              </button>
            </form>
          </div>
        );

      case "products":
        return (
          <div className="manage-products-section">
            <h2>Manage Products</h2>
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <ul className="product-list">
                {products.map((product) => (
                  <li key={product._id} className="product-item">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginRight: "10px",
                      }}
                    />
                    <span>{product.title}</span> - ₹{product.price}
                    <button onClick={() => handleDelete(product._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "orders":
        return <div className="admin-section">[Orders Table Here]</div>;

      default:
        return <div className="admin-section">Welcome to Admin Dashboard!</div>;
    }
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <nav>
          <button onClick={() => setSection("overview")}>Overview</button>
          <button onClick={() => setSection("add-product")}>Add Product</button>
          <button onClick={() => setSection("products")}>Manage Products</button>
          <button onClick={() => setSection("orders")}>Manage Orders</button>
        </nav>
      </aside>
      <main className="admin-main">{renderSection()}</main>
    </div>
  );
}
