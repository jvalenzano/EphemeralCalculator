import { useState, useEffect } from "react";

interface ResourceSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  defaultLabels: number[];
  unit: string;
  onChange: (value: number) => void;
}

export default function ResourceSlider({ 
  label, 
  value, 
  min, 
  max, 
  defaultLabels, 
  unit, 
  onChange 
}: ResourceSliderProps) {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setDisplayValue(newValue);
    onChange(newValue);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="font-medium">{label}</label>
        <div className="text-right">
          <span className="text-lg font-medium">{displayValue}</span>
          <span className="text-neutral-dark"> {unit}</span>
        </div>
      </div>
      
      <input 
        type="range" 
        min={min} 
        max={max} 
        value={displayValue} 
        onChange={handleChange}
        className="w-full h-2 bg-neutral-medium rounded-lg appearance-none cursor-pointer"
      />
      
      <div className="flex justify-between text-xs text-neutral-dark mt-1">
        {defaultLabels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  );
}
