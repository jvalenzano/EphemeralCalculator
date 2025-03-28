import { useState } from "react";
import { Cloud, HelpCircle } from "lucide-react";
import WizardSteps from "@/components/WizardSteps";
import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import StepThree from "@/components/StepThree";
import HelpDialog from "@/components/HelpDialog";
import { ComputeRequirements, UsagePattern, PlatformSelections, ProviderCostEstimate, WizardState, SavedConfiguration } from "@shared/types";
import { PLATFORMS } from "@shared/constants";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [state, setState] = useState<WizardState>({
    currentStep: 1,
    computeRequirements: {
      cpuCount: 4,
      memorySize: 16,
      storageSize: 100
    },
    usagePattern: {
      hoursPerDay: 8,
      daysPerMonth: 22,
      isInterruptible: true
    },
    platformSelections: {
      selectedPlatforms: PLATFORMS.map(p => p.id),
      region: 'us-east'
    },
    costEstimates: null
  });
  
  // State for help dialog
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  
  // Toast hook for notifications
  const { toast } = useToast();

  const updateComputeRequirements = (updates: Partial<ComputeRequirements>) => {
    setState(prev => ({
      ...prev,
      computeRequirements: {
        ...prev.computeRequirements,
        ...updates
      }
    }));
  };

  const updateUsagePattern = (updates: Partial<UsagePattern>) => {
    setState(prev => ({
      ...prev,
      usagePattern: {
        ...prev.usagePattern,
        ...updates
      }
    }));
  };

  const updatePlatformSelections = (updates: Partial<PlatformSelections>) => {
    setState(prev => ({
      ...prev,
      platformSelections: {
        ...prev.platformSelections,
        ...updates
      }
    }));
  };

  const updateCostEstimates = (estimates: ProviderCostEstimate[] | null) => {
    setState(prev => ({
      ...prev,
      costEstimates: estimates
    }));
  };

  const goToStep = (step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: step
    }));
  };

  const goToNextStep = () => {
    if (state.currentStep < 3) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1
      }));
    }
  };

  const goToPreviousStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep - 1
      }));
    }
  };

  const resetWizard = () => {
    setState({
      currentStep: 1,
      computeRequirements: {
        cpuCount: 4,
        memorySize: 16,
        storageSize: 100
      },
      usagePattern: {
        hoursPerDay: 8,
        daysPerMonth: 22,
        isInterruptible: true
      },
      platformSelections: {
        selectedPlatforms: PLATFORMS.map(p => p.id),
        region: 'us-east'
      },
      costEstimates: null
    });
  };
  
  // Function to load a saved configuration
  const loadConfiguration = (config: SavedConfiguration) => {
    setState(prev => ({
      ...prev,
      computeRequirements: config.computeRequirements,
      usagePattern: config.usagePattern,
      platformSelections: config.platformSelections,
      costEstimates: null, // Reset cost estimates to trigger a new calculation
      currentStep: 3 // Go to the final step for cost calculation
    }));
    
    toast({
      title: "Configuration Loaded",
      description: `"${config.name}" has been loaded successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Header */}
      <header className="bg-primary shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Cloud className="text-white mr-2" size={24} />
            <h1 className="text-xl md:text-2xl font-medium text-white">
              Ephemeral Compute Cost Calculator
            </h1>
          </div>
          <div>
            <Button 
              variant="ghost" 
              size="lg"
              className="rounded-full hover:bg-white/10 p-2" 
              onClick={() => setHelpDialogOpen(true)}
              aria-label="Help"
            >
              <HelpCircle className="h-8 w-8 text-white" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Step Progress */}
        <WizardSteps currentStep={state.currentStep} />
        
        {/* Wizard Content */}
        <div className="max-w-4xl mx-auto">
          {state.currentStep === 1 && (
            <StepOne 
              computeRequirements={state.computeRequirements}
              usagePattern={state.usagePattern}
              onComputeRequirementsChange={updateComputeRequirements}
              onUsagePatternChange={updateUsagePattern}
              onNext={goToNextStep}
            />
          )}
          
          {state.currentStep === 2 && (
            <StepTwo 
              platformSelections={state.platformSelections}
              onPlatformSelectionsChange={updatePlatformSelections}
              onNext={goToNextStep}
              onPrevious={goToPreviousStep}
            />
          )}
          
          {state.currentStep === 3 && (
            <StepThree 
              computeRequirements={state.computeRequirements}
              usagePattern={state.usagePattern}
              platformSelections={state.platformSelections}
              costEstimates={state.costEstimates}
              onCostEstimatesChange={updateCostEstimates}
              onPrevious={goToPreviousStep}
              onReset={resetWizard}
              onLoadConfiguration={loadConfiguration}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-darkest text-neutral-light py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Ephemeral Compute Cost Calculator | Last updated: {new Date().toLocaleDateString()} | Pricing data refreshed daily</p>
          <p className="mt-2">For questions or support, contact <a href="mailto:support@example.com" className="text-primary-light hover:underline">support@example.com</a></p>
        </div>
      </footer>
      
      {/* Help dialog component */}
      <HelpDialog 
        open={helpDialogOpen} 
        onOpenChange={setHelpDialogOpen}
        currentStep={state.currentStep}
      />
    </div>
  );
}
