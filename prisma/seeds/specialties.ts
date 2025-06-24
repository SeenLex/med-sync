import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const specialties = [
    { name: "Cardiology" },
    { name: "Dermatology" },
    { name: "Neurology" },
    { name: "Pediatrics" },
    { name: "Psychiatry" },
    { name: "General Medicine" },
    { name: "General Surgery" },
    { name: "Urology" },
    { name: "Endocrinology" },
    { name: "Gastroenterology" },
  ];

  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: { name: specialty.name },
      update: {},
      create: specialty,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });