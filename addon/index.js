import memberAction from './utils/member-action';
import collectionAction from './utils/collection-action';
import CollectionActionable from './mixins/collection-action-mixin';

export const classOp = collectionAction;
export const instanceOp = memberAction;

export { CollectionActionable, collectionAction, memberAction };
