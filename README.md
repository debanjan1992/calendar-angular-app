# 📅 Angular Calendar Application


A robust, feature-rich calendar application built with **Angular** and **NgRx**. This project replicates core functionalities of popular calendar tools (like Google Calendar), demonstrating complex state management, date manipulation, and reactive UI updates within an Nx monorepo architecture.

## 🚀 Live Demo
**[View the Live Application](https://debanjan1992.github.io/calendar-angular-app/)**

---

## ✨ Key Features

* **📅 Interactive Calendar View:**
    * Seamless navigation between Days, Months, and Years.
    * Dynamic grid generation based on the selected view.
    * Current day highlighting.
* **✅ Task Management (CRUD):**
    * **Create:** Add new tasks to specific dates.
    * **Read:** View daily tasks in a clean list format.
    * **Update:** Edit task details.
    * **Delete:** Remove unwanted tasks.
* **📝 Status Tracking:** Mark tasks as "Complete" or "Incomplete" with visual feedback.
* **⚡ Auto-Generate:** Includes a utility to generate sample tasks for testing layouts and performance.

---

## 🛠️ Tech Stack

* **Framework:** Angular
* **State Management:** NgRx (Redux pattern) / SignalStore
* **UI Component Library:** PrimeNG
* **Styling:** SCSS / CSS Grid
* **Build System:** Nx (Monorepo tooling)
* **Hosting:** GitHub Pages

---

## 📸 Screenshots

| Calendar View | Task Management |
|:---:|:---:|
| *[Insert Screenshot of Calendar Grid]* | *[Insert Screenshot of Task Modal]* |

---

## 🏃‍♂️ Getting Started

This project was generated using [Nx](https://nx.dev).

### Prerequisites
* Node.js (v18+)
* npm or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/debanjan1992/calendar-angular-app.git](https://github.com/debanjan1992/calendar-angular-app.git)
    cd calendar-angular-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Run the application:**
    ```bash
    npx nx serve
    ```
    Navigate to `http://localhost:4200/`.

---

## 🏗️ Architecture Highlights

* **Reactive State:** Uses NgRx to handle the complex state of selected dates and task lists, ensuring the UI is always in sync with the data.
* **Modular Design:** Features are split into logical modules (Calendar, Tasks, Shared) for better maintainability and lazy loading.
* **Date Handling:** Robust manipulation of date objects to handle leap years, month overflows, and precise navigation.


