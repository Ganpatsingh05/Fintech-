// ==============================
// Dashboard Page — Main Finance Dashboard
// ==============================
// Combines SummaryCards, Charts, Filters, TransactionList,
// TransactionForm (modal), and a floating add button.
// Uses Firebase Firestore for persistent data storage.

import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Components
import DashboardLayout from "../components/Layout/DashboardLayout";
import SummaryCards from "../components/SummaryCards/SummaryCards";
import Charts from "../components/Charts/Charts";
import Filters from "../components/Filters/Filters";
import TransactionList from "../components/TransactionList/TransactionList";
import TransactionForm from "../components/TransactionForm/TransactionForm";

import { FiPlus } from "react-icons/fi";
import "./Dashboard.css";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "All",
    sortBy: "date-desc",
  });

  // ---- Realtime Firestore listener ----
  useEffect(() => {
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ---- Add Transaction ----
  const handleAdd = async (formData) => {
    try {
      await addDoc(collection(db, "transactions"), {
        ...formData,
        createdAt: new Date().toISOString(),
      });
      toast.success("Transaction added!");
      setFormOpen(false);
    } catch (err) {
      toast.error("Failed to add transaction");
      console.error(err);
    }
  };

  // ---- Edit Transaction ----
  const handleEdit = (transaction) => {
    setEditData(transaction);
    setFormOpen(true);
  };

  const handleUpdate = async (formData) => {
    try {
      const docRef = doc(db, "transactions", editData.id);
      await updateDoc(docRef, formData);
      toast.success("Transaction updated!");
      setFormOpen(false);
      setEditData(null);
    } catch (err) {
      toast.error("Failed to update transaction");
      console.error(err);
    }
  };

  // ---- Delete Transaction ----
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await deleteDoc(doc(db, "transactions", id));
      toast.success("Transaction deleted!");
    } catch (err) {
      toast.error("Failed to delete transaction");
      console.error(err);
    }
  };

  // ---- Filter & Sort Logic ----
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          (t.note && t.note.toLowerCase().includes(q))
      );
    }

    // Type filter
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    // Category filter
    if (filters.category !== "All") {
      result = result.filter((t) => t.category === filters.category);
    }

    // Sort
    const [sortField, sortDir] = filters.sortBy.split("-");
    result.sort((a, b) => {
      if (sortField === "date") {
        return sortDir === "desc"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      return sortDir === "desc" ? b.amount - a.amount : a.amount - b.amount;
    });

    return result;
  }, [transactions, filters]);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        {/* Page Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Finance Dashboard 💰
            </h1>
            <p className="dashboard-subtitle">Here's your financial overview</p>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <p>Loading transactions...</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <SummaryCards transactions={transactions} />

            {/* Charts */}
            <Charts transactions={transactions} />

            {/* Filters */}
            <div className="section-header">
              <h2>Transactions</h2>
              <span className="transaction-count">
                {filteredTransactions.length} {filteredTransactions.length === 1 ? "entry" : "entries"}
              </span>
            </div>
            <Filters filters={filters} setFilters={setFilters} />

            {/* Transaction List */}
            <TransactionList
              transactions={filteredTransactions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* Floating Add Button */}
            <button
              className="fab"
              onClick={() => {
                setEditData(null);
                setFormOpen(true);
              }}
              title="Add Transaction"
            >
              <FiPlus />
            </button>

            {/* Transaction Form Modal */}
            <TransactionForm
              isOpen={formOpen}
              onClose={() => {
                setFormOpen(false);
                setEditData(null);
              }}
              onSubmit={editData ? handleUpdate : handleAdd}
              editData={editData}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
