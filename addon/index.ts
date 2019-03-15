import collectionAction from './utils/collection-action';
import memberAction from './utils/member-action';
import serializeAndPush from './utils/serialize-and-push';

export const classOp = collectionAction;
export const instanceOp = memberAction;

export { collectionAction, memberAction, serializeAndPush };
