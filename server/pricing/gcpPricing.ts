import { CloudPricing } from "@shared/schema";

// This would normally fetch from GCP Pricing Catalog API
// For this demo, we'll return static data that reflects GCP pricing structure
export async function gcpGetPricing(region: string): Promise<CloudPricing[]> {
  const timestamp = new Date().toISOString();
  
  // Map our regions to GCP region names
  let gcpRegion = "us-east1"; // Default
  
  switch (region) {
    case "us-east":
      gcpRegion = "us-east1";
      break;
    case "us-west":
      gcpRegion = "us-west1";
      break;
    case "eu-west":
      gcpRegion = "europe-west1";
      break;
    case "ap-southeast":
      gcpRegion = "asia-southeast1";
      break;
  }
  
  // Define GCP Compute Engine instance types with pricing
  // Prices are approximations and would be updated from the GCP API in production
  const instances: CloudPricing[] = [
    {
      id: 101,
      provider: "gcp",
      region: region,
      instanceType: "e2-micro",
      vCpus: 2,
      memoryGb: 1,
      onDemandHourly: 0.0076,
      spotHourly: 0.0023,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 102,
      provider: "gcp",
      region: region,
      instanceType: "e2-small",
      vCpus: 2,
      memoryGb: 2,
      onDemandHourly: 0.0152,
      spotHourly: 0.0046,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 103,
      provider: "gcp",
      region: region,
      instanceType: "e2-medium",
      vCpus: 2,
      memoryGb: 4,
      onDemandHourly: 0.0304,
      spotHourly: 0.0091,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 104,
      provider: "gcp",
      region: region,
      instanceType: "n2-standard-2",
      vCpus: 2,
      memoryGb: 8,
      onDemandHourly: 0.0971,
      spotHourly: 0.0291,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 105,
      provider: "gcp",
      region: region,
      instanceType: "n2-standard-4",
      vCpus: 4,
      memoryGb: 16,
      onDemandHourly: 0.1942,
      spotHourly: 0.0583,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 106,
      provider: "gcp",
      region: region,
      instanceType: "n2-standard-8",
      vCpus: 8,
      memoryGb: 32,
      onDemandHourly: 0.3883,
      spotHourly: 0.1165,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 107,
      provider: "gcp",
      region: region,
      instanceType: "n2-standard-16",
      vCpus: 16,
      memoryGb: 64,
      onDemandHourly: 0.7766,
      spotHourly: 0.233,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 108,
      provider: "gcp",
      region: region,
      instanceType: "n2-standard-32",
      vCpus: 32,
      memoryGb: 128,
      onDemandHourly: 1.5533,
      spotHourly: 0.466,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 109,
      provider: "gcp",
      region: region,
      instanceType: "n2-standard-48",
      vCpus: 48,
      memoryGb: 192,
      onDemandHourly: 2.33,
      spotHourly: 0.699,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 110,
      provider: "gcp",
      region: region,
      instanceType: "n2-standard-64",
      vCpus: 64,
      memoryGb: 256,
      onDemandHourly: 3.1066,
      spotHourly: 0.932,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 111,
      provider: "gcp",
      region: region,
      instanceType: "n2-highmem-2",
      vCpus: 2,
      memoryGb: 16,
      onDemandHourly: 0.1311,
      spotHourly: 0.0393,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 112,
      provider: "gcp",
      region: region,
      instanceType: "n2-highmem-4",
      vCpus: 4,
      memoryGb: 32,
      onDemandHourly: 0.2622,
      spotHourly: 0.0787,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 113,
      provider: "gcp",
      region: region,
      instanceType: "n2-highmem-8",
      vCpus: 8,
      memoryGb: 64,
      onDemandHourly: 0.5244,
      spotHourly: 0.1573,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    },
    {
      id: 114,
      provider: "gcp",
      region: region,
      instanceType: "n2-highmem-16",
      vCpus: 16,
      memoryGb: 128,
      onDemandHourly: 1.0488,
      spotHourly: 0.3146,
      storageGbMonthly: 0.08,
      networkEgressGbCost: 0.11,
      lastUpdated: timestamp
    }
  ];
  
  return instances;
}
