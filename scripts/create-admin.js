/**
 * Admin Creation / Password Update CLI Script
 *
 * Usage:
 * node scripts/create-admin.js <email> <password> [name]
 *
 * Example:
 * node scripts/create-admin.js admin@abdulahad.my.id SuperSecurePassword2026! "Abdul Ahad"
 */

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const email = args[0] || process.env.ADMIN_EMAIL || "admin@abdulahad.my.id";
  const password = args[1] || process.env.ADMIN_PASSWORD || "Admin@2026!";
  const name = args[2] || "Abdul Ahad";

  if (!email || !password) {
    console.error("❌ Error: Email and password are required.");
    console.log("Usage: node scripts/create-admin.js <email> <password> [name]");
    process.exit(1);
  }

  console.log(`🔐 Creating / Updating admin user: ${email}...`);

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const admin = await prisma.admin.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {
        passwordHash,
        name,
        role: "admin",
      },
      create: {
        email: email.toLowerCase().trim(),
        passwordHash,
        name,
        role: "admin",
      },
    });

    console.log(`✅ Admin user successfully configured:`);
    console.log(`   ID: ${admin.id}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Name: ${admin.name}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`\nYou can now sign in at: /dashboard/login`);
  } catch (error) {
    console.error("❌ Failed to create/update admin user:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
