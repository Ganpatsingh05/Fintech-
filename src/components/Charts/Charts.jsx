// ==============================
// Charts — Pie & Bar Charts for Analytics
// ==============================
// Visualizes spending patterns using Recharts.
// Pie chart: category breakdown. Bar chart: monthly trends.

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";
import "./Charts.css";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

// Warm, handpicked color palette
const COLORS = [
  "#4a6fa5", "#3a9e8a", "#d08c40", "#c8574f", "#b07ab0",
  "#7a8cc2", "#5bbfa8", "#d9a05c", "#5b9ab5", "#8fa858",
];

export default function Charts({ transactions }) {
  const { darkMode } = useTheme();
  const isMobile = useIsMobile();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const savingsRate = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

  // --- Pie Chart Data: Category breakdown for expenses ---
  const expenseByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const pieData = Object.entries(expenseByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Top 3 expense categories
  const topCategories = pieData.slice(0, 3);

  // --- Bar Chart Data: Monthly income vs expense ---
  const monthlyData = transactions.reduce((acc, t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
    if (!acc[key]) acc[key] = { month: label, income: 0, expense: 0 };
    acc[key][t.type] += Number(t.amount);
    return acc;
  }, {});

  const barData = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v)
    .slice(-6);

  // --- Area Chart Data: Daily spending trend (last 30 days) ---
  const dailySpending = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      const day = new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      acc[t.date] = (acc[t.date] || 0) + Number(t.amount);
      return acc;
    }, {});

  const areaData = Object.entries(dailySpending)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .slice(-15)
    .map(([date, amount]) => ({
      day: new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      amount,
    }));

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(value);

  const textColor = darkMode ? "#9ca3af" : "#6b7280";
  const gridColor = darkMode ? "#374151" : "#e5e7eb";

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;
    return (
      <div className="chart-tooltip">
        {label && <p className="tooltip-label">{label}</p>}
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  if (transactions.length === 0) return null;

  return (
    <>
      {/* Stats row: Savings Rate + Top Categories */}
      <div className="stats-row">
        {/* Savings Rate Gauge */}
        <div className="stat-card savings-gauge">
          <h3 className="chart-title">Savings Rate</h3>
          <div className="gauge-visual">
            <svg viewBox="0 0 120 80" className="gauge-svg">
              <path
                d="M 10 70 A 50 50 0 0 1 110 70"
                fill="none"
                stroke={darkMode ? "#374151" : "#e5e7eb"}
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M 10 70 A 50 50 0 0 1 110 70"
                fill="none"
                stroke={savingsRate >= 0 ? "#3a9e8a" : "#c8574f"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${Math.min(Math.abs(savingsRate), 100) * 1.57} 157`}
                className="gauge-fill"
              />
            </svg>
            <div className="gauge-value">
              <span className={savingsRate >= 0 ? "positive" : "negative"}>{savingsRate}%</span>
              <small>of income saved</small>
            </div>
          </div>
        </div>

        {/* Top Spending Categories */}
        <div className="stat-card top-categories">
          <h3 className="chart-title">Top Spending</h3>
          <div className="category-bars">
            {topCategories.map((cat, i) => {
              const pct = expense > 0 ? Math.round((cat.value / expense) * 100) : 0;
              return (
                <div key={cat.name} className="category-bar-item">
                  <div className="category-bar-header">
                    <span className="category-dot" style={{ background: COLORS[i] }} />
                    <span className="category-name">{cat.name}</span>
                    <span className="category-pct">{pct}%</span>
                  </div>
                  <div className="category-bar-track">
                    <div
                      className="category-bar-fill"
                      style={{ width: `${pct}%`, background: COLORS[i] }}
                    />
                  </div>
                  <span className="category-amount">{formatCurrency(cat.value)}</span>
                </div>
              );
            })}
            {topCategories.length === 0 && (
              <p className="no-data-text">No expense data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        {/* Pie Chart */}
        {pieData.length > 0 && (
          <div className="chart-card">
            <h3 className="chart-title">Expense Breakdown</h3>
            <ResponsiveContainer width="100%" height={isMobile ? 210 : 260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 55}
                  outerRadius={isMobile ? 70 : 90}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: textColor, fontSize: "0.75rem" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Bar Chart */}
        {barData.length > 0 && (
          <div className="chart-card">
            <h3 className="chart-title">Monthly Overview</h3>
            <ResponsiveContainer width="100%" height={isMobile ? 210 : 260}>
              <BarChart data={barData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 11 }} />
                <YAxis tick={{ fill: textColor, fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  formatter={(value) => (
                    <span style={{ color: textColor, fontSize: "0.75rem" }}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </span>
                  )}
                />
                <Bar dataKey="income" fill="#3a9e8a" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" fill="#c8574f" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Spending Trend Area Chart */}
      {areaData.length > 1 && (
        <div className="chart-card area-chart-card">
          <h3 className="chart-title">Spending Trend</h3>
          <ResponsiveContainer width="100%" height={isMobile ? 160 : 200}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" tick={{ fill: textColor, fontSize: 11 }} />
              <YAxis tick={{ fill: textColor, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                name="Spending"
                stroke="#d08c40"
                strokeWidth={2.5}
                fill="rgba(208, 140, 64, 0.15)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}
