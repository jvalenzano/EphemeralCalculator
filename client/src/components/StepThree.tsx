import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ComputeRequirements, UsagePattern, PlatformSelections, ProviderCostEstimate, CostEstimateRequest, CostEstimateResponse } from "@shared/types";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, RefreshCcw, FileDown, Mail, Info, BarChart3, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import CostChart from "./CostChart";
import CostTable from "./CostTable";
import CostBreakdownChart from "./CostBreakdownChart";
import PricingInfoDialog from "./PricingInfoDialog";

interface StepThreeProps {
  computeRequirements: ComputeRequirements;
  usagePattern: UsagePattern;
  platformSelections: PlatformSelections;
  costEstimates: ProviderCostEstimate[] | null;
  onCostEstimatesChange: (estimates: ProviderCostEstimate[] | null) => void;
  onPrevious: () => void;
  onReset: () => void;
}

export default function StepThree({
  computeRequirements,
  usagePattern,
  platformSelections,
  costEstimates,
  onCostEstimatesChange,
  onPrevious,
  onReset
}: StepThreeProps) {
  const [viewTab, setViewTab] = useState<string>("total-cost");
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const { toast } = useToast();
  
  // Prepare the request payload
  const requestPayload: CostEstimateRequest = {
    cpuCount: computeRequirements.cpuCount,
    memorySize: computeRequirements.memorySize,
    storageSize: computeRequirements.storageSize,
    hoursPerDay: usagePattern.hoursPerDay,
    daysPerMonth: usagePattern.daysPerMonth,
    isInterruptible: usagePattern.isInterruptible,
    selectedPlatforms: platformSelections.selectedPlatforms,
    region: platformSelections.region
  };
  
  // Use React Query to fetch cost estimates
  const { data, isLoading, error } = useQuery<CostEstimateResponse, Error>({
    queryKey: ['/api/calculate', JSON.stringify(requestPayload)],
    queryFn: async () => {
      const response = await apiRequest('POST', '/api/calculate', requestPayload);
      return response.json();
    }
  });
  
  // Update parent state when data is received
  useEffect(() => {
    if (data) {
      onCostEstimatesChange(data.estimates);
    }
  }, [data, onCostEstimatesChange]);
  
  // Handle download report action
  const handleDownloadReport = () => {
    if (!costEstimates) return;
    
    // Generate CSV content
    let csvContent = "Provider,Instance Type,Monthly Cost,Interruption Risk,Compute Cost,Storage Cost,Network Cost,Management Cost\n";
    
    costEstimates.forEach(estimate => {
      csvContent += `${estimate.provider},${estimate.instanceType},${estimate.monthlyCost},${estimate.interruptionRisk},${estimate.breakdown.compute},${estimate.breakdown.storage},${estimate.breakdown.networkEgress},${estimate.breakdown.management}\n`;
    });
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'cloud-cost-estimates.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Handle email report action
  const handleEmailReport = () => {
    toast({
      title: "Email Report",
      description: "This feature would open a dialog to enter an email address for sending the report.",
    });
  };
  
  // Determine lowest cost estimate provider
  const lowestCostEstimate = costEstimates && costEstimates.length > 0 
    ? costEstimates.reduce((prev, current) => 
        (prev.monthlyCost < current.monthlyCost) ? prev : current
      )
    : null;
  
  return (
    <div>
      <Card className="mb-6 overflow-hidden">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[250px] w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load cost estimates. Please try again.
              </AlertDescription>
            </Alert>
          ) : costEstimates && costEstimates.length > 0 ? (
            <>
              <Tabs defaultValue="total-cost" value={viewTab} onValueChange={setViewTab} className="w-full mb-6">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="total-cost">Total Cost View</TabsTrigger>
                    <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
                  </TabsList>
                  
                  {viewTab === "total-cost" && (
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={viewMode === "chart" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setViewMode("chart")}
                        className="gap-1"
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only sm:inline-block">Chart</span>
                      </Button>
                      <Button 
                        variant={viewMode === "table" ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setViewMode("table")}
                        className="gap-1"
                      >
                        <TableIcon className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only sm:inline-block">Table</span>
                      </Button>
                    </div>
                  )}
                </div>
                
                <TabsContent value="total-cost" className="mt-2">
                  {viewMode === "chart" ? (
                    <div className="mt-4">
                      <CostChart estimates={costEstimates} />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <CostTable estimates={costEstimates} />
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="breakdown" className="mt-2">
                  <div className="mt-4">
                    <CostBreakdownChart estimates={costEstimates} />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="bg-neutral-lightest p-4 rounded-lg border border-neutral-medium">
                <div className="flex items-start">
                  <Info className="text-warning h-5 w-5 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Disclaimer</h4>
                    <p className="text-sm text-neutral-dark mb-2">These estimates are based on current pricing as of today and may vary. Actual costs depend on real usage patterns and potential price changes by service providers.</p>
                    <div className="flex justify-end">
                      <PricingInfoDialog />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-6">
              <p>No cost estimates available for the selected platforms and region.</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {lowestCostEstimate && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-medium mb-4">Lowest Cost Option Details</h2>
            
            <div className="mb-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2 text-blue-800">
                  {lowestCostEstimate.provider.toUpperCase()} - {lowestCostEstimate.instanceType}
                  {lowestCostEstimate.isInterruptible && (
                    <span className="ml-2 text-sm bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                      {lowestCostEstimate.provider === 'aws' 
                        ? 'Spot' 
                        : lowestCostEstimate.provider === 'gcp' 
                          ? 'Preemptible' 
                          : lowestCostEstimate.provider === 'azure' 
                            ? 'Spot' 
                            : lowestCostEstimate.provider === 'scinet' 
                              ? 'Fixed' 
                              : 'Grant'}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-blue-700">
                  Monthly Cost: <span className="font-bold">${lowestCostEstimate.monthlyCost.toFixed(2)}</span>
                  {lowestCostEstimate.isInterruptible && (
                    <span className="ml-2">• Interruption Risk: {lowestCostEstimate.interruptionRisk}</span>
                  )}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-dark mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>Compute ({computeRequirements.cpuCount} vCPUs, {computeRequirements.memorySize}GB RAM)</span>
                  </div>
                  <span className="font-medium">${lowestCostEstimate.breakdown.compute.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-dark mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span>Storage ({computeRequirements.storageSize}GB)</span>
                  </div>
                  <span className="font-medium">${lowestCostEstimate.breakdown.storage.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-dark mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span>Network Egress (Estimated)</span>
                  </div>
                  <span className="font-medium">${lowestCostEstimate.breakdown.networkEgress.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-dark mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Management & Services</span>
                  </div>
                  <span className="font-medium">${lowestCostEstimate.breakdown.management.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-medium">Total Monthly Estimate</span>
                  <span className="text-lg font-medium">${lowestCostEstimate.breakdown.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="secondary" 
                className="flex items-center justify-center" 
                onClick={handleDownloadReport}
              >
                <FileDown className="mr-1 h-4 w-4" />
                Download Report
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-center"
                onClick={handleEmailReport}
              >
                <Mail className="mr-1 h-4 w-4" />
                Email Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onPrevious} className="flex items-center">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onReset} className="flex items-center">
          Start Over
          <RefreshCcw className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
