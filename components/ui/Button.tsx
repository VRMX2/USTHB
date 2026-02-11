import { BorderRadius, Colors, Shadows } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            borderRadius: BorderRadius.md,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        };

        // Size variations
        const sizeStyles: Record<string, ViewStyle> = {
            small: { paddingVertical: 10, paddingHorizontal: 16 },
            medium: { paddingVertical: 14, paddingHorizontal: 20 },
            large: { paddingVertical: 16, paddingHorizontal: 24 },
        };

        // Variant styles
        const variantStyles: Record<string, ViewStyle> = {
            primary: {
                backgroundColor: Colors.light.primary,
                ...Shadows.sm,
            },
            secondary: {
                backgroundColor: Colors.light.secondary,
                ...Shadows.sm,
            },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: Colors.light.primary,
            },
            ghost: {
                backgroundColor: 'transparent',
            },
        };

        return {
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
            opacity: disabled ? 0.5 : 1,
        };
    };

    const getTextStyle = (): TextStyle => {
        const sizeStyles: Record<string, TextStyle> = {
            small: { fontSize: 15 },
            medium: { fontSize: 17 },
            large: { fontSize: 19 },
        };

        const variantStyles: Record<string, TextStyle> = {
            primary: { color: '#FFFFFF' },
            secondary: { color: '#FFFFFF' },
            outline: { color: Colors.light.primary },
            ghost: { color: Colors.light.primary },
        };

        return {
            fontWeight: '600',
            letterSpacing: -0.4,
            ...sizeStyles[size],
            ...variantStyles[variant],
        };
    };

    return (
        <TouchableOpacity
            style={[getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' || variant === 'secondary' ? '#FFFFFF' : Colors.light.primary} />
            ) : (
                <Text style={[getTextStyle(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};
