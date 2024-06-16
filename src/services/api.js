import env from "../config/env";

class ApiService {
  constructor(baseURL, token) {
    this.baseURL = baseURL;
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': this.token,
      ...options.headers
    };

    const config = {
      ...options,
      headers
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }
    return await response.json();
  }

  get(endpoint) {
    return this.request(endpoint, {
      method: 'GET'
    });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }

}

const apiService = new ApiService(env.API_URL, env.API_TOKEN);

export default apiService;