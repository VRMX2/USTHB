import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Styles } from '../../constants/Styles';
import { Colors } from '../../constants/theme';
import { auth } from '../../firebaseConfig';

export default function LoginScreen() {
    const router = useRouter();
    const [matricule, setMatricule] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!matricule || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Map matricule to email format
            const email = `${matricule}@student.usthb.dz`;
            console.log('Attempting login with:', email);

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user.uid);

            // Navigate to tabs upon success (handled by AuthContext ideally, or manual push)
            // router.replace('/(tabs)'); 
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={Styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/images/icon.png')} // Make sure this exists
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>RSD Masters Companion</Text>
                    <Text style={styles.subtitle}>Sign in with your Matricule</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Matricule"
                        placeholder="e.g., 191931045..."
                        value={matricule}
                        onChangeText={setMatricule}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        icon="school-outline"
                        error={error ? ' ' : undefined} // Just to trigger red border if needed, or specific field error
                    />

                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon="lock-closed-outline"
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <Button
                        title="Sign In"
                        onPress={handleLogin}
                        loading={loading}
                        variant="primary"
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>First time? Use the password from your certificate.</Text>
                        <Button
                            title="Help / Support"
                            onPress={() => Alert.alert('Support', 'Contact admin at admin@usthb.dz')}
                            variant="ghost"
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.light.icon,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    errorText: {
        color: Colors.light.error,
        textAlign: 'center',
        marginBottom: 16,
    },
    footer: {
        marginTop: 24,
        alignItems: 'center',
    },
    footerText: {
        color: Colors.light.icon,
        fontSize: 14,
        marginBottom: 12,
    },
});
