import { ZodError } from 'zod';
import { workspacesRepository } from '../repositories/workspaces';
import { resolveZodError } from 'src/errors/zod';
import { workspaceSchema } from 'src/domain/validations/workspaces';
import { MongoWorkspacesRepository } from 'src/infra/mongodb';

const repository = workspacesRepository(MongoWorkspacesRepository);

export const workspacesController = {
  create: async (httpRequest: any) => {
    try {
      const payload = httpRequest.body;
      const validPayload = workspaceSchema.parse(payload);
      const result = await repository.save(validPayload);

      return {
        body: result,
        statusCode: 201,
      };
    } catch (error) {
      console.log('≈≈≈≈≈ > error:', error);
      if (error instanceof ZodError) {
        return resolveZodError(error);
      }
    }
  },

  get: async (httpRequest: any) => {
    try {
      const result = await repository.list({});

      return {
        body: result,
        statusCode: 200,
      };
    } catch (error) {
      console.log('≈≈≈≈≈ > error:', error);
    }
  },

  update: async (httpRequest: any) => {
    try {
      const body = httpRequest.body;
      const { id } = httpRequest.params;

      const result = await repository.update(id, body);

      if (!result) {
        return {
          body: { error: 'workspace not found' },
          statusCode: 404,
        };
      }

      return {
        body: result,
        statusCode: 200,
      };
    } catch (error) {
      console.log('≈≈≈≈≈ > error:', error);
    }
  },

  delete: async (httpRequest: any) => {
    try {
      const { id } = httpRequest.params;
      const result = await repository.delete(id);

      if (!result) {
        return {
          body: { error: 'workspace not found' },
          statusCode: 404,
        };
      }

      return {
        body: { message: 'workspace deleted with success' },
        statusCode: 200,
      };
    } catch (error) {
      console.log('≈≈≈≈≈ > error:', error);
    }
  },
};
