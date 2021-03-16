import { ResponseDetail } from '../type-defs/internal';
import { getResponseDetail } from './get-response-detail';

describe('services/send-response', () => {
  describe('getResponseDetail', () => {
    it('Should return a plain text message', () => {
      const response: ResponseDetail = getResponseDetail('Hello World');
      expect(response.statusCode).toEqual(200);
      expect(response.contentType).toEqual('text/plain');
      expect(response.body).toEqual('Hello World');
    });

    it('Should return a number as plain text message', () => {
      const response: ResponseDetail = getResponseDetail(42);
      expect(response.statusCode).toEqual(200);
      expect(response.contentType).toEqual('text/plain');
      expect(response.body).toEqual(42);
    });

    it('Should return html', () => {
      const body: string = `<html lang="en"><body>Hello World</body></html>`;

      const response: ResponseDetail = getResponseDetail(body);
      expect(response.statusCode).toEqual(200);
      expect(response.contentType).toEqual('text/html');
      expect(response.body).toEqual(body);
    });

    it('Should return an object', () => {
      const content: any = {
        name: 'bob'
      };

      const response: ResponseDetail = getResponseDetail(content);
      expect(response.statusCode).toEqual(200);
      expect(response.contentType).toEqual('application/json');
      expect(response.body).toEqual(JSON.stringify(content));
    });

    it('Should override a content type', () => {
      const content: any = {
        name: 'bob'
      };
      const response: ResponseDetail = getResponseDetail(
        content,
        200,
        'text/plain'
      );
      expect(response.statusCode).toEqual(200);
      expect(response.contentType).toEqual('text/plain');
      expect(response.body).toEqual(JSON.stringify(content));
    });

    it('Should return a custom status', () => {
      const content: any = { name: 'bob' };
      const response: ResponseDetail = getResponseDetail(content, 201);
      expect(response.statusCode).toEqual(201);
      expect(response.contentType).toEqual('application/json');
      expect(response.body).toEqual(JSON.stringify(content));
    });

    it('Should handle null body', () => {
      const response: ResponseDetail = getResponseDetail(null, 200);
      expect(response.statusCode).toEqual(200);
      expect(response.contentType).toEqual('text/plain');
      expect(response.body).toEqual('');
    });

    it('Should handle undefined body', () => {
      const response: ResponseDetail = getResponseDetail(undefined, 200);
      expect(response.statusCode).toEqual(200);
      expect(response.contentType).toEqual('text/plain');
      expect(response.body).toEqual('');
    });

    it('Should return an error on json parse fail', () => {
      const content: any = {
        name: 'bob'
      };
      content.name = content;

      const response: ResponseDetail = getResponseDetail(content, 200);
      expect(response.statusCode).toEqual(500);
      expect(response.contentType).toEqual('text/plain');
      expect(response.body).toEqual('Error parsing object');
    });
  });
});