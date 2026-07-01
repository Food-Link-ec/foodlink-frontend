export const theme = {
  colors: {
    primary: {
      dark: '#2E7D32',
      main: '#4CAF50',
      light: '#C8E6C9',
    },
    secondary: {
      dark: '#1A237E',
      main: '#0D47A1',
      light: '#BBDEFB',
    },
    accent: '#FFB300',
    neutral: {
      background: '#F5F5F5',
      card: '#FFFFFF',
      text: '#424242',
      lightText: '#757575',
    },
    error: '#D32F2F',
    success: '#2E7D32',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    h2: { fontSize: '2rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    body: { fontSize: '1rem', fontWeight: 400 },
    small: { fontSize: '0.875rem', fontWeight: 400 },
  },
  spacing: (factor: number) => `${0.5 * factor}rem`, // 0.5rem * factor
};