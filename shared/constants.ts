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
  hpcPlatforms: "High-Performance Computing (HPC) platforms like SCINet and Cyverse offer specialized computing resources, often through research grants or allocations.",
  vCPU: "Virtual CPU (vCPU) is a share of a physical CPU core. Each vCPU represents computational processing power and can handle tasks simultaneously. More vCPUs allow your application to process more operations in parallel.",
  memory: "Memory (RAM) is temporary, high-speed storage used by applications while they're running. More memory allows your application to keep more data readily accessible, which can improve performance for memory-intensive workloads.",
  storage: "Storage (disk space) is where your application's data is permanently saved. This includes your application code, databases, files, and other persistent data that needs to be retained even when the system is powered off.",
  interruptible: "Interruptible workloads can handle unexpected shutdowns and automatically resume later. These are ideal for batch processing, data analysis, and non-critical jobs that can be restarted from checkpoints.",
  region: "Geographic regions are physical locations around the world where cloud providers operate data centers. Choosing a region closer to your users can reduce latency and may help with data residency requirements."
};

// Help content for each step
export const HELP_CONTENT = {
  step1: {
    title: "Understanding Compute Requirements",
    content: [
      {
        heading: "What are vCPUs?",
        text: "Virtual CPUs (vCPUs) represent processing power. Choose based on your workload's computational needs. More CPU-intensive applications like data processing, video encoding, or scientific computing require more vCPUs."
      },
      {
        heading: "Memory (RAM) Considerations",
        text: "Memory is used for temporarily storing data being actively processed. Applications like databases, in-memory analytics, and container orchestration typically need more memory. Insufficient memory can cause severe performance issues."
      },
      {
        heading: "Storage Requirements",
        text: "Storage is for persisting data. Consider both capacity (how much data you need to store) and performance (how quickly data needs to be accessed). Databases, file servers, and content repositories need more storage."
      },
      {
        heading: "Interruptible Workloads",
        text: "Choosing interruptible instances can save 60-90% on costs but comes with the risk of sudden termination. Ideal for batch processing, rendering, CI/CD pipelines, and testing environments that can resume after interruption."
      }
    ]
  },
  step2: {
    title: "Choosing Platforms and Regions",
    content: [
      {
        heading: "Cloud Provider Differences",
        text: "Different providers offer various pricing models, service levels, and specialized services. AWS has the broadest service range, GCP often excels at data analytics, and Azure integrates well with Microsoft products."
      },
      {
        heading: "HPC Platform Advantages",
        text: "High-Performance Computing (HPC) platforms like SCINet and Cyverse may offer cost advantages for scientific and research workloads through grant-based allocations and optimized hardware for specific computations."
      },
      {
        heading: "Region Selection Factors",
        text: "Choose regions based on: proximity to users (for lower latency), compliance with data sovereignty laws, disaster recovery planning, and sometimes cost (pricing varies by region)."
      },
      {
        heading: "Multi-Cloud Strategy",
        text: "Comparing multiple providers helps avoid vendor lock-in and can optimize for both cost and performance. Some workloads may perform better or cost less on specific providers."
      }
    ]
  },
  step3: {
    title: "Interpreting Cost Comparisons",
    content: [
      {
        heading: "Understanding the Cost Breakdown",
        text: "Total costs include compute (CPU/memory), storage, network data transfer, and management overhead. Analyzing this breakdown helps identify areas for optimization."
      },
      {
        heading: "Interruption Risk Assessment",
        text: "The risk level indicates how likely an instance is to be reclaimed by the provider. Low-risk options may be reclaimed infrequently, while high-risk options may face frequent interruptions."
      },
      {
        heading: "Cost vs. Reliability Tradeoff",
        text: "Lower costs typically come with higher interruption risks or fewer guarantees. Consider your application's uptime requirements when making this tradeoff."
      },
      {
        heading: "Long-term Planning",
        text: "For long-running workloads, consider reserved instances or savings plans which offer discounts for 1-3 year commitments. These can save 40-60% compared to on-demand pricing."
      }
    ]
  }
};

// Slider ranges
export const SLIDER_RANGES = {
  cpuCount: { min: 1, max: 64, defaults: [1, 16, 32, 64] },
  memorySize: { min: 1, max: 256, defaults: [1, 64, 128, 256] },
  storageSize: { min: 10, max: 1000, defaults: [10, 250, 500, 1000] },
  hoursPerDay: { min: 1, max: 24, defaults: [1, 8, 16, 24] },
  daysPerMonth: { min: 1, max: 31, defaults: [1, 10, 20, 31] }
};
