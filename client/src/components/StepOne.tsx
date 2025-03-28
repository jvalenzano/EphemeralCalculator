import { ComputeRequirements, UsagePattern } from "@shared/types";
import ResourceSlider from "./ResourceSlider";
import { SLIDER_RANGES, TOOLTIPS } from "@shared/constants";
import { ArrowRight, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

interface StepOneProps {
  computeRequirements: ComputeRequirements;
  usagePattern: UsagePattern;
  onComputeRequirementsChange: (updates: Partial<ComputeRequirements>) => void;
  onUsagePatternChange: (updates: Partial<UsagePattern>) => void;
  onNext: () => void;
}

export default function StepOne({
  computeRequirements,
  usagePattern,
  onComputeRequirementsChange,
  onUsagePatternChange,
  onNext
}: StepOneProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Compute Requirements</h2>
        <p className="text-neutral-600 mb-6">Configure the compute resources you need for your workload</p>
          
        <ResourceSlider
          label="vCPUs"
          value={computeRequirements.cpuCount}
          min={SLIDER_RANGES.cpuCount.min}
          max={SLIDER_RANGES.cpuCount.max}
          defaultLabels={SLIDER_RANGES.cpuCount.defaults}
          unit="cores"
          onChange={(value) => onComputeRequirementsChange({ cpuCount: value })}
          tooltipKey="vCPU"
        />
        
        <ResourceSlider
          label="Memory"
          value={computeRequirements.memorySize}
          min={SLIDER_RANGES.memorySize.min}
          max={SLIDER_RANGES.memorySize.max}
          defaultLabels={SLIDER_RANGES.memorySize.defaults}
          unit="GB"
          onChange={(value) => onComputeRequirementsChange({ memorySize: value })}
          tooltipKey="memory"
        />
        
        <ResourceSlider
          label="Storage"
          value={computeRequirements.storageSize}
          min={SLIDER_RANGES.storageSize.min}
          max={SLIDER_RANGES.storageSize.max}
          defaultLabels={SLIDER_RANGES.storageSize.defaults}
          unit="GB"
          onChange={(value) => onComputeRequirementsChange({ storageSize: value })}
          tooltipKey="storage"
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Usage Pattern</h2>
        <p className="text-neutral-600 mb-6">Define how long and how often you need these resources</p>
        
        <ResourceSlider
          label="Hours per day"
          value={usagePattern.hoursPerDay}
          min={SLIDER_RANGES.hoursPerDay.min}
          max={SLIDER_RANGES.hoursPerDay.max}
          defaultLabels={SLIDER_RANGES.hoursPerDay.defaults}
          unit="hours"
          onChange={(value) => onUsagePatternChange({ hoursPerDay: value })}
        />
        
        <ResourceSlider
          label="Days per month"
          value={usagePattern.daysPerMonth}
          min={SLIDER_RANGES.daysPerMonth.min}
          max={SLIDER_RANGES.daysPerMonth.max}
          defaultLabels={SLIDER_RANGES.daysPerMonth.defaults}
          unit="days"
          onChange={(value) => onUsagePatternChange({ daysPerMonth: value })}
        />
        
        <div className="bg-white p-5 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-medium text-lg">Workload Flexibility</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-neutral-400 hover:text-primary cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-neutral-900 text-white">
                  <p>{TOOLTIPS.interruptible}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          <div className="flex items-center gap-2 mb-3 p-3 bg-neutral-50 rounded-md">
            <Checkbox 
              id="interruptible" 
              checked={usagePattern.isInterruptible}
              onCheckedChange={(checked) => onUsagePatternChange({ isInterruptible: checked === true })}
              className="h-5 w-5"
            />
            <label htmlFor="interruptible" className="text-base font-medium leading-none">
              Yes, use discounted 
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="border-b border-dotted border-gray-500 mx-1 cursor-help">
                      ephemeral compute
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-900 text-white">
                    <p>{TOOLTIPS.ephemeralCompute}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              where possible
            </label>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-900">
            <p className="font-medium">Cost-Saving Tip</p>
            <p className="mt-1">
              Using ephemeral compute options like AWS Spot, Google Preemptible or Azure Spot VMs can save 60-90% compared to on-demand pricing. These are ideal for batch jobs, rendering, testing, and other interruptible workloads.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={onNext} className="flex items-center px-6 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all duration-200">
          <span>Continue to Platform Options</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
