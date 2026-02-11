import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    style,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    error && styles.inputError,
                    style,
                ]}
                placeholderTextColor={Colors.light.icon}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.lg,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 8,
        letterSpacing: -0.2,
    },
    input: {
        backgroundColor: Colors.light.card,
        borderRadius: BorderRadius.md,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 17,
        color: Colors.light.text,
        borderWidth: 1.5,
        borderColor: Colors.light.border,
        letterSpacing: -0.4,
    },
    inputFocused: {
        borderColor: Colors.light.primary,
        borderWidth: 2,
    },
    inputError: {
        borderColor: Colors.light.error,
    },
    errorText: {
        fontSize: 13,
        color: Colors.light.error,
        marginTop: 6,
        marginLeft: 4,
    },
});
