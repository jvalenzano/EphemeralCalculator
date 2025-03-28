import { useState } from "react";
import { Cloud } from "lucide-react";
import WizardSteps from "@/components/WizardSteps";
import StepOne from "@/components/StepOne";
import StepTwo from "@/components/StepTwo";
import StepThree from "@/components/StepThree";
import { ComputeRequirements, UsagePattern, PlatformSelections, ProviderCostEstimate, WizardState } from "@shared/types";
import { PLATFORMS } from "@shared/constants";

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

  return (
    <div className="min-h-screen bg-neutral-light flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Cloud className="text-primary mr-2" size={24} />
            <h1 className="text-xl md:text-2xl font-medium">Ephemeral Compute Cost Calculator</h1>
          </div>
          <div>
            <button 
              className="p-2 rounded-full hover:bg-neutral-light transition-colors" 
              aria-label="Help"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
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
    </div>
  );
}
