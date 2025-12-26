import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(200).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    await storage.createProject({
      title: "Neural Architecture Search Engine",
      shortDescription: "Automated ML model optimization system.",
      problemStatement: "Designing efficient neural network architectures for edge devices manually is time-consuming and suboptimal.",
      methodology: "Implemented a reinforcement learning agent using PyTorch to traverse the search space of operations. Used weight sharing to reduce training cost by 90%.",
      outcome: "Achieved 2.5x speedup in inference on Raspberry Pi 4 with <1% accuracy loss compared to ResNet-50.",
      techStack: ["Python", "PyTorch", "Ray Tune", "Docker"],
      githubUrl: "https://github.com/example/nas-engine",
      demoUrl: "https://nas-demo.example.com",
      imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
    });

    await storage.createProject({
      title: "Distributed Log Anomaly Detection",
      shortDescription: "Real-time anomaly detection for microservices.",
      problemStatement: "Detecting system failures in terabytes of distributed logs in real-time is impossible with rule-based systems.",
      methodology: "Built a streaming pipeline with Apache Kafka and Flink. Trained a Transformer-based autoencoder on normal log sequences to flag deviations.",
      outcome: "Reduced MTTR (Mean Time To Resolution) by 40% in a simulated production environment. Handles 50k logs/sec.",
      techStack: ["Scala", "Apache Flink", "Kafka", "TensorFlow", "Kubernetes"],
      githubUrl: "https://github.com/example/log-anomaly",
      demoUrl: null,
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    });
    
    await storage.createProject({
      title: "Semantic Code Search",
      shortDescription: "Natural language search for large codebases.",
      problemStatement: "Developers spend 20% of their time searching for code snippets. Keyword search lacks context.",
      methodology: "Fine-tuned a CodeBERT model on internal repositories. Indexed embeddings in Milvus vector database for sub-millisecond retrieval.",
      outcome: "Improved search relevance by 60% compared to Elasticsearch baseline in user study.",
      techStack: ["Python", "Hugging Face", "Milvus", "FastAPI", "React"],
      githubUrl: "https://github.com/example/semantic-search",
      demoUrl: null,
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    });
  }

  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    const skillsData = [
      { name: "Python", category: "Languages", proficiency: 95 },
      { name: "C++", category: "Languages", proficiency: 85 },
      { name: "TypeScript", category: "Languages", proficiency: 80 },
      { name: "PyTorch", category: "Machine Learning", proficiency: 90 },
      { name: "TensorFlow", category: "Machine Learning", proficiency: 85 },
      { name: "Scikit-learn", category: "Machine Learning", proficiency: 90 },
      { name: "Docker", category: "Infrastructure", proficiency: 85 },
      { name: "Kubernetes", category: "Infrastructure", proficiency: 75 },
      { name: "AWS", category: "Infrastructure", proficiency: 80 },
      { name: "PostgreSQL", category: "Data", proficiency: 85 },
    ];

    for (const skill of skillsData) {
      await storage.createSkill(skill);
    }
  }
}
