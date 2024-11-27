import React, { useState, useCallback } from 'react';
import { Calculator, DollarSign, Users, Eye, TrendingUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CalculatorInput from './shared/CalculatorInput';

const AdRevenueCalculator = () => {
  const { primaryColor, gradientFrom, gradientTo } = useTheme();
  const [monthlyVisitors, setMonthlyVisitors] = useState('10000');
  const [pageViews, setPageViews] = useState('3');
  const [cpm, setCPM] = useState('2.5');

  const calculateMetrics = useCallback(() => {
    const visitors = parseFloat(monthlyVisitors) || 0;
    const views = parseFloat(pageViews) || 0;
    const cpmRate = parseFloat(cpm) || 0;

    const totalPageViews = visitors * views;
    const revenue = (totalPageViews / 1000) * cpmRate;
    const revenuePerVisitor = revenue / visitors;

    return {
      totalPageViews: totalPageViews.toLocaleString(),
      monthlyRevenue: revenue.toFixed(2),
      revenuePerVisitor: revenuePerVisitor.toFixed(3),
    };
  }, [monthlyVisitors, pageViews, cpm]);

  const metrics = calculateMetrics();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gradientFrom} to-${gradientTo} p-4 flex items-center justify-center`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className={`w-8 h-8 text-${primaryColor}-600`} />
          <h1 className="text-2xl font-bold text-gray-800">Ad Revenue Forecaster</h1>
        </div>

        <div className="space-y-6">
          <CalculatorInput
            label="Monthly Visitors"
            value={monthlyVisitors}
            onChange={setMonthlyVisitors}
            icon={<Users className="w-5 h-5 text-gray-400" />}
          />

          <CalculatorInput
            label="Pages per Visit"
            value={pageViews}
            onChange={setPageViews}
            icon={<Eye className="w-5 h-5 text-gray-400" />}
          />

          <CalculatorInput
            label="CPM Rate"
            value={cpm}
            onChange={setCPM}
            icon={<DollarSign className="w-5 h-5 text-gray-400" />}
            prefix="$"
          />

          <div className="mt-8 bg-gray-50 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 text-${primaryColor}-600`} />
              Forecast Results
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Total Page Views</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>{metrics.totalPageViews}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Revenue per Visitor</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>${metrics.revenuePerVisitor}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>${metrics.monthlyRevenue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdRevenueCalculator;