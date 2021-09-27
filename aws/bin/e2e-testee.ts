#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { E2ETesteeStack } from '../lib/e2e-testee-stack';

const app = new cdk.App();
new E2ETesteeStack(app, 'E2ETesteeStack');
