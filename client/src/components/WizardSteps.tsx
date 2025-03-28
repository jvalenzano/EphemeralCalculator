import { ServerIcon, SettingsIcon, DollarSignIcon } from "lucide-react";

interface WizardStepsProps {
  currentStep: number;
}

export default function WizardSteps({ currentStep }: WizardStepsProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center relative z-10">
          <div 
            className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md border-2 transition-all duration-300 ${
              currentStep >= 1 
                ? 'bg-gradient-to-r from-primary to-primary/80 border-primary text-white' 
                : 'bg-white border-neutral-300 text-neutral-500'
            }`}
          >
            <ServerIcon className="h-6 w-6" />
          </div>
          <span className={`text-sm mt-3 font-medium transition-colors duration-300 ${
            currentStep === 1 ? 'text-primary' : 'text-neutral-500'
          }`}>Requirements</span>
        </div>
        
        {/* Connector 1-2 */}
        <div className="relative flex-1 mx-4">
          <div className="h-1 w-full absolute top-7 bg-neutral-200"></div>
          <div 
            className={`h-1 absolute top-7 bg-primary transition-all duration-500 ease-in-out ${
              currentStep >= 2 ? 'w-full' : 'w-0'
            }`}
          ></div>
        </div>
        
        {/* Step 2 */}
        <div className="flex flex-col items-center relative z-10">
          <div 
            className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md border-2 transition-all duration-300 ${
              currentStep >= 2 
                ? 'bg-gradient-to-r from-primary to-primary/80 border-primary text-white' 
                : 'bg-white border-neutral-300 text-neutral-500'
            }`}
          >
            <SettingsIcon className="h-6 w-6" />
          </div>
          <span className={`text-sm mt-3 font-medium transition-colors duration-300 ${
            currentStep === 2 ? 'text-primary' : 'text-neutral-500'
          }`}>Platform Options</span>
        </div>
        
        {/* Connector 2-3 */}
        <div className="relative flex-1 mx-4">
          <div className="h-1 w-full absolute top-7 bg-neutral-200"></div>
          <div 
            className={`h-1 absolute top-7 bg-primary transition-all duration-500 ease-in-out ${
              currentStep >= 3 ? 'w-full' : 'w-0'
            }`}
          ></div>
        </div>
        
        {/* Step 3 */}
        <div className="flex flex-col items-center relative z-10">
          <div 
            className={`w-14 h-14 flex items-center justify-center rounded-full shadow-md border-2 transition-all duration-300 ${
              currentStep >= 3 
                ? 'bg-gradient-to-r from-primary to-primary/80 border-primary text-white' 
                : 'bg-white border-neutral-300 text-neutral-500'
            }`}
          >
            <DollarSignIcon className="h-6 w-6" />
          </div>
          <span className={`text-sm mt-3 font-medium transition-colors duration-300 ${
            currentStep === 3 ? 'text-primary' : 'text-neutral-500'
          }`}>Cost Comparison</span>
        </div>
      </div>
    </div>
  );
}
