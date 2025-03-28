import { CloudPricing } from "@shared/schema";

// This would normally fetch from Azure Retail Prices API
// For this demo, we'll return static data that reflects Azure pricing structure
export async function azureGetPricing(region: string): Promise<CloudPricing[]> {
  const timestamp = new Date().toISOString();
  
  // Map our regions to Azure region names
  let azureRegion = "eastus"; // Default
  
  switch (region) {
    case "us-east":
      azureRegion = "eastus";
      break;
    case "us-west":
      azureRegion = "westus";
      break;
    case "eu-west":
      azureRegion = "westeurope";
      break;
    case "ap-southeast":
      azureRegion = "southeastasia";
      break;
  }
  
  // Define Azure VM instance types with pricing
  // Prices are approximations and would be updated from the Azure API in production
  const instances: CloudPricing[] = [
    {
      id: 201,
      provider: "azure",
      region: region,
      instanceType: "B2s",
      vCpus: 2,
      memoryGb: 4,
      onDemandHourly: 0.0416,
      spotHourly: 0.0125,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 202,
      provider: "azure",
      region: region,
      instanceType: "B2ms",
      vCpus: 2,
      memoryGb: 8,
      onDemandHourly: 0.0832,
      spotHourly: 0.025,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 203,
      provider: "azure",
      region: region,
      instanceType: "B4ms",
      vCpus: 4,
      memoryGb: 16,
      onDemandHourly: 0.166,
      spotHourly: 0.05,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 204,
      provider: "azure",
      region: region,
      instanceType: "B8ms",
      vCpus: 8,
      memoryGb: 32,
      onDemandHourly: 0.333,
      spotHourly: 0.1,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 205,
      provider: "azure",
      region: region,
      instanceType: "D2s v3",
      vCpus: 2,
      memoryGb: 8,
      onDemandHourly: 0.096,
      spotHourly: 0.029,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 206,
      provider: "azure",
      region: region,
      instanceType: "D4s v3",
      vCpus: 4,
      memoryGb: 16,
      onDemandHourly: 0.192,
      spotHourly: 0.058,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 207,
      provider: "azure",
      region: region,
      instanceType: "D8s v3",
      vCpus: 8,
      memoryGb: 32,
      onDemandHourly: 0.384,
      spotHourly: 0.115,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 208,
      provider: "azure",
      region: region,
      instanceType: "D16s v3",
      vCpus: 16,
      memoryGb: 64,
      onDemandHourly: 0.768,
      spotHourly: 0.23,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 209,
      provider: "azure",
      region: region,
      instanceType: "D32s v3",
      vCpus: 32,
      memoryGb: 128,
      onDemandHourly: 1.536,
      spotHourly: 0.461,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 210,
      provider: "azure",
      region: region,
      instanceType: "E2s v3",
      vCpus: 2,
      memoryGb: 16,
      onDemandHourly: 0.126,
      spotHourly: 0.038,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 211,
      provider: "azure",
      region: region,
      instanceType: "E4s v3",
      vCpus: 4,
      memoryGb: 32,
      onDemandHourly: 0.252,
      spotHourly: 0.076,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 212,
      provider: "azure",
      region: region,
      instanceType: "E8s v3",
      vCpus: 8,
      memoryGb: 64,
      onDemandHourly: 0.504,
      spotHourly: 0.151,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 213,
      provider: "azure",
      region: region,
      instanceType: "E16s v3",
      vCpus: 16,
      memoryGb: 128,
      onDemandHourly: 1.008,
      spotHourly: 0.302,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    },
    {
      id: 214,
      provider: "azure",
      region: region,
      instanceType: "E32s v3",
      vCpus: 32,
      memoryGb: 256,
      onDemandHourly: 2.016,
      spotHourly: 0.605,
      storageGbMonthly: 0.095,
      networkEgressGbCost: 0.087,
      lastUpdated: timestamp
    }
  ];
  
  return instances;
}
