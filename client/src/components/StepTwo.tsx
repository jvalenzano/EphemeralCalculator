import { PlatformSelections, CloudProvider } from "@shared/types";
import { PLATFORMS, REGIONS, TOOLTIPS } from "@shared/constants";
import { ArrowLeft, ArrowRight, InfoIcon, Globe, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const handlePlatformChange = (platformId: CloudProvider, isSelected: boolean) => {
    const updatedPlatforms = isSelected 
      ? [...platformSelections.selectedPlatforms, platformId]
      : platformSelections.selectedPlatforms.filter(id => id !== platformId);
    
    onPlatformSelectionsChange({ selectedPlatforms: updatedPlatforms });
  };
  
  // Get the appropriate icon for each platform
  const getPlatformIcon = (platformId: CloudProvider) => {
    switch (platformId) {
      case 'aws':
        return <Server className="h-6 w-6 text-[#FF9900]" />;
      case 'gcp':
        return <Server className="h-6 w-6 text-[#4285F4]" />;
      case 'azure':
        return <Server className="h-6 w-6 text-[#0078D4]" />;
      case 'scinet':
      case 'cyverse':
        return <Globe className="h-6 w-6 text-primary" />;
      default:
        return <Globe className="h-6 w-6 text-primary" />;
    }
  };
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">Platform Preferences</h2>
        <p className="text-neutral-600 mb-6">Select which platforms you'd like to include in your cost comparison</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PLATFORMS.map((platform) => (
            <div 
              key={platform.id} 
              className={`bg-white border rounded-lg p-5 flex items-start transition-all duration-200 cursor-pointer hover:shadow-md ${
                platformSelections.selectedPlatforms.includes(platform.id) 
                  ? 'border-primary shadow-sm' 
                  : 'border-neutral-200'
              }`}
              onClick={() => handlePlatformChange(
                platform.id, 
                !platformSelections.selectedPlatforms.includes(platform.id)
              )}
            >
              <div className="mt-0.5">
                <Checkbox 
                  id={platform.id} 
                  checked={platformSelections.selectedPlatforms.includes(platform.id)}
                  onCheckedChange={(checked) => handlePlatformChange(platform.id, checked === true)}
                  className="h-5 w-5"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getPlatformIcon(platform.id)}
                    <label htmlFor={platform.id} className="font-medium text-lg">{platform.name}</label>
                  </div>
                  
                  {platform.id === 'scinet' || platform.id === 'cyverse' ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="h-4 w-4 text-neutral-400 hover:text-primary cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs bg-neutral-900 text-white">
                          <p>{TOOLTIPS.hpcPlatforms}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : null}
                </div>
                <p className="text-neutral-600 mt-2">{platform.description}</p>
                
                {platform.id === 'aws' && (
                  <div className="mt-3 px-3 py-2 bg-yellow-50 border-l-2 border-yellow-400 text-xs text-yellow-800 rounded">
                    AWS offers the broadest range of instance types for various workloads
                  </div>
                )}
                {platform.id === 'gcp' && (
                  <div className="mt-3 px-3 py-2 bg-blue-50 border-l-2 border-blue-400 text-xs text-blue-800 rounded">
                    GCP often provides the best performance-per-cost for data analytics workloads
                  </div>
                )}
                {platform.id === 'azure' && (
                  <div className="mt-3 px-3 py-2 bg-sky-50 border-l-2 border-sky-400 text-xs text-sky-800 rounded">
                    Azure integrates well with other Microsoft products and services
                  </div>
                )}
                {platform.id === 'scinet' && (
                  <div className="mt-3 px-3 py-2 bg-green-50 border-l-2 border-green-400 text-xs text-green-800 rounded">
                    SCINet offers specialized research computing resources for scientific workloads
                  </div>
                )}
                {platform.id === 'cyverse' && (
                  <div className="mt-3 px-3 py-2 bg-purple-50 border-l-2 border-purple-400 text-xs text-purple-800 rounded">
                    Cyverse provides grant-based allocations for scientific and academic research
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8 bg-white p-5 rounded-lg shadow-sm border border-neutral-200 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-medium text-lg">Region Preference</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon className="h-4 w-4 text-neutral-400 hover:text-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-neutral-900 text-white">
                <p>{TOOLTIPS.region}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="mb-6">
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
          <p className="text-sm text-neutral-600 mt-3">
            Prices vary by region. We'll show you comparable regions across providers.
            Generally, US regions tend to be less expensive than European or Asia-Pacific regions.
          </p>
        </div>
        
        <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-900">
          <p className="font-medium">Region Selection Tip</p>
          <p className="mt-1">
            Choose regions closer to your end users to minimize latency. 
            Data transfer between regions can incur additional costs, so plan accordingly.
          </p>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onPrevious} className="flex items-center px-6 py-6 text-lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Back to Requirements</span>
        </Button>
        
        <Button onClick={onNext} className="flex items-center px-6 py-6 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg transition-all duration-200">
          <span>Continue to Cost Comparison</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
