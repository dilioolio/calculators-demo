import React, { useState, useCallback } from 'react';
import { Calculator, DollarSign, TrendingUp, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CalculatorInput from './shared/CalculatorInput';

const ROASCalculator = () => {
  const { primaryColor, gradientFrom, gradientTo } = useTheme();
  const [revenue, setRevenue] = useState('50000');
  const [adSpend, setAdSpend] = useState('10000');
  const [targetROAS, setTargetROAS] = useState('400');

  const calculateMetrics = useCallback(() => {
    const totalRevenue = parseFloat(revenue) || 0;
    const totalAdSpend = parseFloat(adSpend) || 1;
    const target = parseFloat(targetROAS) || 0;

    const roas = (totalRevenue / totalAdSpend) * 100;
    const roasGap = roas - target;
    const recommendedSpend = totalRevenue / (target / 100);

    return {
      roas: roas.toFixed(2),
      roasGap: roasGap.toFixed(2),
      recommendedSpend: recommendedSpend.toFixed(2),
    };
  }, [revenue, adSpend, targetROAS]);

  const metrics = calculateMetrics();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gradientFrom} to-${gradientTo} p-4 flex items-center justify-center`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className={`w-8 h-8 text-${primaryColor}-600`} />
          <h1 className="text-2xl font-bold text-gray-800">ROAS Calculator</h1>
        </div>

        <div className="space-y-6">
          <CalculatorInput
            label="Revenue"
            value={revenue}
            onChange={setRevenue}
            icon={<DollarSign className="w-5 h-5 text-gray-400" />}
            prefix="$"
          />

          <CalculatorInput
            label="Ad Spend"
            value={adSpend}
            onChange={setAdSpend}
            icon={<DollarSign className="w-5 h-5 text-gray-400" />}
            prefix="$"
          />

          <CalculatorInput
            label="Target ROAS"
            value={targetROAS}
            onChange={setTargetROAS}
            icon={<Target className="w-5 h-5 text-gray-400" />}
            suffix="%"
          />

          <div className="mt-8 bg-gray-50 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 text-${primaryColor}-600`} />
              ROAS Analysis
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Current ROAS</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>{metrics.roas}%</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Gap to Target</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>{metrics.roasGap}%</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                <p className="text-sm text-gray-600 mb-1">Recommended Spend</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>${metrics.recommendedSpend}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROASCalculator;