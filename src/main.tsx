import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Make initialization function available globally
declare global {
  interface Window {
    initializeCalculator: (element: HTMLElement) => void;
  }
}

window.initializeCalculator = function(element: HTMLElement) {
  const root = createRoot(element);
  
  const render = () => {
    root.render(
      <StrictMode>
        <App key={element.getAttribute('data-calculator-type')} />
      </StrictMode>
    );
  };

  render();
  window.addEventListener('calculator-switch', render);
};

// Initialize calculators if not in WordPress
if (!document.querySelector('.marketing-calculator')) {
  document.querySelectorAll('#root').forEach((element) => {
    if (element instanceof HTMLElement) {
      window.initializeCalculator(element);
    }
  });
}