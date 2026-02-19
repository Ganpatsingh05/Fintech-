// ==============================
// SummaryCards — Balance, Income, Expense
// ==============================
// Displays three cards with minimal geometric line/shape accents.

import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import "./SummaryCards.css";

export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;
  const total = income + expense;
  const incomePercent = total > 0 ? Math.round((income / total) * 100) : 0;
  const expensePercent = total > 0 ? Math.round((expense / total) * 100) : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="summary-cards">
      <div className="summary-card card-balance">
        <div className="card-deco">
          <span className="geo-line l1" />
          <span className="geo-line l2" />
          <span className="geo-line l3" />
          <span className="geo-corner" />
          <span className="geo-ring r1" />
          <span className="geo-ring r2" />
          <span className="geo-ring r3" />
          <span className="geo-arc" />
          <span className="geo-dots" />
          <span className="geo-cross" />
          <span className="geo-diamond" />
        </div>
        <div className="card-content">
          <div className="card-top">
            <div className="card-chip">
              <FiDollarSign />
            </div>
            <span className="card-badge">Net Balance</span>
          </div>
          <h2 className={`card-amount ${balance >= 0 ? "positive" : "negative"}`}>
            {formatCurrency(balance)}
          </h2>
          <div className="card-bottom">
            <div className="mini-stat">
              <FiArrowUpRight className="mini-icon up" />
              <span>{formatCurrency(income)}</span>
            </div>
            <div className="mini-divider" />
            <div className="mini-stat">
              <FiArrowDownRight className="mini-icon down" />
              <span>{formatCurrency(expense)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-card card-income">
        <div className="card-deco">
          <span className="geo-line l1" />
          <span className="geo-line l2" />
          <span className="geo-line l3" />
          <span className="geo-corner" />
          <span className="geo-ring r1" />
          <span className="geo-ring r2" />
          <span className="geo-ring r3" />
          <span className="geo-arc" />
          <span className="geo-dots" />
          <span className="geo-cross" />
          <span className="geo-diamond" />
        </div>
        <div className="card-content">
          <div className="card-top">
            <div className="card-chip">
              <FiTrendingUp />
            </div>
            <span className="card-badge">{incomePercent}%</span>
          </div>
          <p className="card-label">Income</p>
          <h2 className="card-amount positive">{formatCurrency(income)}</h2>
          <div className="card-bottom">
            <div className="mini-stat">
              <span>{incomePercent}% of total</span>
            </div>
            <div className="mini-divider" />
            <div className="mini-stat">
              <span>{transactions.filter(t => t.type === 'income').length} entries</span>
            </div>
          </div>
        </div>
      </div>

      <div className="summary-card card-expense">
        <div className="card-deco">
          <span className="geo-line l1" />
          <span className="geo-line l2" />
          <span className="geo-line l3" />
          <span className="geo-corner" />
          <span className="geo-ring r1" />
          <span className="geo-ring r2" />
          <span className="geo-ring r3" />
          <span className="geo-arc" />
          <span className="geo-dots" />
          <span className="geo-cross" />
          <span className="geo-diamond" />
        </div>
        <div className="card-content">
          <div className="card-top">
            <div className="card-chip">
              <FiTrendingDown />
            </div>
            <span className="card-badge">{expensePercent}%</span>
          </div>
          <p className="card-label">Expenses</p>
          <h2 className="card-amount negative">{formatCurrency(expense)}</h2>
          <div className="card-bottom">
            <div className="mini-stat">
              <span>{expensePercent}% of total</span>
            </div>
            <div className="mini-divider" />
            <div className="mini-stat">
              <span>{transactions.filter(t => t.type === 'expense').length} entries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
