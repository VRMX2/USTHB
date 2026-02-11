import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/theme';

interface ButtonProps {
    onPress: () => void;
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    loading?: boolean;
    disabled?: boolean;
}

export function Button({
    onPress,
    title,
    variant = 'primary',
    loading = false,
    disabled = false
}: ButtonProps) {

    const getBackgroundColor = () => {
        if (disabled) return Colors.light.icon; // Greyed out
        switch (variant) {
            case 'primary': return Colors.light.primary;
            case 'secondary': return Colors.light.secondary;
            case 'outline': return 'transparent';
            case 'ghost': return 'transparent';
            default: return Colors.light.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return '#FFF';
        switch (variant) {
            case 'primary': return '#FFF';
            case 'secondary': return '#000'; // Or contrast color
            case 'outline': return Colors.light.primary;
            case 'ghost': return Colors.light.text;
            default: return '#FFF';
        }
    };

    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                { backgroundColor: getBackgroundColor() },
                variant === 'outline' && styles.outline,
                disabled && styles.disabled
            ]}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 12, // Modern rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Android shadow
    },
    outline: {
        borderWidth: 2,
        borderColor: Colors.light.primary,
        elevation: 0,
    },
    disabled: {
        opacity: 0.7,
        elevation: 0,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
