import instanceOp, { InstanceOperationOptions } from './utils/member-action';

export function memberAction<IN = any, OUT = any>(options: InstanceOperationOptions<IN, OUT>) {
  return function createMemberActionDescriptor(target: any, propertyName: string): any {
    return {
      value: instanceOp(options)
    };
  }
}

