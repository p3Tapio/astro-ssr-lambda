import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AstroSSRStack } from "../lib/astro-ssr-stack";
import { config } from "../lib/config";

const app = new cdk.App();

new AstroSSRStack(app, config.stackName, {
  env: config.env,
  description: "Astro SSR app",
});
