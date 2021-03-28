class DidService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async create({ value, currency, monthlyPrice, setupPrice }) {
    await this.httpClient.post('dids', {
      value,
      currency,
      monthlyPrice,
      setupPrice,
    });
  }

  async index({ _limit, _page, _sort, _order, _query }) {
    const { data, headers } = await this.httpClient.get('dids', {
      params: {
        _limit,
        _page,
        _sort,
        _order,
        value_like: _query,
      },
    });

    return { data, headers };
  }

  async update({ id, ...updatedData }) {
    const { data } = await this.httpClient.put(`dids/${id}`, updatedData);

    return data;
  }

  async delete(id) {
    await this.httpClient.delete(`dids/${id}`);
  }
}

export default DidService;
