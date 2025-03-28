import { useState, useEffect } from "react";
import { InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { TOOLTIPS } from "@shared/constants";

interface ResourceSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  defaultLabels: number[];
  unit: string;
  onChange: (value: number) => void;
  tooltipKey?: keyof typeof TOOLTIPS;
}

export default function ResourceSlider({ 
  label, 
  value, 
  min, 
  max, 
  defaultLabels, 
  unit, 
  onChange,
  tooltipKey
}: ResourceSliderProps) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);
  
  const handleChange = (newValue: number[]) => {
    setDisplayValue(newValue[0]);
    onChange(newValue[0]);
  };
  
  // Calculate gradient percentages for tick marks
  const calculateTickPosition = (tickValue: number) => {
    return ((tickValue - min) / (max - min)) * 100;
  };
  
  // Get tooltip content if tooltipKey is provided
  const tooltipContent = tooltipKey ? TOOLTIPS[tooltipKey] : null;
  
  return (
    <div className="mb-8 bg-white p-5 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md hover:border-primary/30 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <label className="font-medium text-lg">{label}</label>
          {tooltipContent && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-5 w-5 text-primary hover:text-primary-dark cursor-help transition-colors" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-primary-dark text-white p-3 text-sm shadow-lg">
                  <p>{tooltipContent}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">{displayValue}</span>
          <span className="text-neutral-dark text-lg ml-1">{unit}</span>
        </div>
      </div>
      
      <div className="mb-2">
        <Slider 
          min={min} 
          max={max} 
          step={1}
          value={[displayValue]} 
          onValueChange={handleChange}
          className="py-4"
        />
      </div>
      
      <div className="mt-2 px-2 py-3 relative">
        <div className="flex justify-between mb-1">
          {defaultLabels.map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-3 w-1 bg-neutral-400 mb-1.5"></div>
              <span className="text-sm font-medium text-neutral-700">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
