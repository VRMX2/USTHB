import { auth } from '@/firebaseConfig';
import { UserService } from '@/services/user';
import { UserProfile } from '@/types';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if (user) {
                try {
                    // Load user profile from Firestore
                    const profile = await UserService.getUserProfile(user.uid);
                    setUserProfile(profile);

                    // Check if user is admin
                    setIsAdmin(profile?.role === 'admin');
                } catch (error) {
                    console.error('Error loading user profile:', error);
                    setUserProfile(null);
                    setIsAdmin(false);
                }
            } else {
                setUserProfile(null);
                setIsAdmin(false);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
