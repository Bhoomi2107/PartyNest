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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (password.length < 8) {
        setMessage('Password must be at least 8 characters long');
        return;
      }

      if (res.ok) {
        toast.success("Login successful! Redirecting...");
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Login failed");
      }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false); // Stop spinner
      }
    };

    //   if (!res.ok) {
    //     toast.error(data.error || "Login failed");
    //     return;
    //   }

    //   localStorage.setItem("token", data.token);
    //   toast.success("Login successful! Redirecting...");
    //   router.push("/dashboard");
    // } catch (err) {
    //   console.error(err);
    //   toast.error("Network error. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
    // };

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
          {/* <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          /> */}
          
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="signup-text">
          New to PartyNest? <Link href="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
