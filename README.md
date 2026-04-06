# Zorvyn Finance Dashboard UI - Assesment

Interactive finance dashboard for my Internship Assignment at Zorvyn.

## Demo & Repository
- **Project Name**: Finance Dashboard UI
- **Name**: Abdulqoyum Amuda

## Key Features

### Comprehensive Dashboard
- **Financial Summary**: Real-time tracking of Total Balance, Income, and Expenses with trend indicators.
- **Dynamic Visualizations**: 
    - Area Chart for balance trends over time.
    - Donut Chart for categorical spending breakdown.
- **Smart Insights**: Automated observations about savings rates and top spending categories.

### Transaction Management
- **Full CRUD**: Add, edit, and delete transactions (Admin only).
- **Search & Filtering**: Search by description/category; filter by transaction type (Income/Expense).
- **Sorting**: Multi-column sorting by Date and Amount.

### Role-Based UI (Frontend RBAC)
- **Viewer Role**: Read-only access to all dashboard data and transaction history.
- **Admin Role**: Full management capabilities with a streamlined "Add Transaction" workflow.
- **Live Toggle**: Seamlessly switch between roles using the persistent Navbar toggle.

### Premium UI/UX
- **Modern Aesthetics**: Glassmorphism effects, a sophisticated Emerald/Indigo color palette, and high-quality typography.
- **Responsive Design**: Fluid transitions between desktop and mobile layouts.
- **Dark Mode**: Fully integrated dark theme support with smooth color-scheme persistence.
- **Animations**: Subtle micro-interactions and layout transitions via Framer Motion.

## Tech Stack
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Navigation**: React Router 7

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   cd <project-folder>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

<!-- 4. **Build for production**:
   ```bash
   npm run build
   ``` -->

## Design Decisions

### 1. State Management
I chose **Zustand** over Redux or Context API because it offers a boilerplate free way to share state across componentsand it's built in `persist` middleware is required for data persistence in the localStorage. O rismply because i feel comfortable when i use what i know best to build apps.

### 1. State Management
I chose **Zustand** over Redux or Context API because it offers a boilerplate free way to share state across componentsand it's built in `persist` middleware is required for data persistence in the localStorage. O rismply because i feel comfortable when i use what i know best to build apps.

### 2. Styling
I Used **Tailwind v4** for component styling using `@layer` and custom CSS variables for theme tokens (Emerald for success/income, Rose for alert/expenses).

### 3. Progressive Role Simulation
Instead of a separate login page, I implemented a Role Switcher featiure in the Navbar because it will allow the reviewer to immediately see the UI differences (Add/Edit buttons appearing/disappearing) without navigating through multiple pages.

### 4. Data
The mock data includes over 20 transactions across 8 categories, ensuring the charts show meaningful variations rather than just "flat" lines.
