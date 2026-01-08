import Database from "better-sqlite3";

const db = new Database("./dev.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    problem_statement TEXT NOT NULL,
    methodology TEXT NOT NULL,
    outcome TEXT NOT NULL,
    tech_stack TEXT NOT NULL,
    github_url TEXT,
    demo_url TEXT,
    image_url TEXT,
    created_at INTEGER DEFAULT (unixepoch())
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    proficiency INTEGER
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at INTEGER DEFAULT (unixepoch())
  );
`);

console.log("Database created successfully!");
db.close();