import { TestContext } from 'ember-test-helpers';
import Pretender from 'pretender';

export default function setupPretender(hooks: NestedHooks) {
  hooks.beforeEach(function(this: TestContext) {
    this.server = new Pretender();
  });

  hooks.afterEach(function(this: TestContext) {
    this.server.shutdown();
  });
}

declare module 'ember-test-helpers' {
  interface TestContext {
    server: Pretender;
  }
}
