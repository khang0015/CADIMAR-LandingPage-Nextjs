"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "cadimar" && password === "12345") {
      // Set a simple session (localStorage)
      localStorage.setItem("admin-auth", "true");
      router.push("/admin/contacts");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: 32, borderRadius: 12, boxShadow: "0 2px 16px #0001", minWidth: 320 }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24, textAlign: "center" }}>Admin Login</h2>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
            autoFocus
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
          />
        </div>
        {error && <div style={{ color: "#e11d48", marginBottom: 12, textAlign: "center" }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10, borderRadius: 6, background: "#16a34a", color: "white", fontWeight: 600, border: "none", fontSize: 16 }}>
          Login
        </button>
      </form>
    </div>
  );
}
