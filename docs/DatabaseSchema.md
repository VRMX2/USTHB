# RSD Masters Student Companion - Database Schema

This document outlines the Firestore NoSQL database structure for the application.

## Collections

### `users`
Stores user profiles and authentication status.
- **Document ID**: `uid` (from Firebase Auth)
- **Fields**:
  - `email` (string): User email
  - `firstName` (string)
  - `lastName` (string)
  - `matricule` (string, unique): Student ID
  - `role` (string): 'student' | 'professor' | 'admin'
  - `semester` (number): 1 or 2
  - `isVerified` (boolean): True if matricule + password check passed
  - `fcmToken` (string): For push notifications
  - `createdAt` (timestamp)

### `modules`
Academic modules for each semester.
- **Document ID**: `moduleId` (e.g., 'meps', 'res_proto')
- **Fields**:
  - `title` (string)
  - `code` (string)
  - `semester` (number)
  - `coefficient` (number)
  - `professorId` (string, ref: users)
  - `description` (string)

### `resources` (Course Materials)
- **Document ID**: `resourceId`
- **Fields**:
  - `moduleId` (string)
  - `type` (string): 'cours' | 'td' | 'tp' | 'exam'
  - `title` (string)
  - `fileUrl` (string): Firebase Storage URL
  - `uploadedBy` (string)
  - `timestamp` (timestamp)

### `chats`
Conversation metadata.
- **Document ID**: `chatId`
- **Fields**:
  - `type` (string): 'direct' | 'group'
  - `participants` (array of uids)
  - `lastMessage` (map): { content, senderId, timestamp }
  - `name` (string): Group name (if type is group)
  - `moduleId` (string): Linked module (optional)

### `messages` (Subcollection of `chats`)
- **Document ID**: `messageId`
- **Fields**:
  - `senderId` (string)
  - `content` (string)
  - `mediaUrl` (string, optional)
  - `mediaType` (string, optional): 'image' | 'audio'
  - `timestamp` (timestamp)
  - `readBy` (array of uids)

## Security Model
- **Students**: Read/Write access to their own profile. Read access to modules/resources of their active semester.
- **Professors**: Write access to resources for their modules.
- **Admins**: Full access.
