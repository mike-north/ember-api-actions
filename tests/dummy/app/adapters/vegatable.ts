import ApplicationAdapter from './application';

export default class VegatableAdapter extends ApplicationAdapter {
  public buildURL(modelName: string, id: string|[string]|object, snapshot: object, requestType: string, query: object) {
    const urlStr = super.buildURL(modelName, id, snapshot, requestType, query);
    const [path, searchStr] = urlStr.split('?');
    const searchParams = new URLSearchParams(searchStr);
    // for testing buildURL queryParams
    searchParams.append(modelName, snapshot.attr('name'));
    // for testing adapterOptions
    for (const [k, v] of Object.entries(snapshot.adapterOptions || {})) {
      searchParams.append(k, v.toString());
    }
    return `${path}?${searchParams.toString()}`;
  }
}
