export type IWorkspace = {
  id?: string;
  name: string;
  description: string;
  archived: boolean;
  owner: string;
  members: { name: string; email: string }[];
};

export type FilterWorkspaces = Partial<IWorkspace>;

export interface IWorkspaceRepository {
  save: (payload: IWorkspace) => Promise<IWorkspace>;
  list: (filter: FilterWorkspaces) => Promise<IWorkspace[]>;
  update: (id: string, payload: FilterWorkspaces) => Promise<IWorkspace | null>;
  delete: (id: string) => Promise<boolean>;
}
