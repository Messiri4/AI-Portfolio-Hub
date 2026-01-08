import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { eq, desc } from 'drizzle-orm';
import type {
  Project,
  InsertProject,
  Skill,
  InsertSkill,
  Message,
  InsertMessage
} from "@shared/schema";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

// Define tables
export const projectsTable = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  shortDescription: text('short_description').notNull(),
  problemStatement: text('problem_statement').notNull(),
  methodology: text('methodology').notNull(),
  outcome: text('outcome').notNull(),
  techStack: text('tech_stack').notNull(),
  githubUrl: text('github_url'),
  demoUrl: text('demo_url'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const skillsTable = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  proficiency: integer('proficiency').default(50),
});

export const messagesTable = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    const projects = await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.id));
    
    return projects.map(p => ({
      ...p,
      techStack: JSON.parse(p.techStack),
    }));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id))
      .limit(1);
    
    if (!project) return undefined;
    
    return {
      ...project,
      techStack: JSON.parse(project.techStack),
    };
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projectsTable)
      .values({
        title: insertProject.title,
        shortDescription: insertProject.shortDescription,
        problemStatement: insertProject.problemStatement,
        methodology: insertProject.methodology,
        outcome: insertProject.outcome,
        techStack: insertProject.techStack,
        githubUrl: insertProject.githubUrl || null,
        demoUrl: insertProject.demoUrl || null,
        imageUrl: insertProject.imageUrl || null,
      })
      .returning();
    
    return {
      ...project,
      techStack: JSON.parse(project.techStack),
    };
  }

  async getSkills(): Promise<Skill[]> {
    return await db
      .select()
      .from(skillsTable)
      .orderBy(skillsTable.category, skillsTable.name);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db
      .insert(skillsTable)
      .values({
        name: insertSkill.name,
        category: insertSkill.category,
        proficiency: insertSkill.proficiency || 50,
      })
      .returning();
    
    return skill;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messagesTable)
      .values({
        name: insertMessage.name,
        email: insertMessage.email,
        message: insertMessage.message,
      })
      .returning();
    
    return message;
  }
}

export const storage = new DatabaseStorage();