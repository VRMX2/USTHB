# RSD Masters Student Companion

A production-ready mobile application for RSD Masters students, built with **Expo (React Native)** and **Firebase**.

## 🚀 Features

*   **Authentication**: Secure login with Matricule/Password and "First Login" password change enforcement.
*   **Academic Core**:
    *   **Modules**: View modules for Semester 1 & 2.
    *   **Timetable**: Weekly class schedule view.
    *   **Exams**: Track exam dates and grades.
    *   **Resources**: Download course materials (PDF, PPTX, etc.).
*   **Social**:
    *   **Chat**: Real-time messaging (Mock/UI ready for Firestore).
    *   **Stories**: Ephemeral status updates (UI Implementation).
*   **Security**: Firestore Security Rules implemented.
*   **DevOps**: Docker containerization and CI/CD pipelines.

## 🛠 Tech Stack

-   **Frontend**: React Native, Expo, TypeScript, Expo Router.
-   **Backend**: Firebase (Auth, Firestore, Storage).
-   **Styling**: StyleSheet, Custom Theme System (Light/Dark mode).
-   **DevOps**: GitHub Actions, Docker.

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/usthb-student-app.git
    cd usthb-student-app
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Firebase**:
    -   Create a Firebase project.
    -   Copy credentials to `firebaseConfig.ts`.

4.  **Run the app**:
    ```bash
    npx expo start
    ```

## 🐳 Docker

To build and run the web version in a container:

```bash
docker-compose up --build
```

## 🧪 Testing

Run linting and type checking:

```bash
npm run lint
npx tsc --noEmit
```

## 📄 License

MIT
