export type DataType = {
  title?: string;
  id?: string;
  name?: string;
};

export class Http {
  static HEADERS = { 'Content-Type': 'application/json' };

  static async get(url: string): Promise<Request> {
    try {
      return await request(url, 'GET');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async post(url: string, data: DataType): Promise<Request> {
    try {
      return await request(url, 'POST', data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async delete(url: string): Promise<Request> {
    try {
      return await request(url, 'DELETE');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async patch(url: string, data: DataType): Promise<Request> {
    try {
      return await request(url, 'PATCH', data);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

async function request(url: string, method = 'GET', data: DataType | null = null) {
  const config: Partial<RequestInit> & { Headers: HeadersInit_ } = {
    method,
    Headers: Http.HEADERS,
    body: null,
  };
  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(url, config);
  return response.json();
}
