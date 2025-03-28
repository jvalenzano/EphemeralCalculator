import { ProviderCostEstimate } from "@shared/types";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  Cell
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface CostBreakdownChartProps {
  estimates: ProviderCostEstimate[];
}

// Helper function to format provider names for display
const formatProviderName = (provider: string): string => {
  switch (provider) {
    case 'aws':
      return 'AWS';
    case 'gcp':
      return 'GCP';
    case 'azure':
      return 'Azure';
    case 'scinet':
      return 'SCINet';
    case 'cyverse':
      return 'Cyverse';
    default:
      return provider;
  }
};

// Colors for different cost components
const COMPONENT_COLORS = {
  compute: "#3366CC",
  storage: "#DC3912",
  networkEgress: "#FF9900",
  management: "#109618"
};

export default function CostBreakdownChart({ estimates }: CostBreakdownChartProps) {
  // Transform data for stacked bar chart
  const chartData = estimates.map(estimate => ({
    name: formatProviderName(estimate.provider),
    compute: estimate.breakdown.compute,
    storage: estimate.breakdown.storage,
    networkEgress: estimate.breakdown.networkEgress,
    management: estimate.breakdown.management,
    total: estimate.breakdown.total,
    provider: estimate.provider,
    instanceType: estimate.instanceType,
    isInterruptible: estimate.isInterruptible
  }));
  
  // Custom tooltip for breakdown chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border shadow-lg rounded-md">
          <p className="font-medium text-sm mb-1">{label}</p>
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center text-xs mb-1">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 mr-1 rounded-sm" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.name === 'networkEgress' ? 'Network' : item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
              </div>
              <span>${item.value.toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-1 pt-1 flex justify-between items-center text-xs font-medium">
            <span>Total</span>
            <span>${chartData.find(item => item.name === label)?.total.toFixed(2)}</span>
          </div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="border p-0 overflow-hidden">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-4">Cost Breakdown by Component</h3>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis 
                label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="compute" 
                name="Compute" 
                stackId="a" 
                fill={COMPONENT_COLORS.compute}
              />
              <Bar 
                dataKey="storage" 
                name="Storage" 
                stackId="a" 
                fill={COMPONENT_COLORS.storage}
              />
              <Bar 
                dataKey="networkEgress" 
                name="Network" 
                stackId="a" 
                fill={COMPONENT_COLORS.networkEgress}
              />
              <Bar 
                dataKey="management" 
                name="Management" 
                stackId="a" 
                fill={COMPONENT_COLORS.management}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-neutral-dark">
          <p>This chart shows the cost breakdown across different resource components for each cloud provider.</p>
        </div>
      </CardContent>
    </Card>
  );
}