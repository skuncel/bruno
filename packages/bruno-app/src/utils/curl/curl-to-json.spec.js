const { describe, it, expect } = require('@jest/globals');

import curlToJson from './curl-to-json';

describe('curlToJson', () => {
  it('should return a parse a simple curl command', () => {
    const curlCommand = 'curl https://www.usebruno.com';
    const result = curlToJson(curlCommand);

    expect(result).toEqual({
      url: 'https://www.usebruno.com',
      raw_url: 'https://www.usebruno.com',
      method: 'get'
    });
  });

  it('should return a parse a curl command with headers', () => {
    const curlCommand = `curl https://www.usebruno.com
    -H 'Accept: application/json, text/plain, */*'
    -H 'Accept-Language: en-US,en;q=0.9,hi;q=0.8'
    `;

    const result = curlToJson(curlCommand);

    expect(result).toEqual({
      url: 'https://www.usebruno.com',
      raw_url: 'https://www.usebruno.com',
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8'
      }
    });
  });

  it('should return a parse a curl with a post body', () => {
    const curlCommand = `curl 'https://www.usebruno.com'
    -H 'Accept: application/json, text/plain, */*'
    -H 'Accept-Language: en-US,en;q=0.9,hi;q=0.8'
    -H 'Content-Type: application/json;charset=utf-8'
    -H 'Origin: https://www.usebruno.com'
    -H 'Referer: https://www.usebruno.com/'
    --data-raw '{"email":"test@usebruno.com","password":"test"}'
    `;

    const result = curlToJson(curlCommand);

    expect(result).toEqual({
      url: '%27https://www.usebruno.com%27',
      raw_url: "'https://www.usebruno.com'",
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
        'Content-Type': 'application/json;charset=utf-8',
        Origin: 'https://www.usebruno.com',
        Referer: 'https://www.usebruno.com/'
      },
      data: '{"email":"test@usebruno.com","password":"test"}'
    });
  });
});
