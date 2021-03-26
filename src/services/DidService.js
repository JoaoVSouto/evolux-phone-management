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

  async index({ _limit, _page, _sort, _order }) {
    const { data, headers } = await this.httpClient.get('dids', {
      params: {
        _limit,
        _page,
        _sort,
        _order,
      },
    });

    return { data, headers };
  }

  async delete(id) {
    await this.httpClient.delete(`dids/${id}`);
  }
}

export default DidService;
