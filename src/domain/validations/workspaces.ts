import { z } from 'zod';

export const workspaceSchema = z.object({
  name: z.string(),
  description: z.string(),
  archived: z.boolean().default(false),
  owner: z.string().email(),
  members: z.array(
    z.object({
      name: z.string(),
      email: z.string().email(),
    })
  ),
});
