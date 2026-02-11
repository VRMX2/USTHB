import { StyleSheet } from 'react-native';
import { BorderRadius, Colors, Shadows, Spacing } from './theme';

export const Styles = StyleSheet.create({
    // Layout
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Cards - Modern iOS Style
    card: {
        backgroundColor: Colors.light.card,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        ...Shadows.md,
    },

    cardCompact: {
        backgroundColor: Colors.light.card,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        ...Shadows.sm,
    },

    // Glass Effect
    glassCard: {
        backgroundColor: Colors.light.glass,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.light.glassBorder,
        ...Shadows.lg,
    },

    // Typography
    heading1: {
        fontSize: 34,
        fontWeight: '700',
        color: Colors.light.text,
        letterSpacing: 0.4,
    },

    heading2: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.light.text,
        letterSpacing: 0.35,
    },

    heading3: {
        fontSize: 22,
        fontWeight: '600',
        color: Colors.light.text,
        letterSpacing: 0.35,
    },

    body: {
        fontSize: 17,
        fontWeight: '400',
        color: Colors.light.text,
        lineHeight: 22,
    },

    bodySecondary: {
        fontSize: 15,
        fontWeight: '400',
        color: Colors.light.textSecondary,
        lineHeight: 20,
    },

    caption: {
        fontSize: 13,
        fontWeight: '400',
        color: Colors.light.icon,
        lineHeight: 18,
    },

    // Buttons
    buttonPrimary: {
        backgroundColor: Colors.light.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.sm,
    },

    buttonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: -0.4,
    },

    // Inputs - iOS Style
    input: {
        backgroundColor: Colors.light.card,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        fontSize: 17,
        color: Colors.light.text,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },

    inputFocused: {
        borderColor: Colors.light.primary,
        borderWidth: 2,
    },

    // Dividers
    divider: {
        height: 1,
        backgroundColor: Colors.light.border,
        marginVertical: Spacing.md,
    },

    // Badges
    badge: {
        backgroundColor: Colors.light.primary,
        borderRadius: BorderRadius.full,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
