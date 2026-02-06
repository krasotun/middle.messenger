import { HTTPTransport, RequestOptions } from '../core';

export abstract class BaseApi {
  protected http = new HTTPTransport();
  protected baseUrl: string = 'https://ya-praktikum.tech/api/v2';

  protected async post(url: string, options: RequestOptions) {
    const xhr = await this.http.post(this.baseUrl + url, options);
    return this._handleResponse(xhr);
  }

  protected _handleResponse(xhr: XMLHttpRequest): unknown {
    return this._parseJson(xhr.response);
  }

  protected _parseJson(response: unknown): unknown {
    if (typeof response === 'string') {
      return JSON.parse(response);
    }

    return response;
  }
}
