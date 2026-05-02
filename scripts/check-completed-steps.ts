import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    where: { 
      status: "completed",
      projectName: { contains: "Demo 027" }
    },
    include: {
      workflowSteps: true
    }
  });
  
  projects.forEach(p => {
    console.log(`Project: ${p.projectName} (ID: ${p.id})`);
    console.log(`- Steps: ${p.workflowSteps.length}`);
    p.workflowSteps.forEach(s => {
      console.log(`  - ${s.stepName} (${s.docType}): ${s.status}`);
    });
    console.log("-------------------");
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
