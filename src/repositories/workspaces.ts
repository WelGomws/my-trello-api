import { FilterWorkspaces, IWorkspace, IWorkspaceRepository } from '@types';

export function workspacesRepository(repository: IWorkspaceRepository) {
  return {
    save: (payload: IWorkspace) => repository.save(payload),
    list: (filter: FilterWorkspaces) => repository.list(filter),
    update: (id: string, payload: FilterWorkspaces) =>
      repository.update(id, payload),
    delete: (id: string) => repository.delete(id),
  };
}
