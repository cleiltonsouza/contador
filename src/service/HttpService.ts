import axios from 'axios';

export class HttpService {

  async get(uri: string) {
    try {
      const result = await axios.get(uri);
      return result.data;
    } catch (err) {
      return err;
    }
  }
}
