# RSD Masters Student Companion - Technical Architecture

## 1. Executive Summary
The "RSD Masters Student Companion" is a specialized mobile application designed exclusively for Masters students in the RSD (Réseaux et Systèmes Distribués) program at USTHB. It serves as a comprehensive academic and social platform, integrating course management, real-time communication, and administrative tools into a secure, verifiable ecosystem.

## 2. System Architecture Overview

### 2.1 High-Level Architecture
The system follows a modern Serverless architecture leveraging Firebase as the backend-as-a-service (BaaS) and Expo (React Native) for the cross-platform mobile frontend.

Users (iOS/Android) <--> Expo (React Native) <--> [HTTPS/WSS] <--> Google Cloud Platform (Firebase)

### 2.2 Core Components
1.  **Mobile Client (Frontend)**:
    -   Framework: Expo (React Native)
    -   Language: TypeScript
    -   State Management: Zustand & TanStack Query
    -   UI Library: NativeWind (Tailwind CSS) & Reanimated
    -   Routing: Expo Router (File-based routing)

2.  **Backend Services (Firebase)**:
    -   **Authentication**: Custom claims for verified matricule + initial password check.
    -   **Firestore (NoSQL Database)**: Stores academic data, user profiles, and chat metadata.
    -   **Realtime Database**: High-frequency updates (presence, typing indicators).
    -   **Cloud Functions**: Triggers for notifications, data validation, and complex logic.
    -   **Cloud Storage**: Hosting for course PDFs, images, and voice notes.

3.  **DevOps & Security**:
    -   **CI/CD**: GitHub Actions for automated builds (EAS Build).
    -   **Security**: Firestore Security Rules & Firebase App Check.

## 3. Technology Justification

-   **React Native/Expo**: Chosen for its single codebase efficiency, excellent performance, and rapid development cycle suitable for academic projects.
-   **Firebase**: Provides real-time capabilities out-of-the-box (crucial for chat) and scales automatically without server management overhead.
-   **TypeScript**: Ensures type safety and maintainability across the complex application logic (academic modules + social features).

## 4. Security Architecture

### 4.1 Authentication Flow
1.  Student attempts login with Matricule ID and Initial Password (from Baccalaureate).
2.  Backend validates against secure hash of valid matricules.
3.  If valid, `isVerified: true` claim is attached to the user token.
4.  User functionality is locked until a password change is performed.

### 4.2 Data Protection
-   **Encryption**: All data in transit encrypted via TLS. Data at rest encrypted by Google Cloud.
-   **Access Control**: Strictly enforced Firestore Rules ensuring students can only access their relevant semester data.
