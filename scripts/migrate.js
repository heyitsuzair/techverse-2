#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

// Generate migration name with timestamp
const now = new Date();
const timestamp = now
  .toISOString()
  .replace(/[-:]/g, "")
  .replace(/\..+/, "")
  .replace("T", "_");

// Get migration name from command line argument or use auto-generated timestamp
// If no name provided, use timestamp-based name
const migrationName = process.argv[2]
  ? process.argv[2]
  : `migration_${timestamp}`;

console.log(`Creating migration: ${migrationName}`);

try {
  // Run prisma migrate dev with the generated name
  execSync(`yarn prisma migrate dev --name ${migrationName}`, {
    stdio: "inherit",
    cwd: path.resolve(__dirname, ".."),
  });
  console.log(`Migration "${migrationName}" created successfully!`);

  // Regenerate Prisma Client after migration
  console.log("Regenerating Prisma Client...");
  execSync(`yarn prisma generate`, {
    stdio: "inherit",
    cwd: path.resolve(__dirname, ".."),
  });
  console.log("Prisma Client regenerated successfully!");
} catch (error) {
  console.error("Migration failed:", error.message);
  process.exit(1);
}
