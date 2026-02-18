// ==============================
// Charts — Pie & Bar Charts for Analytics
// ==============================
// Visualizes spending patterns using Recharts.
// Pie chart: category breakdown. Bar chart: monthly trends.

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
} from "recharts";
import { useTheme } from "../../context/ThemeContext";
import "./Charts.css";

// Vibrant color palette
const COLORS = [
  "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#ec4899",
  "#8b5cf6", "#14b8a6", "#f97316", "#06b6d4", "#84cc16",
];

export default function Charts({ transactions }) {
  const { darkMode } = useTheme();

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
    .slice(-6); // Last 6 months

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
    <div className="charts-container">
      {/* Pie Chart */}
      {pieData.length > 0 && (
        <div className="chart-card">
          <h3 className="chart-title">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
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
                  <span style={{ color: textColor, fontSize: "0.8rem" }}>{value}</span>
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
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 12 }} />
              <YAxis tick={{ fill: textColor, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span style={{ color: textColor, fontSize: "0.8rem" }}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                )}
              />
              <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
