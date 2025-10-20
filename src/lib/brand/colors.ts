// Seven Monkeys The Bar - Brand Colors
// Based on Instagram aesthetic analysis

export const brandColors = {
  // Primary Colors
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#00BCD4', // Deep Teal - Primary
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344',
  },
  coral: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#ffcdd2',
    300: '#ffa8b5',
    400: '#ff6b6b', // Warm Coral - Primary
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
    950: '#4c0519',
  },
  brown: {
    50: '#fdf8f6',
    100: '#f2e8e5',
    200: '#eaddd7',
    300: '#e0cdc2',
    400: '#d2bab0',
    500: '#bfa094',
    600: '#a18072',
    700: '#8B4513', // Rich Brown - Primary
    800: '#6b4e3d',
    900: '#5a4032',
    950: '#2d2018',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#FFD700', // Vibrant Yellow - Primary
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },
  // Secondary Colors
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#8A2BE2', // Neon Purple
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#228B22', // Moss Green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  // Accent Colors
  electricBlue: '#00FFFF',
  warmOrange: '#FF8C00',
  creamWhite: '#FFF8DC',
  charcoal: '#36454F',
} as const;

// Brand-specific gradients
export const brandGradients = {
  hero: 'from-teal-600 to-blue-800',
  poolParty: 'from-teal-500 to-yellow-400',
  mexicanNight: 'from-coral-500 to-orange-500',
  soulfulSession: 'from-purple-600 to-blue-900',
  lazySunday: 'from-yellow-400 to-brown-600',
  admin: 'from-teal-50 to-coral-50',
} as const;

// Event-specific color schemes
export const eventThemes = {
  poolParty: {
    primary: brandColors.teal[500],
    secondary: brandColors.yellow[500],
    accent: brandColors.electricBlue,
  },
  mexicanNight: {
    primary: brandColors.coral[500],
    secondary: brandColors.warmOrange,
    accent: brandColors.yellow[500],
  },
  soulfulSession: {
    primary: brandColors.purple[500],
    secondary: brandColors.teal[900],
    accent: brandColors.teal[500],
  },
  lazySunday: {
    primary: brandColors.yellow[500],
    secondary: brandColors.brown[700],
    accent: brandColors.coral[500],
  },
} as const;
