# Modern-Responsive-Dashboard-UI


# User Management Dashboard  

A responsive and modern **React + TypeScript + Tailwind CSS Dashboard** that includes User Cards, Invoices, Contacts, and Email Management.  
This project demonstrates **state management, API integration, CRUD operations, and reusable UI components** for a real-world application.  

---

## 🚀 Features  

- **User Card Component**
  - Display Name, Email, Role, and Status  
  - Toggle between Active/Inactive  
  - Edit & Delete options with confirmation modal  

- **Data Management**
  - Fetch users from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)  
  - `useState` & `useEffect` for state handling  
  - Error handling & skeleton loader for smooth UX  

- **Invoices**
  - Display list of invoices with **Tamil Nadu styled names**  
  - Status badges (Paid / Unpaid) with distinct Tailwind colors  

- **Contacts**
  - Contact cards with Tamil Nadu names, phone numbers, and company info  
  - Status indicators (Active/Inactive)  

- **Emails**
  - Email preview cards with sender, subject, time, and status  
  - Starred/Read/Unread functionality  

- **UI/UX**
  - Responsive (mobile-first) design  
  - Tailwind-based hover effects & transitions  
  - Dark mode ready (optional bonus)  

- **Production Considerations**
  - TypeScript interfaces for props & state  
  - Simple error boundary awareness  
  - Unit test (using Jest + React Testing Library) for status toggle & delete modal  
  - Accessibility: semantic HTML, `aria` labels, logical focus order
 

* 📂 **Modular Components**: Reusable cards, tables, reports, and notification panels.
* 🎨 **Tailwind Styling**: Responsive design with hover states and transitions.
* ⚡ **Vite + React + TypeScript**: Fast, type-safe, and optimized development setup.
* 📊 **Charts & Reports**: Analytics charts, sales, and profit reports.
* 🔔 **Notification Panel**: Manage alerts and user interactions.
* 📅 **Calendar & Mail**: Integrated productivity features.
* 📱 **Responsive Design**: Works across desktop, tablet, and mobile.

---


---

## 🛠️ Tech Stack  

- **Frontend**: React, TypeScript  
- **Styling**: Tailwind CSS  
- **State Management**: React Hooks (`useState`, `useEffect`, `useContext`)  
- **API**: JSONPlaceholder (for user data)  
- **Testing**: Jest + React Testing Library  

---

---



## 📂 Folder Structure

```bash
src/
├── components/
│   ├── ActivityCard.tsx
│   ├── AnalyticsChart.tsx
│   ├── InvoicesTable.tsx
│   ├── Navbar.tsx
│   ├── NotificationPanel.tsx
│   ├── ProfitCard.tsx
│   ├── SalesReport.tsx
│   └── Sidebar.tsx
│
├── pages/
│   ├── Analytics.tsx
│   ├── Calendar.tsx
│   ├── Contacts.tsx
│   ├── Dashboard.tsx
│   ├── Mail.tsx
│   └── Settings.tsx
│
├── App.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts
```

---

## 🛠️ Tech Stack

* **React 18**
* **TypeScript**
* **Tailwind CSS**
* **Vite**

---

## ⚙️ Installation & Setup

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/your-username/modern-dashboard-ui.git

# Navigate into the project
cd modern-dashboard-ui

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 🧩 Available Pages

* **Dashboard** → Overview of activities, analytics, and reports.
* **Analytics** → Charts and business metrics.
* **Contacts** → Manage user information.
* **Calendar** → Event scheduling.
* **Mail** → Email-like interface.
* **Settings** → Application preferences.

---

## 🧪 Testing

Basic unit tests can be written using **Jest** and **React Testing Library**.
Example test idea:

* Status toggle in user card
* Delete confirmation modal

---

## 📌 Future Enhancements

* ✅ Search & filter functionality
* ✅ Dark mode support
* ✅ Pagination for large datasets
* ✅ API integration for real-time data

---

## 📜 License

This project is licensed under the **MIT License**.

---

👉 Do you want me to also **add screenshots and usage examples** (like `Dashboard Preview.png`) in the README for better presentation on GitHub?


## ⚡ Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/user-dashboard.git
   cd user-dashboard
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the development server

   ```bash
   npm start
   ```

4. Run tests

   ```bash
   npm test
   ```

---

## 🧪 Example Test (Status Toggle)

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "../components/UserCard";

test("toggles user status", () => {
  render(<UserCard name="Hari" email="hari@example.com" role="Admin" status="Active" />);
  
  const toggleButton = screen.getByRole("button", { name: /toggle status/i });
  fireEvent.click(toggleButton);
  
  expect(screen.getByText(/Inactive/i)).toBeInTheDocument();
});
```

---



---

## 👨‍💻 Author

* **Hari Prakash**
* Chennai, Tamil Nadu
* 📧 [hp138644@gmail.com](mailto:hp138644@gmail.com)
* 📱 +91 7598948804

```

