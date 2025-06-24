"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./cart.css";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <Image src="/image/empty-cart.png" alt="Empty Cart" width={300} height={300} />
          <h2>Your cart is empty</h2>
          <p>Relax, let us help you find something to buy.</p>
        </div>
      ) : (
        <div className="cart-details">
          <h2>Your Cart</h2>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <Image src={item.image} alt={item.name} width={80} height={80} />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price} × {item.quantity}</p>
              </div>
            </div>
          ))}
          <hr />
          <div className="cart-total">
            <h3>Total: ₹{getTotal()}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
