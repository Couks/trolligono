/**
 * Custom color palette for the math education app
 * Primary colors: Purple, gray, and white
 * Accent: Green for highlights
 */

// Main theme colors
const primaryPurple = '#6C63FF';
const deepPurple = '#5A4FCF';
const lightPurple = '#9D97FF';
const accentGreen = '#4ECDC4';
const neutralGray = '#F7F8FC';
const darkGray = '#4F4F4F';

export const Colors = {
  light: {
    text: '#2D2D2D',
    secondaryText: '#6E6E6E',
    background: '#FFFFFF',
    card: '#FFFFFF',
    primary: primaryPurple,
    secondary: deepPurple,
    accent: accentGreen,
    border: '#EAEAEA',
    shadow: 'rgba(108, 99, 255, 0.08)',
    icon: darkGray,
    tabIconDefault: '#AEAEAE',
    tabIconSelected: primaryPurple,
    surface: neutralGray,
    surfaceHighlight: 'rgba(108, 99, 255, 0.1)',
  },
  dark: {
    text: '#F5F5F5',
    secondaryText: '#AEAEAE',
    background: '#1A1A2E',
    card: '#252543',
    primary: lightPurple,
    secondary: primaryPurple,
    accent: accentGreen,
    border: '#333355',
    shadow: 'rgba(0, 0, 0, 0.3)',
    icon: '#AEAEAE',
    tabIconDefault: '#8E8E8E',
    tabIconSelected: lightPurple,
    surface: '#252543',
    surfaceHighlight: 'rgba(157, 151, 255, 0.15)',
  },
};
