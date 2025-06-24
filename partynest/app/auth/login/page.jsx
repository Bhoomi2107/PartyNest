"use client";
import React, { useState } from "react";
import "./login.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const { name, email } = formData;
  
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (res.status === 403) {
        const data = await res.json();
        setError(data.error); // "Please verify your email first"
        toast.error(data.error);
        setLoading(false);
        return;
      }
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.error || "Login failed");
        toast.error(data.error || "Login failed");
        setLoading(false);
        return;
      }
  
      toast.success("Login successful! Redirecting...");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <Image src="/disco-login.png" alt="Party theme" width={500} height={500} />
      </div>
      <div className="form-section">
        <h2>
          Login to <span>PartyNest</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
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
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              style={{ marginBottom: '0.5rem' }}
            />
            <div><small className="password-hint">*Minimum 8 characters</small></div>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-text">
          New to PartyNest? <Link href="/auth/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
