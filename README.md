## 🚀 Automation Hub – Backend MVP

Automation Hub is a full stack automation and productivity system built
for small businesses, such as barbers, mechanics, bakers, freelancers,
and other micro-entrepreneurs.
The goal is to offer professional budgeting, organization, and
simplicity, even for non-technical users.

📌 Project Status

This repository currently includes the Backend MVP, built fully from
scratch with real-world logic and secure structures.

✔ Authentication complete
✔ Estimates module (full CRUD + ownership validation)
✔ PostgreSQL + Prisma stable
⬜ Templates module
⬜ Appointments module
⬜ PDF generation
⬜ AI text generation

🧩 MVP Features

🔐 Authentication

-   Register
-   Login
-   JWT-protected routes
-   Password hashing (bcrypt)

📄 Estimates (Budgets)

-   Create estimate
-   List all estimates
-   Get estimate by ID
-   Update estimate
-   Delete estimate
-   User ownership validation
-   Ready for PDF generation

🛠 Tech Stack

-   Node + Express
-   Prisma ORM
-   PostgreSQL
-   JWT
-   bcrypt
-   pdfkit (coming soon)
-   OpenAI API (coming soon)

📁 Folder Structure

    backend/
      prisma/
        schema.prisma
      src/
        server.js
        middlewares/
        routes/
        controllers/
        services/

🗺 Roadmap

Completed

-   Backend setup
-   PostgreSQL connection
-   Auth system
-   Estimates CRUD

In Progress

-   Templates
-   Appointments
-   PDF builder
-   AI assist

Upcoming

-   React dashboard
-   Business profile setup
-   English / Portuguese switch
-   Advanced UI/UX polish

✍️ Developer Notes

This project is being built in freestyle mode, with a focus on real
skill development, backend understanding, database architecture, and
clean authentication flows.

More updates soon.
