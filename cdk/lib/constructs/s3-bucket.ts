import { Construct } from "constructs";
import { Bucket, BlockPublicAccess } from "aws-cdk-lib/aws-s3";
import { RemovalPolicy } from "aws-cdk-lib";
import { getResourceName } from "../config";

export interface S3BucketProps {
  removalPolicy: RemovalPolicy;
}

export class S3Bucket extends Construct {
  public readonly bucket: Bucket;

  constructor(scope: Construct, id: string, props: S3BucketProps) {
    super(scope, id);

    const bucketName = getResourceName("s3-bucket");

    this.bucket = new Bucket(this, "Bucket", {
      bucketName,
      removalPolicy: props.removalPolicy,
      autoDeleteObjects: props.removalPolicy === RemovalPolicy.DESTROY,
      publicReadAccess: false,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    });
  }
}
