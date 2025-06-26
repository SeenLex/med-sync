import prisma from '../db';

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      role: 'ADMIN',
      fullName: 'Admin User',
    },
  });
}

main();