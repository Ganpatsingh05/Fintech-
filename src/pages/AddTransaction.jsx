// ==============================
// AddTransaction Page — Standalone Form Page
// ==============================
// Full-page version of the transaction form for the
// /add-transaction route. Saves transaction to Realtime Database then navigates back.

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/Layout/DashboardLayout";
import TransactionList from "../components/TransactionList/TransactionList";
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
  const [transactions, setTransactions] = useState([]);

  const userCollectionPath = `users/${currentUser?.uid}/transactions`;

  // ---- Firestore real-time listener ----
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, userCollectionPath),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(list);
    });
    return () => unsubscribe();
  }, [currentUser, userCollectionPath]);

  const handleEdit = (transaction) => {
    setFormData({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date,
      note: transaction.note || "",
    });
    setEditingId(transaction.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      const transactionRef = doc(db, userCollectionPath, id);
      await deleteDoc(transactionRef);
      toast.success("Transaction deleted!");
    } catch (err) {
      toast.error("Failed to delete transaction");
      console.error(err);
    }
  };

  const [editingId, setEditingId] = useState(null);
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
      if (editingId) {
        const transactionRef = doc(db, userCollectionPath, editingId);
        await updateDoc(transactionRef, {
          ...formData,
          amount: parseFloat(formData.amount),
        });
        toast.success("Transaction updated!");
        setEditingId(null);
      } else {
        await addDoc(collection(db, userCollectionPath), {
          ...formData,
          amount: parseFloat(formData.amount),
          createdAt: new Date().toISOString(),
        });
        toast.success("Transaction added!");
      }
      setFormData({ title: "", amount: "", type: "expense", category: "", date: new Date().toISOString().split("T")[0], note: "" });
    } catch (err) {
      toast.error(editingId ? "Failed to update transaction" : "Failed to add transaction");
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

        <div className="add-transaction-split">
        <div className="add-form-card">
          <h1>{editingId ? "Edit Transaction" : "Add New Transaction"}</h1>
          <p className="form-subtitle">{editingId ? "Update the details below" : "Record your income or expense"}</p>

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
              {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update Transaction" : `Add ${formData.type === "income" ? "Income" : "Expense"}`}
            </button>
            {editingId && (
              <button
                type="button"
                className="cancel-edit-btn"
                onClick={() => {
                  setEditingId(null);
                  setFormData({ title: "", amount: "", type: "expense", category: "", date: new Date().toISOString().split("T")[0], note: "" });
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="all-transactions-panel">
          <div className="panel-header">
            <h2>All Transactions</h2>
            <span className="transaction-count">{transactions.length} {transactions.length === 1 ? "entry" : "entries"}</span>
          </div>
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
