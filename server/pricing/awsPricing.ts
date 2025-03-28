import { CloudPricing } from "@shared/schema";

// This would normally fetch from AWS Price List API
// For this demo, we'll return static data that reflects AWS pricing structure
export async function awsGetPricing(region: string): Promise<CloudPricing[]> {
  const timestamp = new Date().toISOString();
  
  // Map our regions to AWS region names
  let awsRegion = "us-east-1"; // Default
  
  switch (region) {
    case "us-east":
      awsRegion = "us-east-1";
      break;
    case "us-west":
      awsRegion = "us-west-2";
      break;
    case "eu-west":
      awsRegion = "eu-west-1";
      break;
    case "ap-southeast":
      awsRegion = "ap-southeast-1";
      break;
  }
  
  // Define AWS EC2 instance types with pricing
  // Prices are approximations and would be updated from the AWS API in production
  const instances: CloudPricing[] = [
    {
      id: 1,
      provider: "aws",
      region: region,
      instanceType: "t3.micro",
      vCpus: 2,
      memoryGb: 1,
      onDemandHourly: 0.0104,
      spotHourly: 0.0031,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 2,
      provider: "aws",
      region: region,
      instanceType: "t3.small",
      vCpus: 2,
      memoryGb: 2,
      onDemandHourly: 0.0208,
      spotHourly: 0.0062,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 3,
      provider: "aws",
      region: region,
      instanceType: "t3.medium",
      vCpus: 2,
      memoryGb: 4,
      onDemandHourly: 0.0416,
      spotHourly: 0.0125,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 4,
      provider: "aws",
      region: region,
      instanceType: "c5.large",
      vCpus: 2,
      memoryGb: 4,
      onDemandHourly: 0.085,
      spotHourly: 0.0255,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 5,
      provider: "aws",
      region: region,
      instanceType: "c5.xlarge",
      vCpus: 4,
      memoryGb: 8,
      onDemandHourly: 0.17,
      spotHourly: 0.051,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 6,
      provider: "aws",
      region: region,
      instanceType: "c5.2xlarge",
      vCpus: 8,
      memoryGb: 16,
      onDemandHourly: 0.34,
      spotHourly: 0.102,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 7,
      provider: "aws",
      region: region,
      instanceType: "c5.4xlarge",
      vCpus: 16,
      memoryGb: 32,
      onDemandHourly: 0.68,
      spotHourly: 0.204,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 8,
      provider: "aws",
      region: region,
      instanceType: "c5.9xlarge",
      vCpus: 36,
      memoryGb: 72,
      onDemandHourly: 1.53,
      spotHourly: 0.459,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 9,
      provider: "aws",
      region: region,
      instanceType: "c5.18xlarge",
      vCpus: 72,
      memoryGb: 144,
      onDemandHourly: 3.06,
      spotHourly: 0.918,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 10,
      provider: "aws",
      region: region,
      instanceType: "r5.large",
      vCpus: 2,
      memoryGb: 16,
      onDemandHourly: 0.126,
      spotHourly: 0.0378,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 11,
      provider: "aws",
      region: region,
      instanceType: "r5.xlarge",
      vCpus: 4,
      memoryGb: 32,
      onDemandHourly: 0.252,
      spotHourly: 0.0756,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 12,
      provider: "aws",
      region: region,
      instanceType: "r5.2xlarge",
      vCpus: 8,
      memoryGb: 64,
      onDemandHourly: 0.504,
      spotHourly: 0.1512,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 13,
      provider: "aws",
      region: region,
      instanceType: "r5.4xlarge",
      vCpus: 16,
      memoryGb: 128,
      onDemandHourly: 1.008,
      spotHourly: 0.3024,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    },
    {
      id: 14,
      provider: "aws",
      region: region,
      instanceType: "r5.12xlarge",
      vCpus: 48,
      memoryGb: 384,
      onDemandHourly: 3.024,
      spotHourly: 0.9072,
      storageGbMonthly: 0.10,
      networkEgressGbCost: 0.09,
      lastUpdated: timestamp
    }
  ];
  
  return instances;
}
