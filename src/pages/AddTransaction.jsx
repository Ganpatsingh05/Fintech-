// ==============================
// AddTransaction Page — Standalone Form Page
// ==============================
// Full-page version of the transaction form for the
// /add-transaction route. Saves transaction to Realtime Database then navigates back.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ref, push } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/Layout/DashboardLayout";
import { FiArrowLeft, FiDollarSign, FiTag, FiCalendar, FiFileText, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import "./AddTransaction.css";

const CATEGORIES = {
  income: ["Salary", "Freelance", "Investments", "Business", "Gifts", "Other"],
  expense: [
    "Food & Dining",
    "Transport",
    "Shopping",
    "Bills & Utilities",
    "Entertainment",
    "Health",
    "Education",
    "Rent",
    "Travel",
    "Other",
  ],
};

export default function AddTransaction() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" ? { category: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      const transactionsRef = ref(db, `transactions/${currentUser.uid}`);
      await push(transactionsRef, {
        ...formData,
        amount: parseFloat(formData.amount),
        createdAt: new Date().toISOString(),
      });
      toast.success("Transaction added!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to add transaction");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="add-transaction-page">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <FiArrowLeft /> Back to Dashboard
        </button>

        <div className="add-form-card">
          <h1>Add New Transaction</h1>
          <p className="form-subtitle">Record your income or expense</p>

          <form className="add-form" onSubmit={handleSubmit}>
            {/* Type Toggle */}
            <div className="type-toggle-full">
              <button
                type="button"
                className={`type-btn-full ${formData.type === "income" ? "active income" : ""}`}
                onClick={() => setFormData((p) => ({ ...p, type: "income", category: "" }))}
              >
                <FiTrendingUp /> Income
              </button>
              <button
                type="button"
                className={`type-btn-full ${formData.type === "expense" ? "active expense" : ""}`}
                onClick={() => setFormData((p) => ({ ...p, type: "expense", category: "" }))}
              >
                <FiTrendingDown /> Expense
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label><FiFileText /> Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Grocery shopping"
                  required
                />
              </div>

              <div className="form-group">
                <label><FiDollarSign /> Amount (₹) *</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label><FiTag /> Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select category</option>
                  {CATEGORIES[formData.type].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label><FiCalendar /> Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label><FiFileText /> Note (optional)</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Add a note..."
                rows="3"
              />
            </div>

            <button
              type="submit"
              className={`submit-btn-full ${formData.type}`}
              disabled={loading}
            >
              {loading ? "Adding..." : `Add ${formData.type === "income" ? "Income" : "Expense"}`}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
