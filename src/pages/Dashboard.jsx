// ==============================
// Dashboard Page — Main Finance Dashboard
// ==============================
// Combines SummaryCards, Charts, Filters, TransactionList,
// TransactionForm (modal), and a floating add button.
// Uses Firebase Realtime Database for persistent data storage.

import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { ref, push, update, remove, onValue } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

// Components
import DashboardLayout from "../components/Layout/DashboardLayout";
import SummaryCards from "../components/SummaryCards/SummaryCards";
import Charts from "../components/Charts/Charts";
import Filters from "../components/Filters/Filters";
import TransactionList from "../components/TransactionList/TransactionList";
import TransactionForm from "../components/TransactionForm/TransactionForm";

import { FiPlus, FiBarChart2 } from "react-icons/fi";
import "./Dashboard.css";

export default function Dashboard() {
  const { currentUser } = useAuth();
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

  // User-specific database path
  const userPath = `transactions/${currentUser?.uid}`;

  // ---- Realtime Database listener ----
  useEffect(() => {
    if (!currentUser) return;
    const transactionsRef = ref(db, userPath);
    const unsubscribe = onValue(transactionsRef, (snapshot) => {
      const data = snapshot.val();
      const list = data
        ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
        : [];
      // Sort by date descending by default
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser, userPath]);

  // ---- Add Transaction ----
  const handleAdd = async (formData) => {
    try {
      const transactionsRef = ref(db, userPath);
      await push(transactionsRef, {
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
      const transactionRef = ref(db, `${userPath}/${editData.id}`);
      await update(transactionRef, formData);
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
      const transactionRef = ref(db, `${userPath}/${id}`);
      await remove(transactionRef);
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

  const floatingContent = !loading && (
    <>
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
  );

  return (
    <DashboardLayout floatingContent={floatingContent}>
      <div className="dashboard-page">
        {/* Page Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Finance Dashboard <FiBarChart2 className="title-icon" />
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
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
