// ==============================
// Filters — Inline Search & Filter Bar
// ==============================
import { FiSearch, FiX } from "react-icons/fi";
import "./Filters.css";

const ALL_CATEGORIES = [
  "All", "Salary", "Freelance", "Investments", "Business", "Gifts",
  "Food & Dining", "Transport", "Shopping", "Bills & Utilities",
  "Entertainment", "Health", "Education", "Rent", "Travel", "Other",
];

export default function Filters({ filters, setFilters }) {
  const set = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

  const clearAll = () =>
    setFilters({ search: "", type: "all", category: "All", sortBy: "date-desc" });

  const active =
    filters.search || filters.type !== "all" || filters.category !== "All" || filters.sortBy !== "date-desc";

  return (
    <div className="filter-bar">
      {/* Search */}
      <div className="fb-search">
        <FiSearch className="fb-search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => set("search", e.target.value)}
        />
        {filters.search && (
          <button className="fb-clear-input" onClick={() => set("search", "")}>
            <FiX />
          </button>
        )}
      </div>

      {/* Type pills */}
      <div className="fb-pills">
        {["all", "income", "expense"].map((t) => (
          <button
            key={t}
            className={`fb-pill ${filters.type === t ? `active ${t}` : ""}`}
            onClick={() => set("type", t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Category */}
      <select className="fb-select" value={filters.category} onChange={(e) => set("category", e.target.value)}>
        {ALL_CATEGORIES.map((c) => (
          <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
        ))}
      </select>

      {/* Sort */}
      <select className="fb-select" value={filters.sortBy} onChange={(e) => set("sortBy", e.target.value)}>
        <option value="date-desc">Newest</option>
        <option value="date-asc">Oldest</option>
        <option value="amount-desc">Highest</option>
        <option value="amount-asc">Lowest</option>
      </select>

      {/* Clear */}
      {active && (
        <button className="fb-clear" onClick={clearAll}>Clear</button>
      )}
    </div>
  );
}
