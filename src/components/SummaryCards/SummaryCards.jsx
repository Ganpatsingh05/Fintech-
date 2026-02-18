// ==============================
// SummaryCards — Balance, Income, Expense
// ==============================
// Displays three cards showing total balance, income, and expenses.

import { FiTrendingUp, FiTrendingDown, FiDollarSign } from "react-icons/fi";
import "./SummaryCards.css";

export default function SummaryCards({ transactions }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="summary-cards">
      <div className="summary-card balance">
        <div className="summary-icon-wrapper balance-icon">
          <FiDollarSign />
        </div>
        <div className="summary-info">
          <p className="summary-label">Total Balance</p>
          <h2 className={`summary-amount ${balance >= 0 ? "positive" : "negative"}`}>
            {formatCurrency(balance)}
          </h2>
        </div>
      </div>

      <div className="summary-card income">
        <div className="summary-icon-wrapper income-icon">
          <FiTrendingUp />
        </div>
        <div className="summary-info">
          <p className="summary-label">Total Income</p>
          <h2 className="summary-amount positive">{formatCurrency(income)}</h2>
        </div>
      </div>

      <div className="summary-card expense">
        <div className="summary-icon-wrapper expense-icon">
          <FiTrendingDown />
        </div>
        <div className="summary-info">
          <p className="summary-label">Total Expenses</p>
          <h2 className="summary-amount negative">{formatCurrency(expense)}</h2>
        </div>
      </div>
    </div>
  );
}
