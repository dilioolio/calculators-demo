import React, { useState, useCallback } from 'react';
import { Calculator, DollarSign, TrendingUp, ArrowUpDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CalculatorInput from './shared/CalculatorInput';

const ROICalculator = () => {
  const { primaryColor, gradientFrom, gradientTo } = useTheme();
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [finalValue, setFinalValue] = useState('15000');
  const [timePeriod, setTimePeriod] = useState('12');

  const calculateMetrics = useCallback(() => {
    const initial = parseFloat(initialInvestment) || 0;
    const final = parseFloat(finalValue) || 0;
    const months = parseFloat(timePeriod) || 1;

    const totalReturn = final - initial;
    const roi = (totalReturn / initial) * 100;
    const annualizedROI = ((Math.pow(1 + (roi / 100), 12 / months) - 1) * 100);

    return {
      totalReturn: totalReturn.toFixed(2),
      roi: roi.toFixed(2),
      annualizedROI: annualizedROI.toFixed(2),
    };
  }, [initialInvestment, finalValue, timePeriod]);

  const metrics = calculateMetrics();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gradientFrom} to-${gradientTo} p-4 flex items-center justify-center`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className={`w-8 h-8 text-${primaryColor}-600`} />
          <h1 className="text-2xl font-bold text-gray-800">ROI Calculator</h1>
        </div>

        <div className="space-y-6">
          <CalculatorInput
            label="Initial Investment"
            value={initialInvestment}
            onChange={setInitialInvestment}
            icon={<DollarSign className="w-5 h-5 text-gray-400" />}
            prefix="$"
          />

          <CalculatorInput
            label="Final Value"
            value={finalValue}
            onChange={setFinalValue}
            icon={<DollarSign className="w-5 h-5 text-gray-400" />}
            prefix="$"
          />

          <CalculatorInput
            label="Time Period (Months)"
            value={timePeriod}
            onChange={setTimePeriod}
            icon={<ArrowUpDown className="w-5 h-5 text-gray-400" />}
          />

          <div className="mt-8 bg-gray-50 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 text-${primaryColor}-600`} />
              ROI Analysis
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Total Return</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>${metrics.totalReturn}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">ROI</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>{metrics.roi}%</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                <p className="text-sm text-gray-600 mb-1">Annualized ROI</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>{metrics.annualizedROI}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;