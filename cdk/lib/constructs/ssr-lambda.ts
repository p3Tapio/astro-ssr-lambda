import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { getResourceName } from "../config";
import { Runtime, Code, Function, FunctionUrl } from "aws-cdk-lib/aws-lambda";
import { Duration } from "aws-cdk-lib";

export interface SSRLambdaProps {
  serverCodePath: string;
}

export class SSRLambda extends Construct {
  public readonly function: Function;
  public readonly functionUrl: FunctionUrl;

  constructor(scope: Construct, id: string, props: SSRLambdaProps) {
    super(scope, id);

    const { serverCodePath } = props;
    const functionName = getResourceName("ssr-function");

    this.function = new lambda.Function(this, "Function", {
      functionName,
      runtime: Runtime.NODEJS_24_X,
      handler: "entry.handler",
      code: Code.fromAsset(serverCodePath),
      memorySize: 512,
      timeout: Duration.seconds(5),
      environment: {
        NODE_ENV: "production",
      },
    });

    this.functionUrl = this.function.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.AWS_IAM,
    });
  }
}
