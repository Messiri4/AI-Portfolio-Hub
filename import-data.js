import pg from "pg";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function importData() {
  try {
    const data = JSON.parse(fs.readFileSync("backup-data.json", "utf8"));

    console.log("Importing data to PostgreSQL...");

    // Clear existing data first
    await pool.query("DELETE FROM projects");
    await pool.query("DELETE FROM skills");
    await pool.query("DELETE FROM messages");
    console.log("✓ Cleared existing data");

    // Import projects with proper column mapping
    for (const project of data.projects) {
      await pool.query(
        `INSERT INTO projects (title, short_description, problem_statement, methodology, outcome, tech_stack, github_url, demo_url, image_url, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
        [
          project.title,
          project.short_description,
          project.problem_statement,
          project.methodology,
          project.outcome,
          project.tech_stack,
          project.github_url,
          project.demo_url,
          project.image_url,
        ]
      );
      console.log(`  ✓ Imported project: ${project.title}`);
    }
    console.log(`✓ Imported ${data.projects.length} projects`);

    // Import skills
    for (const skill of data.skills) {
      await pool.query(
        `INSERT INTO skills (name, category, proficiency) VALUES ($1, $2, $3)`,
        [skill.name, skill.category, skill.proficiency]
      );
    }
    console.log(`✓ Imported ${data.skills.length} skills`);

    // Import messages
    for (const message of data.messages) {
      await pool.query(
        `INSERT INTO messages (name, email, message, created_at) VALUES ($1, $2, $3, NOW())`,
        [message.name, message.email, message.message]
      );
    }
    console.log(`✓ Imported ${data.messages.length} messages`);

    console.log("\n🎉 Data restoration completed successfully!");
  } catch (error) {
    console.error("❌ Error importing data:", error);
  } finally {
    await pool.end();
  }
}

importData();