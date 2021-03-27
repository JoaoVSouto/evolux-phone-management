import axios from 'axios';

import DidService from './DidService';
import UrlService from './UrlService';

const httpClient = axios.create({
  baseURL: 'http://localhost:3333',
});

export default {
  did: new DidService(httpClient),
  url: new UrlService(),
};
