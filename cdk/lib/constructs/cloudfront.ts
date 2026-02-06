import {
  AllowedMethods,
  CacheHeaderBehavior,
  CachePolicy,
  CacheQueryStringBehavior,
  Distribution,
  OriginRequestPolicy,
  PriceClass,
  ResponseHeadersPolicy,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { IFunctionUrl } from "aws-cdk-lib/aws-lambda";
import {
  FunctionUrlOrigin,
  S3BucketOrigin,
} from "aws-cdk-lib/aws-cloudfront-origins";
import { Duration } from "aws-cdk-lib";

export interface CloudFrontDistributionProps {
  bucket: IBucket;
  lambdaFunctionUrl: IFunctionUrl;
}

export class CloudFrontDistribution extends Construct {
  public readonly distribution: Distribution;

  constructor(
    scope: Construct,
    id: string,
    props: CloudFrontDistributionProps,
  ) {
    super(scope, id);
    const { bucket, lambdaFunctionUrl } = props;

    const s3Origin = S3BucketOrigin.withOriginAccessControl(bucket);
    const lambdaOrigin =
      FunctionUrlOrigin.withOriginAccessControl(lambdaFunctionUrl);
    const responseHeadersPolicy = new ResponseHeadersPolicy(
      this,
      "ResponseHeadersPolicy",
      {
        customHeadersBehavior: {
          customHeaders: [
            {
              header: "Cache-Control",
              value: "public, max-age=300", // = 5 minutes  ¯\_(ツ)_/¯
              override: true,
            },
          ],
        },
      },
    );

    const commonBehaviour = {
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      allowedMethods: AllowedMethods.ALLOW_GET_HEAD,
      compress: true,
      responseHeadersPolicy,
    };

    this.distribution = new Distribution(this, "AstroSSRDistribution", {
      comment: "Astro SSR Distribution",
      priceClass: PriceClass.PRICE_CLASS_100,
      defaultBehavior: {
        ...commonBehaviour,
        origin: lambdaOrigin,
        originRequestPolicy: OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        cachePolicy: new CachePolicy(this, "DefaultCachePolicy", {
          minTtl: Duration.minutes(1),
          defaultTtl: Duration.days(1),
          maxTtl: Duration.days(7),
          queryStringBehavior: CacheQueryStringBehavior.all(),
          headerBehavior: CacheHeaderBehavior.none(),
        }),
      },
      additionalBehaviors: {
        "/assets/*": {
          ...commonBehaviour,
          origin: s3Origin,
          cachePolicy: new CachePolicy(this, "AssetsCachePolicy", {
            minTtl: Duration.days(365),
            defaultTtl: Duration.days(365),
            maxTtl: Duration.days(365),
            queryStringBehavior: CacheQueryStringBehavior.none(),
            headerBehavior: CacheHeaderBehavior.none(),
          }),
        },
        "/about": {
          ...commonBehaviour,
          origin: lambdaOrigin,
          originRequestPolicy:
            OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
          cachePolicy: new CachePolicy(this, "AboutCachePolicy", {
            minTtl: Duration.seconds(10),
            defaultTtl: Duration.hours(1),
            maxTtl: Duration.days(1),
            queryStringBehavior: CacheQueryStringBehavior.none(),
            headerBehavior: CacheHeaderBehavior.none(),
          }),
        },
      },
    });
  }
}
