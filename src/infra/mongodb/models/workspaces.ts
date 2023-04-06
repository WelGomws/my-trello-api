import { Schema, model } from 'mongoose';
import { IWorkspace } from 'src/domain/types';

const schema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true },
    description: String,
    archived: { type: Boolean },
    owner: { type: String, required: true },
    members: [{ name: String, email: String }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  }
);

export const WorkspaceModel = model<IWorkspace>('workspaces', schema);
