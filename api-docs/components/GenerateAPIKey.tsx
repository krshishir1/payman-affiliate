import React, { useState } from "react";

const GenerateApiKey = () => {
  const [merchant, setMerchant] = useState({ name: "", email: "", company_name: "" });
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setMerchant({ ...merchant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/merchants/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merchant),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to generate API key");
      
      setApiKey(data.api_key);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h2>Register as new merchant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={merchant.name} onChange={handleChange} required style={{ width: "100%", padding: "8px", margin: "5px 0" }} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={merchant.email} onChange={handleChange} required style={{ width: "100%", padding: "8px", margin: "5px 0" }} />
        </div>
        <div>
          <label>Company Name</label>
          <input type="text" name="company_name" value={merchant.company_name} onChange={handleChange} required style={{ width: "100%", padding: "8px", margin: "5px 0" }} />
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", marginTop: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
          {loading ? "Generating..." : "Generate API Key"}
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      {apiKey && (
        <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f1f1f1", borderRadius: "5px" }}>
          <p>Your API Key:</p>
          <p style={{ color: "#007bff", wordBreak: "break-all" }}>{apiKey}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateApiKey;
