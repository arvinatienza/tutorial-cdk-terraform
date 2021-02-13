import { Construct } from 'constructs';
import { App, TerraformStack, Token } from 'cdktf';
import { AwsProvider } from './.gen/providers/aws';
import { Subnet } from './.gen/providers/aws/subnet';
import { Vpc } from './.gen/providers/aws/vpc';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);


    new AwsProvider(this, 'aws', {
      region: 'us-east-1'
    });

    const vpc = new Vpc(this, 'test-vpc', {
      cidrBlock: '10.0.0.0/16'
    });

    new Subnet(this, 'my-subnet', {
      vpcId: Token.asString(vpc.id),
      cidrBlock: '10.0.0.0/24'
    });
  }
}

const app = new App();
new MyStack(app, 'tutorial-cdk-terraform');
app.synth();
