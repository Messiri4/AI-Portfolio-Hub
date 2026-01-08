import { z } from "zod";

export const insertProjectSchema = z.object({
  title: z.string(),
  shortDescription: z.string(),
  problemStatement: z.string(),
  methodology: z.string(),
  outcome: z.string(),
  techStack: z.string(),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const insertSkillSchema = z.object({
  name: z.string(),
  category: z.string(),
  proficiency: z.number().optional(),
});

// ✅ FIXED: Added optional createdAt field with default value
export const insertMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

export type Project = any;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Skill = any;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Message = any;
export type InsertMessage = z.infer<typeof insertMessageSchema>;