import { Ionicons } from '@expo/vector-icons'; // Assuming Ionicons is available via expo-vector-icons
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Colors } from '../../constants/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    icon?: keyof typeof Ionicons.glyphMap;
}

export function Input({ label, error, icon, style, ...props }: InputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={Colors.light.icon}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={[styles.input, style]}
                    placeholderTextColor={Colors.light.icon}
                    {...props}
                />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
        marginBottom: 6,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6', // Light gray background
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'transparent',
        height: 52,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text,
        height: '100%',
    },
    icon: {
        marginRight: 10,
    },
    errorBorder: {
        borderColor: Colors.light.error,
        borderWidth: 1,
    },
    errorText: {
        marginTop: 4,
        marginLeft: 4,
        fontSize: 12,
        color: Colors.light.error,
    },
});
