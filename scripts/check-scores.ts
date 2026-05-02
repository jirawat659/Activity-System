import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const student = await prisma.user.findUnique({
    where: { email: "student@example.com" },
    include: {
      activityScores: true,
      ownedProjects: {
        include: {
          workflowSteps: true
        }
      }
    }
  });
  
  if (student) {
    console.log("Student:", student.fullName);
    console.log("Projects Count:", student.ownedProjects.length);
    student.ownedProjects.forEach(p => {
      console.log(`- Project: ${p.projectName}, Status: ${p.status}`);
    });
    console.log("Scores Count:", student.activityScores.length);
    student.activityScores.forEach(s => {
      console.log(`- Score: ${s.score}, Reason: ${s.notes}`);
    });
  } else {
    console.log("Student not found");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
