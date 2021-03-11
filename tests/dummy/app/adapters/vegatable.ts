import ApplicationAdapter from './application';

export default class VegatableAdapter extends ApplicationAdapter {
  public buildURL(modelName: string, id: string|[string]|object, snapshot: object, requestType: string, query: object) {
    const url = super.buildURL(modelName, id, snapshot, requestType, query);
    return `${url}?${modelName}=${snapshot.attr('name')}`;
  }
}
