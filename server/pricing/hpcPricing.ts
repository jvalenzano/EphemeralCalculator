import { CloudPricing } from "@shared/schema";
import { CloudProvider } from "@shared/types";

// This would normally be based on actual HPC platform costs
// For this demo, we'll return static data that represents typical HPC pricing
export async function hpcGetPricing(provider: CloudProvider, region: string): Promise<CloudPricing[]> {
  const timestamp = new Date().toISOString();
  
  // For SCINet - annual cost of approximately $19,762 as mentioned in requirements
  // Convert to hourly rates for different compute tiers
  if (provider === 'scinet') {
    const instances: CloudPricing[] = [
      {
        id: 301,
        provider: "scinet",
        region: region,
        instanceType: "SCINet Basic",
        vCpus: 2,
        memoryGb: 8,
        onDemandHourly: 0.12,
        spotHourly: null, // No spot/preemptible equivalent
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0.00, // Often included in allocation
        lastUpdated: timestamp
      },
      {
        id: 302,
        provider: "scinet",
        region: region,
        instanceType: "SCINet Standard",
        vCpus: 4,
        memoryGb: 16,
        onDemandHourly: 0.24,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0.00,
        lastUpdated: timestamp
      },
      {
        id: 303,
        provider: "scinet",
        region: region,
        instanceType: "SCINet Advanced",
        vCpus: 8,
        memoryGb: 32,
        onDemandHourly: 0.48,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0.00,
        lastUpdated: timestamp
      },
      {
        id: 304,
        provider: "scinet",
        region: region,
        instanceType: "SCINet High Performance",
        vCpus: 16,
        memoryGb: 64,
        onDemandHourly: 0.96,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0.00,
        lastUpdated: timestamp
      },
      {
        id: 305,
        provider: "scinet",
        region: region,
        instanceType: "SCINet Enterprise",
        vCpus: 32,
        memoryGb: 128,
        onDemandHourly: 1.92,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0.00,
        lastUpdated: timestamp
      },
      {
        id: 306,
        provider: "scinet",
        region: region,
        instanceType: "SCINet Maximum",
        vCpus: 64,
        memoryGb: 256,
        onDemandHourly: 3.84,
        spotHourly: null,
        storageGbMonthly: 0.05,
        networkEgressGbCost: 0.00,
        lastUpdated: timestamp
      }
    ];
    return instances;
  }
  
  // For Cyverse - grant-based allocations
  // Slightly lower cost than SCINet but with some interruption possibility
  if (provider === 'cyverse') {
    const instances: CloudPricing[] = [
      {
        id: 401,
        provider: "cyverse",
        region: region,
        instanceType: "Cyverse Basic",
        vCpus: 2,
        memoryGb: 8,
        onDemandHourly: 0.10,
        spotHourly: 0.08, // Discounted but still available
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 402,
        provider: "cyverse",
        region: region,
        instanceType: "Cyverse Standard",
        vCpus: 4,
        memoryGb: 16,
        onDemandHourly: 0.20,
        spotHourly: 0.16,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 403,
        provider: "cyverse",
        region: region,
        instanceType: "Cyverse Advanced",
        vCpus: 8,
        memoryGb: 32,
        onDemandHourly: 0.40,
        spotHourly: 0.32,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 404,
        provider: "cyverse",
        region: region,
        instanceType: "Cyverse High Performance",
        vCpus: 16,
        memoryGb: 64,
        onDemandHourly: 0.80,
        spotHourly: 0.64,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 405,
        provider: "cyverse",
        region: region,
        instanceType: "Cyverse Enterprise",
        vCpus: 32,
        memoryGb: 128,
        onDemandHourly: 1.60,
        spotHourly: 1.28,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      },
      {
        id: 406,
        provider: "cyverse",
        region: region,
        instanceType: "Cyverse Maximum",
        vCpus: 64,
        memoryGb: 256,
        onDemandHourly: 3.20,
        spotHourly: 2.56,
        storageGbMonthly: 0.04,
        networkEgressGbCost: 0.01,
        lastUpdated: timestamp
      }
    ];
    return instances;
  }
  
  return [];
}
