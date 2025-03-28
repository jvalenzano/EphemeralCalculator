import { ServerIcon, SettingsIcon, DollarSignIcon } from "lucide-react";

interface WizardStepsProps {
  currentStep: number;
}

export default function WizardSteps({ currentStep }: WizardStepsProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-col items-center justify-center mb-2">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">
            <span className="text-blue-900">Step {currentStep} of 3:</span> {' '}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              {currentStep === 1 ? 'Define Resource Requirements' : 
               currentStep === 2 ? 'Choose Cloud Platforms' : 
               'Review Cost Comparison'}
            </span>
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center relative z-10">
          <div 
            className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 transition-all duration-300 ${
              currentStep > 1 
                ? 'bg-primary/20 border-primary text-primary' 
                : currentStep === 1
                  ? 'bg-primary border-primary/30 text-white scale-125 ring-4 ring-primary/30 shadow-xl shadow-primary/20'
                  : 'bg-white border-neutral-300 text-neutral-500'
            }`}
          >
            <ServerIcon className={`${currentStep === 1 ? 'h-8 w-8' : 'h-6 w-6'}`} />
          </div>
          <span className={`mt-3 font-bold transition-all duration-300 ${
            currentStep === 1 ? 'text-primary text-base scale-110' : currentStep > 1 ? 'text-primary/70 text-sm' : 'text-neutral-500 text-sm'
          }`}>1. Requirements</span>
        </div>
        
        {/* Connector 1-2 */}
        <div className="relative flex-1 mx-4">
          <div className="h-2 w-full absolute top-7 bg-neutral-200 rounded-full"></div>
          <div 
            className={`h-2 absolute top-7 bg-primary rounded-full transition-all duration-500 ease-in-out ${
              currentStep >= 2 ? 'w-full' : 'w-0'
            }`}
          ></div>
        </div>
        
        {/* Step 2 */}
        <div className="flex flex-col items-center relative z-10">
          <div 
            className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 transition-all duration-300 ${
              currentStep > 2 
                ? 'bg-primary/20 border-primary text-primary' 
                : currentStep === 2
                  ? 'bg-primary border-primary/30 text-white scale-125 ring-4 ring-primary/30 shadow-xl shadow-primary/20'
                  : 'bg-white border-neutral-300 text-neutral-500'
            }`}
          >
            <SettingsIcon className={`${currentStep === 2 ? 'h-8 w-8' : 'h-6 w-6'}`} />
          </div>
          <span className={`mt-3 font-bold transition-all duration-300 ${
            currentStep === 2 ? 'text-primary text-base scale-110' : currentStep > 2 ? 'text-primary/70 text-sm' : 'text-neutral-500 text-sm'
          }`}>2. Platform Options</span>
        </div>
        
        {/* Connector 2-3 */}
        <div className="relative flex-1 mx-4">
          <div className="h-2 w-full absolute top-7 bg-neutral-200 rounded-full"></div>
          <div 
            className={`h-2 absolute top-7 bg-primary rounded-full transition-all duration-500 ease-in-out ${
              currentStep >= 3 ? 'w-full' : 'w-0'
            }`}
          ></div>
        </div>
        
        {/* Step 3 */}
        <div className="flex flex-col items-center relative z-10">
          <div 
            className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg border-4 transition-all duration-300 ${
              currentStep > 3 
                ? 'bg-primary/20 border-primary text-primary' 
                : currentStep === 3
                  ? 'bg-primary border-primary/30 text-white scale-125 ring-4 ring-primary/30 shadow-xl shadow-primary/20'
                  : 'bg-white border-neutral-300 text-neutral-500'
            }`}
          >
            <DollarSignIcon className={`${currentStep === 3 ? 'h-8 w-8' : 'h-6 w-6'}`} />
          </div>
          <span className={`mt-3 font-bold transition-all duration-300 ${
            currentStep === 3 ? 'text-primary text-base scale-110' : currentStep > 3 ? 'text-primary/70 text-sm' : 'text-neutral-500 text-sm'
          }`}>3. Cost Comparison</span>
        </div>
      </div>
    </div>
  );
}
