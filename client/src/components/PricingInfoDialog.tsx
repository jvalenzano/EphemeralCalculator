import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InfoIcon } from "lucide-react";

export default function PricingInfoDialog() {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          <InfoIcon className="h-4 w-4" />
          <span>Pricing Data Sources</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-900">How Cost Estimates Are Generated</DialogTitle>
          <DialogDescription className="text-base text-blue-700">
            Learn about our pricing data sources and calculation methodology
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Data Sources</h3>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="aws-pricing" className="border-b border-blue-200">
              <AccordionTrigger className="text-blue-800 hover:text-blue-900 py-4">
                AWS Pricing Data
              </AccordionTrigger>
              <AccordionContent className="bg-blue-50 p-4 rounded-lg mb-2 text-neutral-800">
                <p className="mb-2">
                  AWS pricing data is sourced from the AWS Price List API, which provides up-to-date pricing for EC2 instances, storage, and data transfer.
                </p>
                <p className="text-sm text-neutral-600">
                  The data is refreshed daily to ensure accuracy. The calculator considers on-demand and spot pricing options based on your selections.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="gcp-pricing" className="border-b border-blue-200">
              <AccordionTrigger className="text-blue-800 hover:text-blue-900 py-4">
                Google Cloud Platform Pricing Data
              </AccordionTrigger>
              <AccordionContent className="bg-blue-50 p-4 rounded-lg mb-2 text-neutral-800">
                <p className="mb-2">
                  GCP pricing information is sourced from the Google Cloud Pricing API, which provides current pricing for Compute Engine instances, storage, and networking.
                </p>
                <p className="text-sm text-neutral-600">
                  The calculator factors in standard VM instances and preemptible VM options based on your requirements.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="azure-pricing" className="border-b border-blue-200">
              <AccordionTrigger className="text-blue-800 hover:text-blue-900 py-4">
                Microsoft Azure Pricing Data
              </AccordionTrigger>
              <AccordionContent className="bg-blue-50 p-4 rounded-lg mb-2 text-neutral-800">
                <p className="mb-2">
                  Azure pricing data is collected from the Azure Retail Prices API, which provides pricing for virtual machines, storage accounts, and network services.
                </p>
                <p className="text-sm text-neutral-600">
                  Both standard and spot instances are considered based on your configuration choices.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="hpc-pricing" className="border-b border-blue-200">
              <AccordionTrigger className="text-blue-800 hover:text-blue-900 py-4">
                HPC Platforms (SCINet, Cyverse) Pricing Data
              </AccordionTrigger>
              <AccordionContent className="bg-blue-50 p-4 rounded-lg mb-2 text-neutral-800">
                <p className="mb-2">
                  Pricing for HPC platforms like SCINet and Cyverse is based on published allocation rates, grant structures, and utility computing models from these providers.
                </p>
                <p className="text-sm text-neutral-600">
                  For academic and research institutions, special pricing models are applied that account for institutional agreements and resource allocation methods.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <h3 className="text-lg font-medium mt-8 mb-4">Calculation Methodology</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="mb-3">
              All cost estimates are calculated using the following components:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-neutral-800">
              <li>
                <strong>Compute Costs:</strong> Based on the specified CPU and memory requirements, matched to the closest instance type from each provider.
              </li>
              <li>
                <strong>Storage Costs:</strong> Calculated using the provider's pricing for the requested storage capacity and recommended storage type.
              </li>
              <li>
                <strong>Network Egress:</strong> Estimated based on typical usage patterns for your workload type.
              </li>
              <li>
                <strong>Management & Services:</strong> Includes additional costs for any required management services, monitoring, or support.
              </li>
            </ul>
            <p className="mt-4 text-sm text-neutral-600">
              These calculations provide a realistic estimate of monthly cloud costs, but actual costs may vary based on your specific usage patterns and any special pricing agreements you may have with providers.
            </p>
          </div>
          
          <div className="mt-8 p-4 border border-yellow-300 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Important Note:</h4>
            <p className="text-sm text-yellow-700">
              This calculator provides estimates for comparison purposes only. For production deployments or budget planning, we recommend consulting with cloud provider representatives for the most accurate and up-to-date pricing information.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}