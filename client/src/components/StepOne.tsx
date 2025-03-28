import { ComputeRequirements, UsagePattern } from "@shared/types";
import ResourceSlider from "./ResourceSlider";
import { SLIDER_RANGES, TOOLTIPS } from "@shared/constants";
import { ArrowRight, InfoIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-medium mb-6">Compute Requirements</h2>
          
          <div className="space-y-6">
            <ResourceSlider
              label="vCPUs"
              value={computeRequirements.cpuCount}
              min={SLIDER_RANGES.cpuCount.min}
              max={SLIDER_RANGES.cpuCount.max}
              defaultLabels={SLIDER_RANGES.cpuCount.defaults}
              unit="cores"
              onChange={(value) => onComputeRequirementsChange({ cpuCount: value })}
            />
            
            <ResourceSlider
              label="Memory"
              value={computeRequirements.memorySize}
              min={SLIDER_RANGES.memorySize.min}
              max={SLIDER_RANGES.memorySize.max}
              defaultLabels={SLIDER_RANGES.memorySize.defaults}
              unit="GB"
              onChange={(value) => onComputeRequirementsChange({ memorySize: value })}
            />
            
            <ResourceSlider
              label="Storage"
              value={computeRequirements.storageSize}
              min={SLIDER_RANGES.storageSize.min}
              max={SLIDER_RANGES.storageSize.max}
              defaultLabels={SLIDER_RANGES.storageSize.defaults}
              unit="GB"
              onChange={(value) => onComputeRequirementsChange({ storageSize: value })}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-medium mb-6">Usage Pattern</h2>
          
          <div className="space-y-6">
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
            
            <div>
              <label className="block font-medium mb-2">Can your workload tolerate interruptions?</label>
              <div className="flex items-center mb-3">
                <Checkbox 
                  id="interruptible" 
                  checked={usagePattern.isInterruptible}
                  onCheckedChange={(checked) => onUsagePatternChange({ isInterruptible: checked === true })}
                />
                <label htmlFor="interruptible" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Yes, use discounted 
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="border-b border-dotted border-gray-500 mx-1 cursor-help">
                          ephemeral compute
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p>{TOOLTIPS.ephemeralCompute}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  where possible
                </label>
              </div>
              <p className="text-sm text-neutral-dark">
                Note: Using ephemeral compute (e.g., AWS Spot, Google Preemptible) can save 60-90% but instances may be terminated with short notice.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={onNext} className="flex items-center">
          Next
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
