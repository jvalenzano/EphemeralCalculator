import { CloudProvider } from "./types";

// Regions available in the calculator
export const REGIONS = [
  { id: 'us-east', name: 'US East (N. Virginia)' },
  { id: 'us-west', name: 'US West (Oregon)' },
  { id: 'eu-west', name: 'Europe (Ireland)' },
  { id: 'ap-southeast', name: 'Asia Pacific (Singapore)' }
];

// Platform display information
export interface PlatformInfo {
  id: CloudProvider;
  name: string;
  description: string;
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    description: 'EC2 Instances with on-demand and spot pricing options'
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform (GCP)',
    description: 'Compute Engine VMs with on-demand and preemptible options'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    description: 'Virtual Machines with pay-as-you-go and spot options'
  },
  {
    id: 'scinet',
    name: 'SCINet',
    description: 'High-performance computing platform with fixed allocations'
  },
  {
    id: 'cyverse',
    name: 'Cyverse',
    description: 'Scientific computing with grant-based allocations'
  }
];

// Tooltips for technical terms
export const TOOLTIPS = {
  ephemeralCompute: "Ephemeral compute includes AWS Spot Instances, Google Cloud Preemptible VMs, and Azure Spot VMs. These are deeply discounted but may be terminated with little notice.",
  spotInstances: "Spot/Preemptible instances are unused compute capacity offered at steep discounts (60-90% off), but can be reclaimed by the provider with little notice (2 minutes to hours).",
  onDemand: "On-demand instances are full-price compute resources that run until you choose to stop them, with no interruption risk but at higher cost.",
  hpcPlatforms: "High-Performance Computing (HPC) platforms like SCINet and Cyverse offer specialized computing resources, often through research grants or allocations."
};

// Slider ranges
export const SLIDER_RANGES = {
  cpuCount: { min: 1, max: 64, defaults: [1, 16, 32, 64] },
  memorySize: { min: 1, max: 256, defaults: [1, 64, 128, 256] },
  storageSize: { min: 10, max: 1000, defaults: [10, 250, 500, 1000] },
  hoursPerDay: { min: 1, max: 24, defaults: [1, 8, 16, 24] },
  daysPerMonth: { min: 1, max: 31, defaults: [1, 10, 20, 31] }
};
