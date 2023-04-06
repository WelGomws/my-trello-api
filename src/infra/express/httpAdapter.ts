import { Request, Response } from 'express';

export function httpAdapter(controller: any) {
  return async function (request: Request, response: Response) {
    const httpRequest = {
      body: request.body,
      params: request.params,
      query: request.query,
      request,
    };

    const httpResponse = await controller(httpRequest);

    if (!httpResponse.statusCode) {
      return response.status(500).json({ error: 'server intenal error' });
    }

    return response.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
