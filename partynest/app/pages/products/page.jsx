"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./products.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <Image src={product.imageUrl} alt={product.title} width={200} height={200} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>₹{product.price}</p>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
