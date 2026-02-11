/**
 * Premium Theme Configuration
 * iOS-inspired design with SF Pro Display font family
 */

export const Fonts = {
  regular: 'System',
  medium: 'System',
  semibold: 'System',
  bold: 'System',
  // These will use the system font (San Francisco on iOS, Roboto on Android)
  // For custom fonts, you would use expo-font to load SF Pro Display
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
};

export const Colors = {
  light: {
    // Primary Brand Colors - Modern Blue
    primary: '#007AFF', // iOS Blue
    primaryDark: '#0051D5',
    primaryLight: '#4DA2FF',

    // Secondary & Accent
    secondary: '#5856D6', // iOS Purple
    accent: '#FF2D55', // iOS Pink
    success: '#34C759', // iOS Green
    warning: '#FF9500', // iOS Orange
    error: '#FF3B30', // iOS Red

    // Neutral Colors
    background: '#F2F2F7', // iOS Light Gray Background
    card: '#FFFFFF',
    border: '#E5E5EA',

    // Text Colors
    text: '#000000',
    textSecondary: '#3C3C43',
    icon: '#8E8E93',

    // Glassmorphism
    glass: 'rgba(255, 255, 255, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.3)',

    // Shadows
    shadow: 'rgba(0, 0, 0, 0.1)',

    // Tab Bar
    tint: '#007AFF',
    tabIconDefault: '#8E8E93',
    tabIconSelected: '#007AFF',
  },
  dark: {
    // Primary Brand Colors
    primary: '#0A84FF', // iOS Blue (Dark Mode)
    primaryDark: '#0051D5',
    primaryLight: '#64B5F6',

    // Secondary & Accent
    secondary: '#5E5CE6', // iOS Purple (Dark)
    accent: '#FF375F', // iOS Pink (Dark)
    success: '#32D74B', // iOS Green (Dark)
    warning: '#FF9F0A', // iOS Orange (Dark)
    error: '#FF453A', // iOS Red (Dark)

    // Neutral Colors
    background: '#000000',
    card: '#1C1C1E',
    border: '#38383A',

    // Text Colors
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    icon: '#8E8E93',

    // Glassmorphism
    glass: 'rgba(28, 28, 30, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',

    // Shadows
    shadow: 'rgba(0, 0, 0, 0.3)',

    // Tab Bar
    tint: '#0A84FF',
    tabIconDefault: '#8E8E93',
    tabIconSelected: '#0A84FF',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};
