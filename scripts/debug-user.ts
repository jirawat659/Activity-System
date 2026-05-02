import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "university@example.com" }
  });
  
  if (user) {
    console.log("User found:", JSON.stringify(user, null, 2));
  } else {
    console.log("User NOT found");
    const allUsers = await prisma.user.findMany({
      select: { email: true }
    });
    console.log("Existing emails:", allUsers.map(u => u.email).join(", "));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
