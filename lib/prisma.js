import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

/**
 * Global singleton Prisma client to prevent multiple instances
 * during Next.js Hot Module Reloading (HMR).
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
