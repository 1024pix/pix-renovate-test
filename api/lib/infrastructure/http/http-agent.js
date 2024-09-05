import perf_hooks from 'node:perf_hooks';

import axios from 'axios';
const { performance } = perf_hooks;
import { logger } from '../../../src/shared/infrastructure/utils/logger.js';

class HttpResponse {
  constructor({ code, data, isSuccessful }) {
    this.code = code;
    this.data = data;
    this.isSuccessful = isSuccessful;
  }
}

const httpAgent = {
  async post({ url, payload, headers, timeout }) {
    const startTime = performance.now();
    let responseTime = null;
    try {
      const config = {
        headers,
      };
      if (timeout != undefined) {
        config.timeout = timeout;
      }
      const httpResponse = await axios.post(url, payload, config);
      responseTime = performance.now() - startTime;
      logger.info(
        {
          metrics: { responseTime },
        },
        `End POST request to ${url} success: ${httpResponse.status}`,
      );

      return new HttpResponse({
        code: httpResponse.status,
        data: httpResponse.data,
        isSuccessful: true,
      });
    } catch (httpErr) {
      responseTime = performance.now() - startTime;
      let code = null;
      let data;

      if (httpErr.response) {
        code = httpErr.response.status;
        data = httpErr.response.data;
      } else {
        code = httpErr.code;
        data = httpErr.message;
      }

      const message = `End POST request to ${url} error: ${code || ''} ${JSON.stringify(data)}`;

      logger.error({
        metrics: { responseTime },
        msg: message,
      });

      return new HttpResponse({
        code,
        data,
        isSuccessful: false,
      });
    }
  },
  async get({ url, payload, headers, timeout }) {
    const startTime = performance.now();
    let responseTime = null;
    try {
      const config = {
        data: payload,
        headers,
      };
      if (timeout != undefined) {
        config.timeout = timeout;
      }
      const httpResponse = await axios.get(url, config);
      responseTime = performance.now() - startTime;
      logger.info(
        {
          metrics: { responseTime },
        },
        `End GET request to ${url} success: ${httpResponse.status}`,
      );

      return new HttpResponse({
        code: httpResponse.status,
        data: httpResponse.data,
        isSuccessful: true,
      });
    } catch (httpErr) {
      responseTime = performance.now() - startTime;
      const isSuccessful = false;

      let code;
      let data;

      if (httpErr.response) {
        code = httpErr.response.status;
        data = httpErr.response.data;
      } else {
        code = '500';
        data = null;
      }

      logger.error({
        metrics: { responseTime },
        msg: `End GET request to ${url} error: ${code || ''} ${JSON.stringify(data)}`,
      });

      return new HttpResponse({
        code,
        data,
        isSuccessful,
      });
    }
  },
};

export { httpAgent };
