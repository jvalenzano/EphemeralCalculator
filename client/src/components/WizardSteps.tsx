interface WizardStepsProps {
  currentStep: number;
}

export default function WizardSteps({ currentStep }: WizardStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
            currentStep >= 1 ? 'bg-primary text-white' : 'bg-neutral-medium text-neutral-dark'
          } font-medium`}>
            1
          </div>
          <span className="text-sm mt-2 text-center">Requirements</span>
        </div>
        
        <div className={`h-2 flex-1 mx-2 ${currentStep >= 2 ? 'bg-primary' : 'bg-neutral-medium'}`}></div>
        
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
            currentStep >= 2 ? 'bg-primary text-white' : 'bg-neutral-medium text-neutral-dark'
          } font-medium`}>
            2
          </div>
          <span className="text-sm mt-2 text-center">Platform Options</span>
        </div>
        
        <div className={`h-2 flex-1 mx-2 ${currentStep >= 3 ? 'bg-primary' : 'bg-neutral-medium'}`}></div>
        
        <div className="flex flex-col items-center">
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
            currentStep >= 3 ? 'bg-primary text-white' : 'bg-neutral-medium text-neutral-dark'
          } font-medium`}>
            3
          </div>
          <span className="text-sm mt-2 text-center">Cost Comparison</span>
        </div>
      </div>
    </div>
  );
}
