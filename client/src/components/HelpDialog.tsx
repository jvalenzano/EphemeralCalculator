import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HELP_CONTENT } from '@shared/constants';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStep: number;
}

export default function HelpDialog({ open, onOpenChange, currentStep }: HelpDialogProps) {
  const [stepContent, setStepContent] = useState<{
    title: string;
    content: Array<{ heading: string; text: string }>;
  }>(HELP_CONTENT.step1);

  useEffect(() => {
    // Set the appropriate content based on the current step
    switch (currentStep) {
      case 1:
        setStepContent(HELP_CONTENT.step1);
        break;
      case 2:
        setStepContent(HELP_CONTENT.step2);
        break;
      case 3:
        setStepContent(HELP_CONTENT.step3);
        break;
      default:
        setStepContent(HELP_CONTENT.step1);
    }
  }, [currentStep]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-green-100 border-green-300">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-green-900">{stepContent.title}</DialogTitle>
          <DialogDescription className="text-base text-green-800">
            Get help with understanding the options on this step
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {stepContent.content.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-green-200">
                <AccordionTrigger className="text-lg font-medium text-green-800 hover:text-green-900 py-4">
                  {item.heading}
                </AccordionTrigger>
                <AccordionContent className="text-base bg-white p-4 rounded-lg mb-2 border-l-4 border-green-600 shadow-sm">
                  <p className="text-neutral-700">{item.text}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}