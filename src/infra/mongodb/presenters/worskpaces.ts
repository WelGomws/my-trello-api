import { HydratedDocument } from 'mongoose';
import { IWorkspace } from '@types';

export const workspacePresenter = (
  workspace: HydratedDocument<IWorkspace>
) => ({
  id: String(workspace._id),
  name: workspace.name,
  description: workspace.description,
  archived: workspace.archived,
  owner: workspace.owner,
  members: workspace.members,
});
