# Firebase Integration Guide

## Overview
Complete Firebase integration for the RSD Masters Student Companion app, including Authentication, Firestore Database, and Cloud Storage.

## 🔧 Configuration

### Firebase Config ([firebaseConfig.ts](file:///c:/vrmx_khadmoney/REAL%20PROJECTS/USTHB/firebaseConfig.ts))
```typescript
// Replace placeholder values with your Firebase project credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "usthb-student-app-vrmx.firebaseapp.com",
  projectId: "usthb-student-app-vrmx",
  storageBucket: "usthb-student-app-vrmx.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**Features:**
- Auth persistence with AsyncStorage for React Native
- Firestore database initialization
- Cloud Storage initialization
- Platform-specific Auth initialization (web vs mobile)

## 📦 Dependencies Added

```json
{
  "@react-native-async-storage/async-storage": "^2.1.0",
  "firebase": "^12.9.0"
}
```

## 🔐 Authentication

### AuthContext ([contexts/AuthContext.tsx](file:///c:/vrmx_khadmoney/REAL%20PROJECTS/USTHB/contexts/AuthContext.tsx))
**Features:**
- Firebase Auth state management
- Automatic user profile loading from Firestore
- Admin role detection
- Loading states

**Usage:**
```typescript
const { user, userProfile, loading, isAdmin } = useAuth();
```

### Login Flow ([app/(auth)/login.tsx](file:///c:/vrmx_khadmoney/REAL%20PROJECTS/USTHB/app/(auth)/login.tsx))
- Matricule → Email conversion (`matricule@student.usthb.dz`)
- Firebase email/password authentication
- Error handling with user-friendly messages
- Modern iOS-inspired UI

## 💾 Firestore Services

### UserService ([services/user.ts](file:///c:/vrmx_khadmoney/REAL%20PROJECTS/USTHB/services/user.ts))
**Methods:**
- `getUserProfile(uid)` - Get user profile by UID
- `setUserProfile(uid, profile)` - Create/update user profile
- `updateUserProfile(uid, updates)` - Update specific fields
- `getUserByMatricule(matricule)` - Find user by matricule

**Collection:** `users`

### ModulesService ([services/modules.ts](file:///c:/vrmx_khadmoney/REAL%20PROJECTS/USTHB/services/modules.ts))
**Methods:**
- `getModules(semester)` - Get modules by semester (S1/S2)
- `getModuleById(id)` - Get single module
- `getAllModules()` - Get all modules

**Collection:** `modules`
**Fallback:** Mock data if Firestore is empty

### ChatService ([services/chat.ts](file:///c:/vrmx_khadmoney/REAL%20PROJECTS/USTHB/services/chat.ts))
**Methods:**
- `sendMessage(text, userId, userName)` - Send message to Firestore
- `subscribeToMessages(callback, currentUserId)` - Real-time message subscription
- `getMessages(currentUserId)` - One-time message fetch

**Collection:** `messages`
**Features:**
- Real-time updates with `onSnapshot`
- Automatic message ordering by timestamp
- User identification (isCurrentUser flag)

## 📊 Firestore Data Structure

### Users Collection
```typescript
{
  uid: string;
  matricule: string;
  displayName?: string;
  role: 'student' | 'professor' | 'admin';
  semester: 'S1' | 'S2';
  groupId?: string;
  updatedAt: string; // ISO timestamp
}
```

### Modules Collection
```typescript
{
  id: string;
  name: string;
  code: string;
  semester: 'S1' | 'S2';
  professor?: string;
  description?: string;
  coefficient?: number;
  credits?: number;
}
```

### Messages Collection
```typescript
{
  text: string;
  userId: string;
  userName: string;
  timestamp: Timestamp;
  createdAt: string; // ISO timestamp
}
```

## 🔒 Security Rules

Security rules are defined in [firestore.rules](file:///c:/vrmx_khadmoney/REAL%20PROJECTS/USTHB/firestore.rules):

- **Users**: Read/write own profile only
- **Modules**: Public read, admin write
- **Resources**: Public read, admin write
- **Messages**: Authenticated users can read/create, edit/delete own messages
- **Stories**: Authenticated users can read/create, delete own stories

## 🚀 Usage Examples

### Load User Profile
```typescript
const { userProfile } = useAuth();
console.log(userProfile?.displayName);
console.log(userProfile?.matricule);
```

### Fetch Modules
```typescript
const s1Modules = await ModulesService.getModules('S1');
```

### Real-time Chat
```typescript
useEffect(() => {
  const unsubscribe = ChatService.subscribeToMessages(
    (messages) => setMessages(messages),
    user.uid
  );
  return () => unsubscribe();
}, [user]);
```

### Send Message
```typescript
await ChatService.sendMessage(
  'Hello!',
  user.uid,
  user.displayName || 'Anonymous'
);
```

## 📝 Next Steps

1. **Deploy Security Rules**:
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Seed Initial Data**:
   - Add modules to Firestore `modules` collection
   - Create user profiles in `users` collection

3. **Test Authentication**:
   - Create test users in Firebase Console
   - Test login flow with matricule/password

4. **Enable Firestore**:
   - Go to Firebase Console → Firestore Database
   - Create database in production mode
   - Deploy security rules

## ✅ Integration Checklist

- [x] Firebase SDK installed and configured
- [x] AsyncStorage for Auth persistence
- [x] AuthContext with profile loading
- [x] UserService for profile management
- [x] ModulesService with Firestore integration
- [x] ChatService with real-time messaging
- [x] Security rules defined
- [x] Login screen with Firebase Auth
- [x] Home screen with user profile display
- [x] Chat screen with real-time updates
- [ ] Deploy security rules to Firebase
- [ ] Seed initial data (modules, users)
- [ ] Test on physical device
