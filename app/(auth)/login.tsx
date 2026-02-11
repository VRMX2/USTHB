import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BorderRadius, Colors, Shadows } from '@/constants/theme';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Animated, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen() {
    const router = useRouter();
    const [matricule, setMatricule] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fadeAnim = useState(new Animated.Value(0))[0];

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleLogin = async () => {
        if (!matricule || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const email = `${matricule}@student.usthb.dz`;
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            console.error('Login error:', err);
            let message = 'Failed to sign in. Please check your credentials.';
            if (err.code === 'auth/invalid-email') message = 'Invalid matricule format.';
            if (err.code === 'auth/user-not-found') message = 'Student not found.';
            if (err.code === 'auth/wrong-password') message = 'Incorrect password.';
            setError(message);
            Alert.alert('Login Failed', message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <Text style={styles.logoText}>RSD</Text>
                            </View>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to continue</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.form}>
                            <Input
                                label="Matricule"
                                placeholder="Enter your matricule"
                                value={matricule}
                                onChangeText={setMatricule}
                                autoCapitalize="none"
                                keyboardType="default"
                            />

                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />

                            {error ? (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            ) : null}

                            <Button
                                title={loading ? 'Signing in...' : 'Sign In'}
                                onPress={handleLogin}
                                loading={loading}
                                disabled={loading}
                                size="large"
                                style={{ marginTop: 8 }}
                            />
                        </View>

                        {/* Footer */}
                        <Text style={styles.footerText}>
                            RSD Masters Student Companion
                        </Text>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        ...Shadows.lg,
    },
    logoText: {
        fontSize: 32,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    title: {
        fontSize: 34,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 8,
        letterSpacing: 0.4,
    },
    subtitle: {
        fontSize: 17,
        color: Colors.light.textSecondary,
        letterSpacing: -0.4,
    },
    form: {
        marginBottom: 32,
    },
    errorContainer: {
        backgroundColor: '#FFEBEE',
        borderRadius: BorderRadius.md,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        color: Colors.light.error,
        fontSize: 15,
        textAlign: 'center',
    },
    footerText: {
        fontSize: 13,
        color: Colors.light.icon,
        textAlign: 'center',
    },
});
