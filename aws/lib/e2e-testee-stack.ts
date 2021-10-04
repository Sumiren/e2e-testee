import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deploy from '@aws-cdk/aws-s3-deployment';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as iam from '@aws-cdk/aws-iam';

export class E2ETesteeStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketName = 'e2etestee';

    const bucket = new s3.Bucket(this, 'E2ETesteeBucket', {
      bucketName,
      websiteIndexDocument: 'index.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new s3Deploy.BucketDeployment(this, 'E2ETesteeBucketDeploy', {
      sources: [s3Deploy.Source.asset('../frontend/dist')],
      destinationBucket: bucket,
    });

    const cfOai = new cloudfront.OriginAccessIdentity(this, 'E2ETesteeBucketOai', {
      comment: 'Access identity for S3 bucket',
    });

    const principals =
      [new iam.CanonicalUserPrincipal(cfOai.cloudFrontOriginAccessIdentityS3CanonicalUserId)];
    const cfS3Access = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3:GetObject'],
      principals,
      resources: [`${bucket.bucketArn}/*`],
    });

    bucket.addToResourcePolicy(cfS3Access);

    // CloudFront Functionリソースの定義
    const redirectRootFunction = new cloudfront.Function(
      this,
      'RedirectRootFunction',
      {
        functionName: 'redirect-root',
        code: cloudfront.FunctionCode.fromFile({
          filePath: '../backend/src/cloudfront-functions/redirect-root-handler.js',
        }),
      },
    );

    const cfDist = new cloudfront.CloudFrontWebDistribution(this, 'CfDistribution', {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: cfOai,
        },
        behaviors: [
          {
            isDefaultBehavior: true,
            functionAssociations: [
              {
                eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
                function: redirectRootFunction,
              },
            ],
          },
        ],
      }],
    });
  }
}
