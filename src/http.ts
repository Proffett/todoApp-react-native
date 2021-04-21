export class Http {
  static HEADERS = { 'Content-Type': 'application/json' };

  static async get(url: string) {
    try {
      return await request(url, 'GET');
    } catch (e) {
      console.log(e);
      throw e;
    }
    return null;
  }

  static async post(url: string, data = {}) {
    try {
      return await request(url, 'POST', data);
    } catch (e) {
      console.log(e);
      throw e;
    }
    return null;
  }

  static async delete(url: string) {
    try {
      return await request(url, 'DELETE');
    } catch (e) {
      console.log(e);
      throw e;
    }
    return null;
  }

  static async patch(url: string, data = {}) {
    try {
      return await request(url, 'PATCH', data);
    } catch (e) {
      console.log(e);
      throw e;
    }
    return null;
  }
}

async function request(url: string, method = 'GET', data = null) {
  const config = {
    method,
    Headers: Http.HEADERS,
  };
  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data);
  }
  await fetch(url, {
    method,
    headers: Http.HEADERS,
  });
  const response = await fetch(url, config);
  return await response.json();
}
