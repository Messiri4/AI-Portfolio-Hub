import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // Add POST route manually since it might not be in api definitions
  app.post("/api/projects", async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (err) {
      console.error("Error creating project:", err);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Add POST route manually
  app.post("/api/skills", async (req, res) => {
    try {
      const skill = await storage.createSkill(req.body);
      res.status(201).json(skill);
    } catch (err) {
      console.error("Error creating skill:", err);
      res.status(500).json({ message: "Failed to create skill" });
    }
  });

  // Contact - with Resend email integration
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      console.log("📧 Received body:", JSON.stringify(req.body, null, 2));
      
      const input = api.contact.submit.input.parse(req.body);
      
      // Save to database
      const message = await storage.createMessage(input);
      console.log("✅ Message saved to database:", message);
      
      // Send email notification
      try {
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>', // Use verified domain later
          to: 'messirimiracle9@gmail.com',
          subject: `New Contact Form Message from ${input.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Message:</strong></p>
            <p>${input.message}</p>
          `,
        });
        console.log("✅ Email sent successfully");
      } catch (emailError) {
        console.error("⚠️ Email failed to send:", emailError);
        // Continue anyway - message is saved in database
      }
      
      res.status(200).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error("❌ Validation error:", JSON.stringify(err.errors, null, 2));
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
          errors: err.errors,
        });
      }
      console.error("❌ Unexpected error:", err);
      throw err;
    }
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  console.log("🌱 Starting database seed...");
  
  try {
    const existingProjects = await storage.getProjects();
    console.log(`📊 Found ${existingProjects.length} existing projects`);
    
    if (existingProjects.length === 0) {
      console.log("✅ Seeding projects...");
      
      // Create projects sequentially and verify each one
      const project1 = await storage.createProject({
        title: "Drowiness Detection System",
        shortDescription: "A real-time computer vision system that detects driver drowsiness using facial landmarks, blink patterns, and head pose analysis to trigger timely alerts.",
        problemStatement: "Driver fatigue is a major cause of road accidents, and there is a need for an automated system that can detect early signs of drowsiness and warn the driver in real time.",
        methodology: "The system uses MediaPipe to detect facial landmarks, computes eye aspect ratio for blink detection, estimates head pose for nodding behavior, and triggers an alarm when defined thresholds are exceeded.",
        outcome: "The project successfully delivers a modular, real-time drowsiness detection pipeline that monitors fatigue indicators and alerts users to improve road safety.",
        techStack: JSON.stringify(["Python", "MediaPipe", "OpenCV", "Numpy", "PlaySound"]),
        githubUrl: "https://github.com/Messiri4/drowiness-detector",
        demoUrl: "https://nas-demo.example.com",
        imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1000",
      });
      console.log("✓ Created project 1:", project1?.id);

      const project2 = await storage.createProject({
        title: "Airbnb House Price Predictor",
        shortDescription: "A decision support system (DSS) that uses data science and machine learning to help Airbnb hosts analyze the 2019 NYC Airbnb dataset and predict optimal listing prices.",
        problemStatement: "Airbnb hosts need a way to understand pricing dynamics and set competitive prices based on listing features and market patterns to maximize revenue.",
        methodology: "The project involves cleaning and exploring the 2019 Airbnb NYC dataset, engineering relevant features, training regression models to predict listing prices, and analyzing trends through visualizations.",
        outcome: "You produce a model that predicts Airbnb listing prices and insights into market influences on price, enabling hosts to make data-informed pricing decisions.",
        techStack: JSON.stringify(["Python", "Pandas", "NumPy", "Scikit-learn", "Seaborn & Matplotlib"]),
        githubUrl: "https://github.com/Messiri4/Airbnb_Predictor",
        demoUrl: null,
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      });
      console.log("✓ Created project 2:", project2?.id);
      
      const project3 = await storage.createProject({
        title: "Age & Gender Prediction from Face Images",
        shortDescription: "A Python-based application that predicts a person's age and gender from facial images using trained machine learning models and provides a simple interactive demo interface.",
        problemStatement: "Estimating demographic attributes like age and gender from images is useful for analytics and user personalization, but requires a reliable facial analysis system that can process real-world images accurately.",
        methodology: "The system uses a dataset of labeled face images to train separate ML models for age regression and gender classification, then processes new face inputs through those models to output predicted age and gender.",
        outcome: "A functional age and gender prediction pipeline that takes input images, detects faces, and outputs estimated age and gender values, enabling demographic inference from visual data.",
        techStack: JSON.stringify(["Python", "CNN", "OpenCV", "Flask"]),
        githubUrl: "https://github.com/Messiri4/age_gender_predictor",
        demoUrl: null,
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
      });
      console.log("✓ Created project 3:", project3?.id);
      
      // Verify all projects were created
      const verifyProjects = await storage.getProjects();
      console.log(`🔍 Verification: ${verifyProjects.length} projects in database`);
    } else {
      console.log("⏭️ Projects already exist, skipping seed");
    }

    const existingSkills = await storage.getSkills();
    console.log(`📊 Found ${existingSkills.length} existing skills`);
    
    if (existingSkills.length === 0) {
      console.log("✅ Seeding skills...");
      
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
        const created = await storage.createSkill(skill);
        console.log(`✓ Created skill: ${skill.name}`);
      }
      
      const verifySkills = await storage.getSkills();
      console.log(`🔍 Verification: ${verifySkills.length} skills in database`);
    } else {
      console.log("⏭️ Skills already exist, skipping seed");
    }
    
    console.log("🎉 Database seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}