import { z } from 'zod';
import { insertProjectSchema, insertSkillSchema, insertMessageSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  shortDescription: z.string(),
  problemStatement: z.string(),
  methodology: z.string(),
  outcome: z.string(),
  techStack: z.string(),
  githubUrl: z.string().nullable(),
  demoUrl: z.string().nullable(),
  imageUrl: z.string().nullable(),
  createdAt: z.string().nullable(),
});

const skillSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  proficiency: z.number().nullable(),
});

const messageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  message: z.string(),
  createdAt: z.string().nullable(),
});

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: {
        200: z.array(projectSchema),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/projects/:id',
      responses: {
        200: projectSchema,
        404: errorSchemas.notFound,
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills',
      responses: {
        200: z.array(skillSchema),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertMessageSchema,
      responses: {
        200: messageSchema,
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}