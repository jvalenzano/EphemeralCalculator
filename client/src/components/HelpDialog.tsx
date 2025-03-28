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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{stepContent.title}</DialogTitle>
          <DialogDescription className="text-base">
            Get help with understanding the options on this step
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {stepContent.content.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-neutral-dark hover:text-neutral-darkest">
                  {item.heading}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  <p>{item.text}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}