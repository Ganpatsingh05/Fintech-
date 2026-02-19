// ==============================
// Mock Data Seeder — Push sample transactions to Firestore
// ==============================
// Usage: Import and call `seedMockData(db, uid)` from a component
// or run via a temporary button in the app.

import { collection, addDoc } from "firebase/firestore";

const MOCK_TRANSACTIONS = [
  // --- Income ---
  {
    title: "Monthly Salary",
    amount: 75000,
    type: "income",
    category: "Salary",
    date: "2025-01-25",
    note: "January salary credit",
  },
  {
    title: "Freelance Web Project",
    amount: 15000,
    type: "income",
    category: "Freelance",
    date: "2025-01-18",
    note: "React dashboard project",
  },
  {
    title: "Dividend Payout",
    amount: 3200,
    type: "income",
    category: "Investments",
    date: "2025-01-10",
    note: "Quarterly dividend",
  },
  {
    title: "Birthday Gift",
    amount: 5000,
    type: "income",
    category: "Gifts",
    date: "2025-01-05",
    note: "From uncle",
  },
  {
    title: "February Salary",
    amount: 75000,
    type: "income",
    category: "Salary",
    date: "2025-02-25",
    note: "February salary credit",
  },
  {
    title: "Consulting Fee",
    amount: 8000,
    type: "income",
    category: "Freelance",
    date: "2025-02-12",
    note: "UI/UX review for startup",
  },
  {
    title: "Stock Sale Profit",
    amount: 12000,
    type: "income",
    category: "Investments",
    date: "2025-03-03",
    note: "Sold NIFTY shares",
  },
  {
    title: "March Salary",
    amount: 75000,
    type: "income",
    category: "Salary",
    date: "2025-03-25",
    note: "March salary credit",
  },

  // --- Expenses ---
  {
    title: "Monthly Rent",
    amount: 18000,
    type: "expense",
    category: "Rent",
    date: "2025-01-01",
    note: "January rent",
  },
  {
    title: "Grocery Shopping",
    amount: 4500,
    type: "expense",
    category: "Food & Dining",
    date: "2025-01-04",
    note: "Big basket weekly order",
  },
  {
    title: "Electricity Bill",
    amount: 2200,
    type: "expense",
    category: "Bills & Utilities",
    date: "2025-01-07",
    note: "December bill",
  },
  {
    title: "Cab Rides",
    amount: 1800,
    type: "expense",
    category: "Transport",
    date: "2025-01-12",
    note: "Uber rides for the week",
  },
  {
    title: "New Running Shoes",
    amount: 3500,
    type: "expense",
    category: "Shopping",
    date: "2025-01-15",
    note: "Nike Air Max",
  },
  {
    title: "Movie Night",
    amount: 800,
    type: "expense",
    category: "Entertainment",
    date: "2025-01-20",
    note: "IMAX tickets + snacks",
  },
  {
    title: "Doctor Visit",
    amount: 1500,
    type: "expense",
    category: "Health",
    date: "2025-01-22",
    note: "General checkup",
  },
  {
    title: "Online Course",
    amount: 2999,
    type: "expense",
    category: "Education",
    date: "2025-01-28",
    note: "Udemy advanced React course",
  },
  {
    title: "February Rent",
    amount: 18000,
    type: "expense",
    category: "Rent",
    date: "2025-02-01",
    note: "February rent",
  },
  {
    title: "Swiggy Orders",
    amount: 3200,
    type: "expense",
    category: "Food & Dining",
    date: "2025-02-05",
    note: "Week of food delivery",
  },
  {
    title: "Internet Bill",
    amount: 999,
    type: "expense",
    category: "Bills & Utilities",
    date: "2025-02-08",
    note: "Jio Fiber monthly",
  },
  {
    title: "Weekend Trip",
    amount: 8500,
    type: "expense",
    category: "Travel",
    date: "2025-02-14",
    note: "Valentine's day getaway to Lonavala",
  },
  {
    title: "Gym Membership",
    amount: 2000,
    type: "expense",
    category: "Health",
    date: "2025-02-20",
    note: "Monthly gym fee",
  },
  {
    title: "Amazon Shopping",
    amount: 4200,
    type: "expense",
    category: "Shopping",
    date: "2025-03-02",
    note: "Electronics & accessories",
  },
  {
    title: "March Rent",
    amount: 18000,
    type: "expense",
    category: "Rent",
    date: "2025-03-01",
    note: "March rent",
  },
  {
    title: "Restaurant Dinner",
    amount: 2800,
    type: "expense",
    category: "Food & Dining",
    date: "2025-03-10",
    note: "Family dinner at Barbeque Nation",
  },
  {
    title: "Metro Card Recharge",
    amount: 500,
    type: "expense",
    category: "Transport",
    date: "2025-03-12",
    note: "Monthly metro pass",
  },
];

/**
 * Seeds mock transactions for a user in Firestore.
 * @param {object} db - Firestore database instance
 * @param {string} uid - The authenticated user's UID
 * @returns {Promise<number>} Number of documents added
 */
export async function seedMockData(db, uid) {
  const colRef = collection(db, `users/${uid}/transactions`);
  let count = 0;

  for (const txn of MOCK_TRANSACTIONS) {
    await addDoc(colRef, {
      ...txn,
      createdAt: new Date(txn.date).toISOString(),
    });
    count++;
  }

  return count;
}

export default MOCK_TRANSACTIONS;
