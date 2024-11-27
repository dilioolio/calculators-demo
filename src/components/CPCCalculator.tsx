import React, { useState, useCallback } from 'react';
import { Calculator, DollarSign, Percent, MousePointer2, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CalculatorInput from './shared/CalculatorInput';

const CPCCalculator = () => {
  const { primaryColor, gradientFrom, gradientTo } = useTheme();
  const [adSpend, setAdSpend] = useState('1000');
  const [clicks, setClicks] = useState('100');
  const [conversionRate, setConversionRate] = useState('2');

  const calculateMetrics = useCallback(() => {
    const spend = parseFloat(adSpend) || 0;
    const clickCount = parseFloat(clicks) || 1;
    const conversion = parseFloat(conversionRate) || 0;

    const cpc = spend / clickCount;
    const conversions = (clickCount * conversion) / 100;
    const cpa = conversions > 0 ? spend / conversions : 0;

    return {
      cpc: cpc.toFixed(2),
      conversions: conversions.toFixed(1),
      cpa: cpa.toFixed(2),
    };
  }, [adSpend, clicks, conversionRate]);

  const metrics = calculateMetrics();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gradientFrom} to-${gradientTo} p-4 flex items-center justify-center`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className={`w-8 h-8 text-${primaryColor}-600`} />
          <h1 className="text-2xl font-bold text-gray-800">CPC Calculator</h1>
        </div>

        <div className="space-y-6">
          <CalculatorInput
            label="Ad Spend"
            value={adSpend}
            onChange={setAdSpend}
            icon={<DollarSign className="w-5 h-5 text-gray-400" />}
            prefix="$"
          />

          <CalculatorInput
            label="Total Clicks"
            value={clicks}
            onChange={setClicks}
            icon={<MousePointer2 className="w-5 h-5 text-gray-400" />}
          />

          <CalculatorInput
            label="Conversion Rate"
            value={conversionRate}
            onChange={setConversionRate}
            icon={<Percent className="w-5 h-5 text-gray-400" />}
            suffix="%"
          />

          <div className="mt-8 bg-gray-50 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 text-${primaryColor}-600`} />
              Results
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Cost per Click</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>${metrics.cpc}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Conversions</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>{metrics.conversions}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                <p className="text-sm text-gray-600 mb-1">Cost per Acquisition</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>${metrics.cpa}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPCCalculator;