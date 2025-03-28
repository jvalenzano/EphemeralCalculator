// Resource requirement types
export interface ComputeRequirements {
  cpuCount: number;
  memorySize: number;
  storageSize: number;
}

export interface UsagePattern {
  hoursPerDay: number;
  daysPerMonth: number;
  isInterruptible: boolean;
}

// Platform types
export type CloudProvider = 'aws' | 'gcp' | 'azure' | 'scinet' | 'cyverse';

export interface PlatformSelections {
  selectedPlatforms: CloudProvider[];
  region: string;
}

// Instance & pricing types
export interface InstanceType {
  name: string;
  vCpus: number;
  memoryGb: number;
  provider: CloudProvider;
  region: string;
}

export interface PricingData {
  provider: CloudProvider;
  region: string;
  instanceType: string;
  onDemandHourly: number;
  spotHourly?: number;
  storageGbMonthly: number;
  networkEgressGbCost: number;
}

// Cost calculation types
export interface CostBreakdown {
  compute: number;
  storage: number;
  networkEgress: number;
  management: number;
  total: number;
}

export interface ProviderCostEstimate {
  provider: CloudProvider;
  instanceType: string;
  monthlyCost: number;
  isInterruptible: boolean;
  interruptionRisk: 'None' | 'Low' | 'Medium' | 'High';
  breakdown: CostBreakdown;
}

export interface CostEstimateRequest {
  cpuCount: number;
  memorySize: number;
  storageSize: number;
  hoursPerDay: number;
  daysPerMonth: number;
  isInterruptible: boolean;
  selectedPlatforms: CloudProvider[];
  region: string;
}

export interface CostEstimateResponse {
  estimates: ProviderCostEstimate[];
  timestamp: string;
}

// Form wizard state types
export interface WizardState {
  currentStep: number;
  computeRequirements: ComputeRequirements;
  usagePattern: UsagePattern;
  platformSelections: PlatformSelections;
  costEstimates: ProviderCostEstimate[] | null;
}
