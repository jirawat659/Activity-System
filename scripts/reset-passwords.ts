import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);
  
  await prisma.user.updateMany({
    data: { passwordHash }
  });
  
  console.log("All passwords reset to password123");
}

main().catch(console.error).finally(() => prisma.$disconnect());
