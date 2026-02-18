// ==============================
// Dashboard Page — Main Finance Dashboard
// ==============================
// Combines SummaryCards, Charts, Filters, TransactionList,
// TransactionForm (modal), and a floating add button.
// Uses local state with demo data for UI preview.

import { useState, useMemo } from "react";
import { toast } from "react-toastify";

// Components
import DashboardLayout from "../components/Layout/DashboardLayout";
import SummaryCards from "../components/SummaryCards/SummaryCards";
import Charts from "../components/Charts/Charts";
import Filters from "../components/Filters/Filters";
import TransactionList from "../components/TransactionList/TransactionList";
import TransactionForm from "../components/TransactionForm/TransactionForm";

import { FiPlus } from "react-icons/fi";
import "./Dashboard.css";

// ---- Demo Transactions for UI Preview ----
const DEMO_TRANSACTIONS = [
  { id: "1", title: "Monthly Salary", amount: 75000, type: "income", category: "Salary", date: "2026-02-01", note: "February salary" },
  { id: "2", title: "Freelance Project", amount: 15000, type: "income", category: "Freelance", date: "2026-02-05", note: "Logo design project" },
  { id: "3", title: "Grocery Shopping", amount: 3200, type: "expense", category: "Food & Dining", date: "2026-02-03", note: "Weekly groceries" },
  { id: "4", title: "Uber Rides", amount: 1500, type: "expense", category: "Transport", date: "2026-02-04", note: "" },
  { id: "5", title: "Netflix Subscription", amount: 649, type: "expense", category: "Entertainment", date: "2026-02-01", note: "Monthly plan" },
  { id: "6", title: "Electricity Bill", amount: 2800, type: "expense", category: "Bills & Utilities", date: "2026-02-06", note: "" },
  { id: "7", title: "Investment Returns", amount: 5000, type: "income", category: "Investments", date: "2026-02-10", note: "Mutual fund dividend" },
  { id: "8", title: "New Sneakers", amount: 4500, type: "expense", category: "Shopping", date: "2026-02-08", note: "Nike Air Max" },
  { id: "9", title: "Gym Membership", amount: 1200, type: "expense", category: "Health", date: "2026-02-01", note: "Monthly fee" },
  { id: "10", title: "Online Course", amount: 2999, type: "expense", category: "Education", date: "2026-02-12", note: "React Masterclass" },
  { id: "11", title: "House Rent", amount: 18000, type: "expense", category: "Rent", date: "2026-02-01", note: "February rent" },
  { id: "12", title: "Birthday Gift", amount: 3000, type: "income", category: "Gifts", date: "2026-02-14", note: "From parents" },
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState(DEMO_TRANSACTIONS);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "All",
    sortBy: "date-desc",
  });

  // ---- Add Transaction (local) ----
  const handleAdd = (formData) => {
    const newTransaction = {
      ...formData,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    toast.success("Transaction added!");
    setFormOpen(false);
  };

  // ---- Edit Transaction ----
  const handleEdit = (transaction) => {
    setEditData(transaction);
    setFormOpen(true);
  };

  const handleUpdate = (formData) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === editData.id ? { ...t, ...formData } : t))
    );
    toast.success("Transaction updated!");
    setFormOpen(false);
    setEditData(null);
  };

  // ---- Delete Transaction ----
  const handleDelete = (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    toast.success("Transaction deleted!");
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
              Hello, User 👋
            </h1>
            <p className="dashboard-subtitle">Here's your financial overview</p>
          </div>
        </div>

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
      </div>
    </DashboardLayout>
  );
}
