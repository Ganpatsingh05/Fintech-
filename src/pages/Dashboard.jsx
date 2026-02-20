import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

import DashboardLayout from "../components/Layout/DashboardLayout";
import SummaryCards from "../components/SummaryCards/SummaryCards";
import Charts from "../components/Charts/Charts";
import Filters from "../components/Filters/Filters";
import TransactionList from "../components/TransactionList/TransactionList";
import TransactionForm from "../components/TransactionForm/TransactionForm";

import { FiPlus, FiBarChart2, FiDatabase } from "react-icons/fi";
import { seedMockData } from "../utils/seedMockData";
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

  const userCollectionPath = `users/${currentUser?.uid}/transactions`;

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, userCollectionPath),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [currentUser, userCollectionPath]);

  const handleAdd = async (formData) => {
    try {
      await addDoc(collection(db, userCollectionPath), {
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

  const handleEdit = (transaction) => {
    setEditData(transaction);
    setFormOpen(true);
  };

  const handleUpdate = async (formData) => {
    try {
      const transactionRef = doc(db, userCollectionPath, editData.id);
      await updateDoc(transactionRef, formData);
      toast.success("Transaction updated!");
      setFormOpen(false);
      setEditData(null);
    } catch (err) {
      toast.error("Failed to update transaction");
      console.error(err);
    }
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

  const [seeding, setSeeding] = useState(false);
  const handleSeedData = async () => {
    if (!currentUser) return;
    if (!window.confirm("This will add 25 sample transactions. Continue?")) return;
    setSeeding(true);
    try {
      const count = await seedMockData(db, currentUser.uid);
      toast.success(`Added ${count} mock transactions!`);
    } catch (err) {
      toast.error("Failed to seed mock data");
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          (t.note && t.note.toLowerCase().includes(q))
      );
    }

    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.category !== "All") {
      result = result.filter((t) => t.category === filters.category);
    }

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
        <div className="dash-decor">
          <span className="dash-orbit o1" />
          <span className="dash-orbit o2" />
          <span className="dash-orbit o3" />
          <span className="dash-dot-grid dg1" />
          <span className="dash-dot-grid dg2" />
          <span className="dash-shape hex" />
          <span className="dash-shape tri" />
          <span className="dash-shape circle-fill" />
          <span className="dash-shape plus-mark" />
          <span className="dash-curve" />
          <span className="dash-wave" />
        </div>

        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              BudgetBuddy <FiBarChart2 className="title-icon" />
            </h1>
            <p className="dashboard-subtitle">Your smart companion for smarter spending</p>
          </div>
          {transactions.length === 0 && !loading && (
            <button
              className="seed-btn"
              onClick={handleSeedData}
              disabled={seeding}
            >
              <FiDatabase /> {seeding ? "Seeding..." : "Add Sample Data"}
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading-state">
            <p>Loading transactions...</p>
          </div>
        ) : (
          <>
            <SummaryCards transactions={transactions} />

            <Charts transactions={transactions} />

            <div className="section-header">
              <h2>Recent Transactions</h2>
              <span className="transaction-count">
                {Math.min(filteredTransactions.length, 5)} of {filteredTransactions.length} {filteredTransactions.length === 1 ? "entry" : "entries"}
              </span>
            </div>
            <Filters filters={filters} setFilters={setFilters} />

            <TransactionList
              transactions={filteredTransactions.slice(0, 5)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {filteredTransactions.length > 5 && (
              <div className="view-all-wrapper">
                <button className="view-all-btn" onClick={() => window.location.href = '/add-transaction'}>
                  View All Transactions
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
