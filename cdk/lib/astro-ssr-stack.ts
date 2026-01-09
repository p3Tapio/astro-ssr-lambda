import * as cdk from "aws-cdk-lib/core";
import { Construct } from "constructs";
import { S3Bucket } from "./constructs/s3-bucket";
import { SSRLambda } from "./constructs/ssr-lambda";
import * as path from "path";

export class AstroSSRStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const s3Bucket = new S3Bucket(this, "StaticAssets", {
      removalPolicy: cdk.RemovalPolicy.DESTROY, // TODO: retain?
    });

    new SSRLambda(this, "SSRLambda", {
      staticBucket: s3Bucket.bucket,
      serverCodePath: path.join(__dirname, "../../dist/lambda"),
    });
  }
}
