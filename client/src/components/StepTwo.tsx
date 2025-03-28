import { PlatformSelections } from "@shared/types";
import { PLATFORMS, REGIONS } from "@shared/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StepTwoProps {
  platformSelections: PlatformSelections;
  onPlatformSelectionsChange: (updates: Partial<PlatformSelections>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function StepTwo({
  platformSelections,
  onPlatformSelectionsChange,
  onNext,
  onPrevious
}: StepTwoProps) {
  const handlePlatformChange = (platformId: string, isSelected: boolean) => {
    const updatedPlatforms = isSelected 
      ? [...platformSelections.selectedPlatforms, platformId]
      : platformSelections.selectedPlatforms.filter(id => id !== platformId);
    
    onPlatformSelectionsChange({ selectedPlatforms: updatedPlatforms });
  };
  
  return (
    <div>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-medium mb-4">Platform Preferences</h2>
          <p className="text-sm text-neutral-dark mb-6">Select which platforms you'd like to include in your cost comparison.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PLATFORMS.map((platform) => (
              <div key={platform.id} className="border rounded-lg p-4 flex items-start">
                <Checkbox 
                  id={platform.id} 
                  checked={platformSelections.selectedPlatforms.includes(platform.id)}
                  onCheckedChange={(checked) => handlePlatformChange(platform.id, checked === true)}
                />
                <div className="ml-3">
                  <label htmlFor={platform.id} className="font-medium">{platform.name}</label>
                  <p className="text-sm text-neutral-dark mt-1">{platform.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-medium mb-4">Region Preference</h2>
          
          <div className="mb-6">
            <label htmlFor="region" className="block text-sm font-medium mb-2">Select geographic region</label>
            <Select 
              value={platformSelections.region} 
              onValueChange={(value) => onPlatformSelectionsChange({ region: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-neutral-dark mt-2">Prices vary by region. We'll show you comparable regions across providers.</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onPrevious} className="flex items-center">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="flex items-center">
          Next
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
