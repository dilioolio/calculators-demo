import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  primaryColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const defaultTheme: ThemeContextType = {
  primaryColor: 'blue',
  gradientFrom: 'blue-50',
  gradientTo: 'indigo-50'
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

interface ThemeProviderProps {
  children: ReactNode;
  color?: string;
}

const colorMap: Record<string, ThemeContextType> = {
  blue: {
    primaryColor: 'blue',
    gradientFrom: 'blue-50',
    gradientTo: 'indigo-50'
  },
  purple: {
    primaryColor: 'purple',
    gradientFrom: 'purple-50',
    gradientTo: 'pink-50'
  },
  emerald: {
    primaryColor: 'emerald',
    gradientFrom: 'emerald-50',
    gradientTo: 'teal-50'
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, color = 'blue' }) => {
  const theme = colorMap[color] || defaultTheme;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);