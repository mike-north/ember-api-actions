import collectionOp, { CollectionOperationOptions } from './utils/collection-action';
import instanceOp, { InstanceOperationOptions } from './utils/member-action';

export function collectionAction<IN = any, OUT = any>(options: CollectionOperationOptions<IN, OUT>) {
  return function createCollectionActionDescriptor(target: any, propertyName: string): any {
    return {
      value: collectionOp(options)
    };
  }
}

export function memberAction<IN = any, OUT = any>(options: InstanceOperationOptions<IN, OUT>) {
  return function createMemberActionDescriptor(target: any, propertyName: string): any {
    return {
      value: instanceOp(options)
    };
  }
}

