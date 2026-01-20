import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createPrisma() {
  return new PrismaClient({
    adapter: new PrismaPg(pool),
    log: [],
  });
}

const prismaPromise = createPrisma();
export default prismaPromise;
