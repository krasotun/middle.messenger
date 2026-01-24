enum HTTPMethod {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type QueryValue = string | number | boolean | null | undefined;
type QueryData = Record<string, QueryValue>;

type RequestOptions<TData = unknown> = {
  method?: HTTPMethod;
  headers?: Record<string, string>;
  data?: TData;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
};

export class HTTPTransport {
  private _queryStringify = (data: QueryData) => {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    if (keys.length === 0) {
      return '';
    }

    const query = keys
      .map((key) => {
        const value = data[key];
        if (value === undefined) {
          return '';
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
      })
      .filter(Boolean)
      .join('&');

    return `?${query}`;
  };

  get = (url: string, options: RequestOptions = {}) => {
    return this._request(url, { ...options, method: HTTPMethod.GET }, options.timeout);
  };

  put = (url: string, options: RequestOptions = {}) => {
    return this._request(url, { ...options, method: HTTPMethod.PUT }, options.timeout);
  };

  post = (url: string, options: RequestOptions = {}) => {
    return this._request(url, { ...options, method: HTTPMethod.POST }, options.timeout);
  };

  delete = (url: string, options: RequestOptions = {}) => {
    return this._request(url, { ...options, method: HTTPMethod.DELETE }, options.timeout);
  };

  private _buildUrl = (url: string, method: HTTPMethod, data: unknown) => {
    if (method === HTTPMethod.GET && data && typeof data === 'object') {
      return url + this._queryStringify(data as QueryData);
    }

    return url;
  };

  private _prepareHeaders = (headers: Record<string, string>) => {
    return Object.entries(headers);
  };

  private _prepareBody = (
    method: HTTPMethod,
    data: unknown,
    headers: Record<string, string>,
    xhr: XMLHttpRequest,
  ): XMLHttpRequestBodyInit | Document | null => {
    if (method === HTTPMethod.GET || data === null) {
      return null;
    }

    if (data instanceof FormData || typeof data === 'string') {
      return data;
    }

    if (typeof data === 'object') {
      if (!headers['Content-Type']) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      return JSON.stringify(data);
    }

    if (typeof data === 'number' || typeof data === 'boolean' || typeof data === 'bigint') {
      return String(data);
    }

    throw new Error('Unsupported data type');
  };

  private _request = (url: string, options: RequestOptions = {}, timeout = 5000) => {
    const { method = HTTPMethod.GET, headers = {}, data, responseType } = options;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      if (!Object.values(HTTPMethod).includes(method)) {
        reject(new Error(`Unsupported method: ${method}`));
        return;
      }

      const xhr = new XMLHttpRequest();
      const newUrl = this._buildUrl(url, method, data);

      xhr.open(method, newUrl);
      xhr.timeout = timeout;
      if (responseType) {
        xhr.responseType = responseType;
      }

      for (const [key, value] of this._prepareHeaders(headers)) {
        xhr.setRequestHeader(key, value);
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = () => {
        reject(new Error('Request aborted'));
      };
      xhr.onerror = () => {
        reject(new Error('Request error'));
      };
      xhr.ontimeout = () => {
        reject(new Error('Timeout'));
      };

      try {
        const body = this._prepareBody(method, data, headers, xhr);
        if (body === null) {
          xhr.send();
        } else {
          xhr.send(body);
        }
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Unsupported data type'));
        return;
      }
    });
  };
}
