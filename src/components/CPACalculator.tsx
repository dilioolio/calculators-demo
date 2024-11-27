import React, { useState, useCallback } from 'react';
import { Calculator, DollarSign, Users, Percent, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CalculatorInput from './shared/CalculatorInput';

const CPACalculator = () => {
  const { primaryColor, gradientFrom, gradientTo } = useTheme();
  const [totalSpend, setTotalSpend] = useState('5000');
  const [totalVisitors, setTotalVisitors] = useState('1000');
  const [conversionRate, setConversionRate] = useState('2');

  const calculateMetrics = useCallback(() => {
    const spend = parseFloat(totalSpend) || 0;
    const visitors = parseFloat(totalVisitors) || 1;
    const conversion = parseFloat(conversionRate) || 0;

    const conversions = (visitors * conversion) / 100;
    const cpa = conversions > 0 ? spend / conversions : 0;
    const costPerVisitor = spend / visitors;

    return {
      conversions: conversions.toFixed(1),
      cpa: cpa.toFixed(2),
      costPerVisitor: costPerVisitor.toFixed(2),
    };
  }, [totalSpend, totalVisitors, conversionRate]);

  const metrics = calculateMetrics();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gradientFrom} to-${gradientTo} p-4 flex items-center justify-center`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className={`w-8 h-8 text-${primaryColor}-600`} />
          <h1 className="text-2xl font-bold text-gray-800">CPA Calculator</h1>
        </div>

        <div className="space-y-6">
          <CalculatorInput
            label="Total Ad Spend"
            value={totalSpend}
            onChange={setTotalSpend}
            icon={<DollarSign className="w-5 h-5 text-gray-400" />}
            prefix="$"
          />

          <CalculatorInput
            label="Total Visitors"
            value={totalVisitors}
            onChange={setTotalVisitors}
            icon={<Users className="w-5 h-5 text-gray-400" />}
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
                <p className="text-sm text-gray-600 mb-1">Cost per Visitor</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>${metrics.costPerVisitor}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Total Conversions</p>
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

export default CPACalculator;