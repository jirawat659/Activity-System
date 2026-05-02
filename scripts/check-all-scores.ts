import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: {
      activityScores: true,
      ownedProjects: true
    }
  });
  
  users.forEach(u => {
    if (u.ownedProjects.length > 0 || u.activityScores.length > 0) {
      console.log(`User: ${u.fullName} (${u.email})`);
      console.log(`- Projects: ${u.ownedProjects.map(p => `${p.projectName} (${p.status})`).join(", ")}`);
      console.log(`- Scores: ${u.activityScores.map(s => `${s.score} [${s.notes}]`).join(", ")}`);
      console.log("-------------------");
    }
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
