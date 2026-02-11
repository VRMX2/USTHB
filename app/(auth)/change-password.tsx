import { useRouter } from 'expo-router';
import { signOut, updatePassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Styles } from '../../constants/Styles';
import { Colors } from '../../constants/theme';
import { auth } from '../../firebaseConfig';

export default function ChangePasswordScreen() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        if (!newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const user = auth.currentUser;
            if (user) {
                await updatePassword(user, newPassword);
                Alert.alert('Success', 'Password updated successfully. Please sign in with your new password.', [
                    {
                        text: 'OK', onPress: () => {
                            signOut(auth);
                            router.replace('/(auth)/login');
                        }
                    }
                ]);
            } else {
                setError('No user logged in.');
            }
        } catch (err: any) {
            console.error('Update password error:', err);
            setError(err.message || 'Failed to update password.');
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
                    <Text style={styles.title}>Secure Your Account</Text>
                    <Text style={styles.subtitle}>Please choose a new, strong password.</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="New Password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        icon="lock-closed-outline"
                        error={error ? ' ' : undefined}
                    />

                    <Input
                        label="Confirm Password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        icon="lock-closed-outline"
                    />

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <Button
                        title="Update Password"
                        onPress={handleChangePassword}
                        loading={loading}
                        variant="primary"
                    />
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
    title: {
        fontSize: 24,
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
});
