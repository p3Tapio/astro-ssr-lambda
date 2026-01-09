import * as cdk from "aws-cdk-lib";

export interface AppConfig {
  env: {
    account: string;
    region: string;
  };
  stackName: string;
  projectName: string;
}

export const config: AppConfig = {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT !,
    region: process.env.CDK_DEFAULT_REGION!,
  },
  stackName: "AstroSSRStack",
  projectName: "astro-ssr",
};

export const getResourceName = (resourceType: string): string => {
  return `${config.projectName}-${resourceType}-${cdk.Aws.ACCOUNT_ID}`;
};
