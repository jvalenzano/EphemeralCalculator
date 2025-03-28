import { ProviderCostEstimate } from "@shared/types";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CostChartProps {
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

// Helper function to get instance type display name
const getInstanceTypeDisplay = (provider: string, instanceType: string, isInterruptible: boolean): string => {
  const providerDisplay = formatProviderName(provider);
  const instanceDisplay = instanceType;
  
  if (isInterruptible) {
    switch (provider) {
      case 'aws':
        return `${providerDisplay} (Spot)`;
      case 'gcp':
        return `${providerDisplay} (Preemptible)`;
      case 'azure':
        return `${providerDisplay} (Spot)`;
      case 'scinet':
        return `${providerDisplay} (Fixed)`;
      case 'cyverse':
        return `${providerDisplay} (Grant)`;
      default:
        return `${providerDisplay} (${instanceDisplay})`;
    }
  }
  
  return `${providerDisplay} (On-Demand)`;
};

export default function CostChart({ estimates }: CostChartProps) {
  // Prepare data for the chart
  const chartData = estimates.map(estimate => ({
    name: getInstanceTypeDisplay(estimate.provider, estimate.instanceType, estimate.isInterruptible),
    cost: estimate.monthlyCost,
    provider: estimate.provider,
    instanceType: estimate.instanceType,
    isInterruptible: estimate.isInterruptible
  }));
  
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Monthly Cost Estimate</h3>
      <div className="h-64">
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
              tickFormatter={(value) => {
                const provider = value.split(' ')[0];
                return provider;
              }}
            />
            <YAxis 
              label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }} 
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Monthly Cost']}
              labelFormatter={(label) => label}
            />
            <Legend />
            <Bar 
              dataKey="cost" 
              name="Monthly Cost" 
              fill="hsl(var(--primary))" 
              barSize={60}
              label={{ 
                position: 'top', 
                formatter: (value) => `$${value}`,
                fontSize: 12
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
