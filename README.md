# FinTrack — Personal Finance Tracker

A modern, feature-rich personal finance dashboard built with **React** and **Firebase**. Track income, expenses, and spending patterns with beautiful charts, glassmorphism UI, and real-time data sync.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12.9-FFCA28?logo=firebase&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel&logoColor=white)

---

## Features

- **Dashboard Overview** — Summary cards showing total balance, income & expenses at a glance
- **Add / Edit / Delete Transactions** — Full CRUD with modal form & standalone page
- **Real-time Sync** — Firebase Realtime Database with instant updates across devices
- **Interactive Charts** — Pie chart (expense breakdown), Bar chart (monthly trends), Area chart (spending trend), Savings gauge
- **Smart Filters & Search** — Filter by type, category, sort by date/amount, text search
- **Dark / Light Mode** — Toggle with localStorage persistence
- **Firebase Authentication** — Secure email/password login with per-user data isolation
- **Responsive Design** — Optimized for desktop, tablet & mobile screens
- **Glassmorphism UI** — Premium frosted-glass cards, animated gradients, floating orbs
- **Toast Notifications** — Feedback on every action (add, edit, delete, errors)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, React Router 7, Recharts, React Icons |
| Backend | Firebase Realtime Database, Firebase Auth |
| Styling | Custom CSS (Glassmorphism, CSS Variables, Animations) |
| Build | Vite 7 |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/
│   ├── Auth/           # PrivateRoute (route protection)
│   ├── Charts/         # Pie, Bar, Area charts + Savings gauge
│   ├── Filters/        # Search, type pills, category & sort dropdowns
│   ├── Layout/         # DashboardLayout wrapper
│   ├── Navbar/         # Top nav with logo, links, theme toggle, avatar
│   ├── SummaryCards/   # Balance, Income, Expense cards
│   ├── TransactionForm/# Modal form for add/edit
│   └── TransactionList/# Transaction cards with edit/delete actions
├── context/
│   ├── AuthContext.jsx # Firebase Auth state management
│   └── ThemeContext.jsx# Dark/Light mode provider
├── firebase/
│   └── firebaseConfig.js # Firebase initialization
├── pages/
│   ├── Dashboard.jsx   # Main dashboard page
│   ├── AddTransaction.jsx # Standalone add form page
│   └── Login.jsx       # Email/password login page
├── App.jsx             # Routes & providers
├── main.jsx            # Entry point with BrowserRouter
├── index.css           # Global styles & CSS variables
└── App.css             # Layout utilities
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Firebase project with Realtime Database & Authentication enabled

### Installation

```bash
# Clone the repo
git clone https://github.com/Ganpatsingh05/Fintech-.git
cd Fintech-

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password
3. Create a **Realtime Database** (set rules to allow authenticated users)
4. Copy your config to `src/firebase/firebaseConfig.js`

---

## Screenshots

| Light Mode | Dark Mode |
|:---:|:---:|
| Dashboard with glassmorphism cards | Elegant dark theme with gradient orbs |

---

## Key Highlights

- **Clean Component Architecture** — Each feature in its own folder with dedicated CSS
- **React Hooks** — `useState`, `useEffect`, `useMemo`, `useContext` used throughout
- **Custom Hooks** — `useIsMobile()` for responsive chart sizing, `useAuth()` & `useTheme()` context hooks
- **Per-User Data** — Transactions stored at `transactions/{uid}/` for complete isolation
- **No UI Library** — All styling is hand-crafted CSS with CSS variables for theming
- **Smooth Animations** — `fadeInUp`, staggered card reveals, gauge fill, gradient shimmer

---

## Deployment

The app is deployed on **Vercel** with automatic redeployment on every push to `main`.

---

## Author

**Ganpatsingh** — [GitHub](https://github.com/Ganpatsingh05)

---

## License

This project is for educational purposes.
