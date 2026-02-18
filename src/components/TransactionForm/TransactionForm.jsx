// ==============================
// TransactionForm — Add/Edit Transaction Modal
// ==============================
// A modal form for creating and editing transactions with
// fields: title, amount, type (income/expense), category, date.

import { useState, useEffect } from "react";
import { FiX, FiDollarSign, FiTag, FiCalendar, FiFileText } from "react-icons/fi";
import "./TransactionForm.css";

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

export default function TransactionForm({ isOpen, onClose, onSubmit, editData }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        amount: editData.amount || "",
        type: editData.type || "expense",
        category: editData.category || "",
        date: editData.date || new Date().toISOString().split("T")[0],
        note: editData.note || "",
      });
    } else {
      setFormData({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: new Date().toISOString().split("T")[0],
        note: "",
      });
    }
  }, [editData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === "type" ? { category: "" } : {}),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editData ? "Edit Transaction" : "Add Transaction"}</h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form className="transaction-form" onSubmit={handleSubmit}>
          {/* Type Toggle */}
          <div className="type-toggle">
            <button
              type="button"
              className={`type-btn ${formData.type === "income" ? "active income" : ""}`}
              onClick={() => setFormData((p) => ({ ...p, type: "income", category: "" }))}
            >
              Income
            </button>
            <button
              type="button"
              className={`type-btn ${formData.type === "expense" ? "active expense" : ""}`}
              onClick={() => setFormData((p) => ({ ...p, type: "expense", category: "" }))}
            >
              Expense
            </button>
          </div>

          {/* Title */}
          <div className="form-group">
            <label>
              <FiFileText /> Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Grocery shopping"
              required
            />
          </div>

          {/* Amount */}
          <div className="form-group">
            <label>
              <FiDollarSign /> Amount (₹)
            </label>
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

          {/* Category */}
          <div className="form-group">
            <label>
              <FiTag /> Category
            </label>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select category</option>
              {CATEGORIES[formData.type].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label>
              <FiCalendar /> Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Note */}
          <div className="form-group">
            <label>
              <FiFileText /> Note (optional)
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add a note..."
              rows="2"
            />
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={`btn-submit ${formData.type}`}>
              {editData ? "Update" : "Add"} Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
