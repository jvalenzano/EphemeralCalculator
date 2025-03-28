import { useState } from "react";
import { ProviderCostEstimate } from "@shared/types";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Sector, 
  Tooltip, 
  XAxis, 
  YAxis,
  Cell,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Activity } from "lucide-react";

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

// Colors for different chart elements
const CHART_COLORS = [
  "#3366CC", "#DC3912", "#FF9900", "#109618", "#990099",
  "#0099C6", "#DD4477", "#66AA00", "#B82E2E", "#316395"
];

// Custom component for active shape in pie chart
const renderActiveShape = (props: any) => {
  const { 
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value 
  } = props;
  
  const sin = Math.sin(-midAngle * Math.PI / 180);
  const cos = Math.cos(-midAngle * Math.PI / 180);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm">
        {formatProviderName(payload.provider)}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
        {`$${value.toFixed(2)}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" className="text-xs">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function CostChart({ estimates }: CostChartProps) {
  const [chartType, setChartType] = useState<"bar" | "pie" | "line" | "radial">("bar");
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Prepare data for the chart
  const chartData = estimates.map((estimate, index) => ({
    name: getInstanceTypeDisplay(estimate.provider, estimate.instanceType, estimate.isInterruptible),
    cost: estimate.monthlyCost,
    provider: estimate.provider,
    instanceType: estimate.instanceType,
    isInterruptible: estimate.isInterruptible,
    fill: CHART_COLORS[index % CHART_COLORS.length]
  }));
  
  // Data for the breakdown visualization
  const breakdownData = estimates.map((estimate, index) => {
    const { compute, storage, networkEgress, management } = estimate.breakdown;
    return [
      { name: "Compute", value: compute, provider: estimate.provider, fill: CHART_COLORS[0] },
      { name: "Storage", value: storage, provider: estimate.provider, fill: CHART_COLORS[1] },
      { name: "Network", value: networkEgress, provider: estimate.provider, fill: CHART_COLORS[2] },
      { name: "Management", value: management, provider: estimate.provider, fill: CHART_COLORS[3] }
    ];
  }).flat();
  
  // Custom tooltip for bar chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border shadow-lg rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">{`Monthly Cost: $${payload[0].value.toFixed(2)}`}</p>
          {payload[0].payload.isInterruptible && (
            <p className="text-xs text-neutral-dark">Interruptible Instance</p>
          )}
        </div>
      );
    }
    return null;
  };
  
  // Handle pie chart sector hover
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  return (
    <Card className="border p-0 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Monthly Cost Estimate</h3>
          <div className="flex space-x-2">
            <Button 
              variant={chartType === "bar" ? "default" : "outline"} 
              size="sm"
              className="gap-1"
              onClick={() => setChartType("bar")}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline-block">Bar</span>
            </Button>
            <Button 
              variant={chartType === "pie" ? "default" : "outline"} 
              size="sm"
              className="gap-1"
              onClick={() => setChartType("pie")}
            >
              <PieChartIcon className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline-block">Pie</span>
            </Button>
            <Button 
              variant={chartType === "line" ? "default" : "outline"} 
              size="sm"
              className="gap-1"
              onClick={() => setChartType("line")}
            >
              <LineChartIcon className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline-block">Line</span>
            </Button>
            <Button 
              variant={chartType === "radial" ? "default" : "outline"} 
              size="sm"
              className="gap-1"
              onClick={() => setChartType("radial")}
            >
              <Activity className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only sm:inline-block">Radial</span>
            </Button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
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
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="cost" 
                  name="Monthly Cost" 
                  barSize={60}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            ) : chartType === "pie" ? (
              <PieChart>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="cost"
                  onMouseEnter={onPieEnter}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${(value as number).toFixed(2)}`, 'Monthly Cost']} />
                <Legend 
                  formatter={(value) => value.split(' ')[0]} 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                />
              </PieChart>
            ) : chartType === "line" ? (
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
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
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  name="Monthly Cost" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            ) : (
              <RadialBarChart 
                innerRadius="20%" 
                outerRadius="90%" 
                data={chartData} 
                startAngle={90} 
                endAngle={-270}
                cx="50%"
                cy="50%"
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, estimates.length > 0 ? Math.max(...estimates.map(e => e.monthlyCost)) * 1.2 : 100]}
                  tick={false}
                />
                <RadialBar
                  label={{ position: 'insideStart', fill: '#fff', fontSize: 12 }}
                  background
                  dataKey="cost"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </RadialBar>
                <Tooltip 
                  formatter={(value) => [`$${(value as number).toFixed(2)}`, 'Monthly Cost']}
                  labelFormatter={(index) => chartData[index as number].name}
                />
                <Legend 
                  iconSize={10}
                  formatter={(value) => value.split(' ')[0]} 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                />
              </RadialBarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
