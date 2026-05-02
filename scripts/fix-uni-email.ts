import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Update the user if it exists as uni@example.com
  const user = await prisma.user.findUnique({
    where: { email: "uni@example.com" }
  });
  
  if (user) {
    await prisma.user.update({
      where: { email: "uni@example.com" },
      data: { email: "university@example.com" }
    });
    console.log("Updated uni@example.com to university@example.com");
  } else {
    console.log("uni@example.com not found, check if it's already university@example.com");
    const check = await prisma.user.findUnique({
      where: { email: "university@example.com" }
    });
    if (check) {
      console.log("It's already university@example.com");
    } else {
      console.log("Neither found, something is wrong with the DB state.");
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
