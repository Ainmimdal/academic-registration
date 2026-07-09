# UiTM Academic Registration System (Frontend Prototype)

This is a web-based, highly interactive frontend prototype simulating the UiTM Academic Registration System. It serves as a presentation tool to demonstrate the academic registration flow from multiple user perspectives: Student, Academic Advisor, and Administrator.

## Tech Stack

* **Framework:** React via Vite
* **Styling:** Tailwind CSS v3
* **Routing:** React Router v6
* **Animations:** Framer Motion
* **State Management:** React Context API with `useReducer`

Note: This is a frontend-only prototype. All data is mocked locally within the app state and does not persist across browser reloads.

## Getting Started

To run this project locally, ensure you have Node.js installed, then follow these steps:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open the app:**

   Navigate to `http://localhost:5173` in your web browser.

## How to Demo User Roles

Because this prototype lacks a real backend authentication server, a "magic login" system is used to route you to different dashboards based on the User ID you enter. Any password will be accepted.

From the Login screen, enter one of the following as the **Student ID / User ID**:

* **Student Flow:** Enter `demo_student` or any random string.
  * Features: View dashboard, browse course catalog, register for classes, validate selections against academic rules such as credit limits and prerequisites, and view generated timetables or fee slips.
* **Lecturer / Advisor Flow:** Enter `demo_advisor` or `demo_lecturer`.
  * Features: View the advisor dashboard and approve or reject pending student course registrations.
* **Admin Flow:** Enter `demo_admin`.
  * Features: View the system-wide administrator dashboard, monitor active registrations, and access the reports portal.

## Printing Support

The **Fee Status** and **Registration Slip** pages have dedicated print stylesheets using `@media print`. Try pressing `Ctrl+P` or `Cmd+P` on Mac on those pages to see how the UI transforms into a clean, formal document suitable for physical printing, hiding the navigation sidebars and top bars.
