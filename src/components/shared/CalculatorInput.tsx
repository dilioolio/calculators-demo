import React, { ChangeEvent } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
}

const CalculatorInput = ({ label, value, onChange, icon, suffix }: CalculatorInputProps) => {
  const { primaryColor } = useTheme();
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Ensure we only allow numbers and decimal points
    if (/^\d*\.?\d*$/.test(newValue) || newValue === '') {
      onChange(newValue);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9]*\.?[0-9]*"
          value={value}
          onChange={handleChange}
          className={`block w-full rounded-md border-gray-300 pl-12 pr-12 focus:border-${primaryColor}-500 focus:ring-${primaryColor}-500 sm:text-sm h-11`}
          placeholder="0"
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatorInput;