// ==============================
// Filters — Search & Filter Transactions
// ==============================
// Search by title, filter by type (all/income/expense),
// filter by category, and sort by date/amount.

import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import "./Filters.css";

const ALL_CATEGORIES = [
  "All",
  "Salary",
  "Freelance",
  "Investments",
  "Business",
  "Gifts",
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
];

export default function Filters({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "all",
      category: "All",
      sortBy: "date-desc",
    });
  };

  const hasActiveFilters =
    filters.search || filters.type !== "all" || filters.category !== "All" || filters.sortBy !== "date-desc";

  return (
    <div className="filters-container">
      {/* Search Bar */}
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
        {filters.search && (
          <button className="clear-search" onClick={() => handleChange("search", "")}>
            <FiX />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        {/* Type Filter */}
        <div className="filter-group">
          <div className="filter-pills">
            {["all", "income", "expense"].map((type) => (
              <button
                key={type}
                className={`pill ${filters.type === type ? `active ${type}` : ""}`}
                onClick={() => handleChange("type", type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <select
          className="filter-select"
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          {ALL_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="filter-select"
          value={filters.sortBy}
          onChange={(e) => handleChange("sortBy", e.target.value)}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button className="clear-filters" onClick={clearFilters}>
            <FiFilter />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
