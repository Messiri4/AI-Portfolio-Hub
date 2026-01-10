import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // In production, files are in dist/public relative to process.cwd()
  const distPath = path.resolve(process.cwd(), "dist/public");
  
  console.log("Looking for static files at:", distPath);
  console.log("Does it exist?", fs.existsSync(distPath));
  
  if (!fs.existsSync(distPath)) {
    // Try alternative path (in case __dirname works)
    const altPath = path.resolve(__dirname, "public");
    console.log("Trying alternative path:", altPath);
    console.log("Does it exist?", fs.existsSync(altPath));
    
    if (fs.existsSync(altPath)) {
      app.use(express.static(altPath));
      app.use("*", (_req, res) => {
        res.sendFile(path.resolve(altPath, "index.html"));
      });
      return;
    }
    
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  
  app.use(express.static(distPath));
  
  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}