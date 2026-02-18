// ==============================
// TransactionList — Displays All Transactions
// ==============================
// Shows transactions as styled cards with edit/delete actions,
// category icons, and color-coded amounts.

import {
  FiEdit2,
  FiTrash2,
  FiShoppingCart,
  FiTruck,
  FiHome,
  FiHeart,
  FiBook,
  FiFilm,
  FiZap,
  FiGlobe,
  FiBriefcase,
  FiGift,
  FiDollarSign,
  FiCoffee,
  FiTrendingUp,
  FiMoreHorizontal,
} from "react-icons/fi";
import "./TransactionList.css";

// Category icon mapping
const CATEGORY_ICONS = {
  "Food & Dining": FiCoffee,
  Transport: FiTruck,
  Shopping: FiShoppingCart,
  "Bills & Utilities": FiZap,
  Entertainment: FiFilm,
  Health: FiHeart,
  Education: FiBook,
  Rent: FiHome,
  Travel: FiGlobe,
  Salary: FiBriefcase,
  Freelance: FiBriefcase,
  Investments: FiTrendingUp,
  Business: FiBriefcase,
  Gifts: FiGift,
  Other: FiMoreHorizontal,
};

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getCategoryIcon = (category) => {
    const Icon = CATEGORY_ICONS[category] || FiDollarSign;
    return <Icon />;
  };

  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <h3>No transactions yet</h3>
        <p>Start by adding your first income or expense</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {transactions.map((t) => (
        <div key={t.id} className={`transaction-card ${t.type}`}>
          <div className={`transaction-icon ${t.type}`}>
            {getCategoryIcon(t.category)}
          </div>

          <div className="transaction-details">
            <h4 className="transaction-title">{t.title}</h4>
            <div className="transaction-meta">
              <span className="transaction-category">{t.category}</span>
              <span className="transaction-date">{formatDate(t.date)}</span>
            </div>
            {t.note && <p className="transaction-note">{t.note}</p>}
          </div>

          <div className="transaction-right">
            <span className={`transaction-amount ${t.type}`}>
              {t.type === "income" ? "+" : "-"}
              {formatCurrency(t.amount)}
            </span>

            <div className="transaction-actions">
              <button
                className="action-btn edit"
                onClick={() => onEdit(t)}
                title="Edit"
              >
                <FiEdit2 />
              </button>
              <button
                className="action-btn delete"
                onClick={() => onDelete(t.id)}
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
