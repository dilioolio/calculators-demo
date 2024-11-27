import React from 'react';
import CPCCalculator from './components/CPCCalculator';
import CPACalculator from './components/CPACalculator';
import AdRevenueCalculator from './components/AdRevenueCalculator';
import InventoryCalculator from './components/InventoryCalculator';
import ROICalculator from './components/ROICalculator';
import ROASCalculator from './components/ROASCalculator';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const rootElement = document.getElementById('root');
  const calculatorType = rootElement?.getAttribute('data-calculator-type') || 'cpc';
  const themeColor = rootElement?.getAttribute('data-theme-color') || 'blue';

  return (
    <ThemeProvider color={themeColor}>
      {calculatorType === 'cpc' && <CPCCalculator />}
      {calculatorType === 'cpa' && <CPACalculator />}
      {calculatorType === 'revenue' && <AdRevenueCalculator />}
      {calculatorType === 'inventory' && <InventoryCalculator />}
      {calculatorType === 'roi' && <ROICalculator />}
      {calculatorType === 'roas' && <ROASCalculator />}
    </ThemeProvider>
  );
}

export default App;