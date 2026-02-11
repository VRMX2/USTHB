import { db } from '@/firebaseConfig';
import { UserProfile } from '@/types';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

export const UserService = {
    /**
     * Get user profile by UID
     */
    async getUserProfile(uid: string): Promise<UserProfile | null> {
        try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data() as UserProfile;
            }
            return null;
        } catch (error) {
            console.error('Error getting user profile:', error);
            return null;
        }
    },

    /**
     * Create or update user profile
     */
    async setUserProfile(uid: string, profile: Partial<UserProfile>): Promise<void> {
        try {
            const docRef = doc(db, 'users', uid);
            await setDoc(docRef, {
                ...profile,
                uid,
                updatedAt: new Date().toISOString(),
            }, { merge: true });
        } catch (error) {
            console.error('Error setting user profile:', error);
            throw error;
        }
    },

    /**
     * Update user profile
     */
    async updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
        try {
            const docRef = doc(db, 'users', uid);
            await updateDoc(docRef, {
                ...updates,
                updatedAt: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    },

    /**
     * Get user by matricule
     */
    async getUserByMatricule(matricule: string): Promise<UserProfile | null> {
        try {
            const q = query(collection(db, 'users'), where('matricule', '==', matricule));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                return querySnapshot.docs[0].data() as UserProfile;
            }
            return null;
        } catch (error) {
            console.error('Error getting user by matricule:', error);
            return null;
        }
    },
};
