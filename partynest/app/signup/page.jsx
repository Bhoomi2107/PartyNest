"use client";
import React, { useState } from "react";
import "./signup.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return;
      }

      if (res.ok) {
        toast.success("Signup successful!");
        router.push("/login");
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src="/disco-login.png" alt="Party Lights" />
      </div>
      <div className="form-section">
        <h2>Create Your PartyNest Account</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            style={{ textTransform: "lowercase" }}
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <button type="submit">Sign Up</button>
          )}
        </form>
        <p className="signup-text">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
