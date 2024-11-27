import React, { useState, useCallback } from 'react';
import { Calculator, Package, Clock, TrendingUp, ArrowDownUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import CalculatorInput from './shared/CalculatorInput';

const InventoryCalculator = () => {
  const { primaryColor, gradientFrom, gradientTo } = useTheme();
  const [averageDemand, setAverageDemand] = useState('100');
  const [leadTime, setLeadTime] = useState('14');
  const [safetyStock, setSafetyStock] = useState('20');

  const calculateMetrics = useCallback(() => {
    const demand = parseFloat(averageDemand) || 0;
    const lead = parseFloat(leadTime) || 0;
    const safety = parseFloat(safetyStock) || 0;

    const reorderPoint = (demand * (lead / 30)) + safety;
    const optimalOrderQuantity = Math.sqrt((2 * demand * 30 * 10) / 2) // EOQ formula with estimated ordering cost and holding cost
    const maxInventory = reorderPoint + optimalOrderQuantity;

    return {
      reorderPoint: Math.ceil(reorderPoint),
      optimalOrderQuantity: Math.ceil(optimalOrderQuantity),
      maxInventory: Math.ceil(maxInventory),
    };
  }, [averageDemand, leadTime, safetyStock]);

  const metrics = calculateMetrics();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${gradientFrom} to-${gradientTo} p-4 flex items-center justify-center`}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className={`w-8 h-8 text-${primaryColor}-600`} />
          <h1 className="text-2xl font-bold text-gray-800">Inventory Forecaster</h1>
        </div>

        <div className="space-y-6">
          <CalculatorInput
            label="Average Monthly Demand"
            value={averageDemand}
            onChange={setAverageDemand}
            icon={<Package className="w-5 h-5 text-gray-400" />}
          />

          <CalculatorInput
            label="Lead Time (Days)"
            value={leadTime}
            onChange={setLeadTime}
            icon={<Clock className="w-5 h-5 text-gray-400" />}
          />

          <CalculatorInput
            label="Safety Stock"
            value={safetyStock}
            onChange={setSafetyStock}
            icon={<ArrowDownUp className="w-5 h-5 text-gray-400" />}
          />

          <div className="mt-8 bg-gray-50 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 text-${primaryColor}-600`} />
              Inventory Metrics
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Reorder Point</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>{metrics.reorderPoint} units</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600 mb-1">Optimal Order Qty</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>{metrics.optimalOrderQuantity} units</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm col-span-2">
                <p className="text-sm text-gray-600 mb-1">Maximum Inventory</p>
                <p className={`text-xl font-bold text-${primaryColor}-600`}>{metrics.maxInventory} units</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryCalculator;