import Database from "better-sqlite3";
import fs from "fs";

const sqlite = new Database("./dev.db");

const projects = sqlite.prepare("SELECT * FROM projects").all();
const skills = sqlite.prepare("SELECT * FROM skills").all();
const messages = sqlite.prepare("SELECT * FROM messages").all();

fs.writeFileSync("backup-data.json", JSON.stringify({
  projects,
  skills,
  messages
}, null, 2));

console.log("✓ Data exported to backup-data.json");
console.log(`  - ${projects.length} projects`);
console.log(`  - ${skills.length} skills`);
console.log(`  - ${messages.length} messages`);

sqlite.close();