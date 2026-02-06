import { HTTPTransport, RequestOptions } from '../core';

export abstract class BaseApi {
  protected http = new HTTPTransport();
  protected baseUrl: string = 'https://ya-praktikum.tech/api/v2';

  protected async post(url: string, options: RequestOptions) {
    const xhr = await this.http.post(this.baseUrl + url, options);
    return this._handleResponse(xhr);
  }

  protected async get(url: string, options?: RequestOptions) {
    const xhr = await this.http.get(this.baseUrl + url, options);
    return this._handleResponse(xhr);
  }

  protected _handleResponse(xhr: XMLHttpRequest): unknown {
    const contentType = xhr.getResponseHeader('Content-Type');
    const isJson = contentType?.includes('application/json') ?? false;
    if (!isJson) {
      return xhr.response;
    }

    const trimmed = String(xhr.response ?? '').trim();
    if (trimmed === '') {
      return null;
    }

    return JSON.parse(trimmed);
  }
}
