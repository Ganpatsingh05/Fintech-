import {
  FiEdit2, FiTrash2, FiShoppingCart, FiTruck, FiHome, FiHeart,
  FiBook, FiFilm, FiZap, FiGlobe, FiBriefcase, FiGift,
  FiDollarSign, FiCoffee, FiTrendingUp, FiMoreHorizontal,
} from "react-icons/fi";
import "./TransactionList.css";

const CATEGORY_ICONS = {
  "Food & Dining": FiCoffee, Transport: FiTruck, Shopping: FiShoppingCart,
  "Bills & Utilities": FiZap, Entertainment: FiFilm, Health: FiHeart,
  Education: FiBook, Rent: FiHome, Travel: FiGlobe, Salary: FiBriefcase,
  Freelance: FiBriefcase, Investments: FiTrendingUp, Business: FiBriefcase,
  Gifts: FiGift, Other: FiMoreHorizontal,
};

export default function TransactionList({ transactions, onEdit, onDelete }) {
  const fmt = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amount);

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

  const Icon = (cat) => CATEGORY_ICONS[cat] || FiDollarSign;

  if (!transactions.length) {
    return (
      <div className="tl-empty">
        <span className="tl-empty-ico">📊</span>
        <h3>No transactions yet</h3>
        <p>Add your first income or expense to get started</p>
      </div>
    );
  }

  return (
    <div className="tl-list">
      {transactions.map((t) => {
        const CatIcon = Icon(t.category);
        return (
          <div key={t.id} className="tl-row">
            <div className={`tl-ico ${t.type}`}><CatIcon /></div>
            <div className="tl-info">
              <span className="tl-title">{t.title}</span>
              <span className="tl-meta">
                <span className="tl-cat">{t.category}</span>
                <span className="tl-dot">·</span>
                <span>{fmtDate(t.date)}</span>
              </span>
            </div>
            <span className={`tl-amt ${t.type}`}>
              {t.type === "income" ? "+" : "−"}{fmt(t.amount)}
            </span>
            <div className="tl-actions">
              <button className="tl-btn edit" onClick={() => onEdit(t)} title="Edit"><FiEdit2 /></button>
              <button className="tl-btn del" onClick={() => onDelete(t.id)} title="Delete"><FiTrash2 /></button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
