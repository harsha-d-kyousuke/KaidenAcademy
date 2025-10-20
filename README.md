# Kaiden Academy 🎓

![Build Status](https://img.shields.io/badge/build-in_progress-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech Stack](https://img.shields.io/badge/tech-MERN%20+%20Vite-brightgreen)

**Live Demo:** [**https://kaiden-academy-pzhm.vercel.app/**](https://kaiden-academy-pzhm.vercel.app/)

Kaiden Academy is a life-simulation and learning platform designed for students and developers. Think of it as **"The Sims" meets "LeetCode"**—a gamified environment where you can level up your real-world skills, manage your "digital life," and connect with others.

The project blends social simulation, skill progression, coding challenges, and self-improvement into a single, evolving platform.

## ✨ Features

* 👤 **Evolving User Profile:** A central dashboard that tracks your progress across all modules.
* 🎓 **Academics & Skills:** Level up your skills, from coding languages to personal habits.
* 💻 **Coding Challenges:** Integrated tutorials and challenges to test and improve your development skills.
* 🤝 **Social Connections:** (In-Progress) Build virtual friendships, relationships, and networks.
* 💪 **Health & Gym:** (In-Progress) Manage your character's health and wellness stats.
* 🏆 **Achievements & Rewards:** Earn badges, items, and in-game currency for completing tasks.

## 📸 Screenshots

<img width="1878" height="972" alt="251021_00h50m03s_screenshot" src="https://github.com/user-attachments/assets/827ef67c-c466-4979-bd43-03875c9b79ff" />
<img width="1875" height="972" alt="251021_00h49m44s_screenshot" src="https://github.com/user-attachments/assets/db100fce-3ab2-4128-bfab-64c3f0f5c48a" />
<img width="1824" height="930" alt="251021_00h49m07s_screenshot" src="https://github.com/user-attachments/assets/81e4d090-a084-4160-8c0d-577509465a08" />
<img width="1860" height="963" alt="251021_00h48m39s_screenshot" src="https://github.com/user-attachments/assets/151202a3-8da0-4017-9479-20adb9dee071" />
<img width="1867" height="982" alt="251021_00h48m08s_screenshot" src="https://github.com/user-attachments/assets/256c66b8-5019-4bcc-801c-d61bcae92e54" />
<img width="1884" height="973" alt="251021_00h47m43s_screenshot" src="https://github.com/user-attachments/assets/a9bec8f8-c130-48ab-9ab2-57b093f733e9" />
<img width="1873" height="960" alt="251021_00h47m02s_screenshot" src="https://github.com/user-attachments/assets/81d05ddc-626c-4e45-992c-8f65be1071d4" />
<img width="1863" height="966" alt="251021_00h46m37s_screenshot" src="https://github.com/user-attachments/assets/de7e60fd-14d2-41f4-8183-3e861b9da15a" />

## 🧱 System Architecture

The system is built on a **modular architecture** centered around a core `user_profile`. Each major feature (e.g., Social, Gym, Academics, Coding) is a self-contained module. This design allows for high scalability and makes it easy to add new features without breaking existing ones.

* **Frontend:** A modern, single-page application (SPA) built with React and Vite.
* **Backend:** A flexible REST API built with Node.js and Express.
* **Database:** A NoSQL database (MongoDB) to store dynamic user data, progress, and social graphs.

## 🛠️ Tech Stack

### Frontend
* **Framework:** [React](https://reactjs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [TailwindCSS](https://tailwindcss.com/)
* **State Management:** React Context API (or Redux Toolkit)

### Backend (Planned / In-Progress)
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) (with Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **File Storage:** Firebase Storage / Cloudinary

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18.x or higher)
* `npm` or `yarn`
* A MongoDB connection string (you can get one for free from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)[your-username]/kaiden-academy.git
    cd kaiden-academy
    ```

2.  **Set up the Backend:**
    ```bash
    # Navigate to the backend directory (adjust if your structure is different)
    cd server 

    # Install dependencies
    npm install

    # Create a .env file and add your variables
    touch .env
    ```
    Your `.env` file should look like this:
    ```.env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key_for_jwt
    ```

3.  **Set up the Frontend:**
    ```bash
    # Navigate to the frontend directory
    cd ../client

    # Install dependencies
    npm install
    ```

### Running the Application

1.  **Start the Backend Server:**
    ```bash
    # From the /server directory
    npm run dev  # (or `npm start`, depending on your package.json scripts)
    ```
    The server should now be running on `http://localhost:5001`.

2.  **Start the Frontend App:**
    ```bash
    # From the /client directory
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port specified by Vite).

## 🤝 How to Contribute

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/[your-username]/kaiden-academy/issues).

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
