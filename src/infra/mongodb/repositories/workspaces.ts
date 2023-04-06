import { IWorkspaceRepository } from '@types';
import { WorkspaceModel } from '../models/workspaces';
import { workspacePresenter } from '../presenters/worskpaces';

export const workspacesRepository: IWorkspaceRepository = {
  save: async (payload) => {
    const result = await WorkspaceModel.create(payload);
    return workspacePresenter(result);
  },

  list: async (filter) => {
    const result = await WorkspaceModel.find(filter);
    return result.map(workspacePresenter);
  },

  update: async (_id: string, payload: any) => {
    const result = await WorkspaceModel.findByIdAndUpdate({ _id }, payload, {
      returnDocument: 'after',
    });

    if (result) {
      return workspacePresenter(result);
    }

    return null;
  },

  delete: async (_id: string) => {
    const result = await WorkspaceModel.deleteOne({ _id });
    return !!result.deletedCount;
  },
};
