import { ProviderCostEstimate } from "@shared/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface CostTableProps {
  estimates: ProviderCostEstimate[];
}

// Helper function to format provider names for display
const formatProviderName = (provider: string): string => {
  switch (provider) {
    case 'aws':
      return 'AWS';
    case 'gcp':
      return 'GCP';
    case 'azure':
      return 'Azure';
    case 'scinet':
      return 'SCINet';
    case 'cyverse':
      return 'Cyverse';
    default:
      return provider;
  }
};

// Helper function to determine badge color based on interruption risk
const getBadgeVariant = (risk: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (risk) {
    case 'None':
      return 'secondary';
    case 'Low':
      return 'outline';
    case 'Medium':
    case 'High':
      return 'destructive';
    default:
      return 'default';
  }
};

export default function CostTable({ estimates }: CostTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Platform</TableHead>
            <TableHead>Instance Type</TableHead>
            <TableHead className="text-right">Monthly Cost</TableHead>
            <TableHead>Interruption Risk</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {estimates.map((estimate, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {formatProviderName(estimate.provider)}
              </TableCell>
              <TableCell>
                {estimate.instanceType}
                {estimate.isInterruptible && (
                  <span className="ml-1 text-xs text-neutral-dark">
                    ({estimate.provider === 'aws' 
                      ? 'Spot' 
                      : estimate.provider === 'gcp' 
                        ? 'Preemptible' 
                        : estimate.provider === 'azure' 
                          ? 'Spot' 
                          : estimate.provider === 'scinet' 
                            ? 'Fixed' 
                            : 'Grant'})
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">${estimate.monthlyCost.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(estimate.interruptionRisk)}>
                  {estimate.interruptionRisk}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
