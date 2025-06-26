import prisma from '../db';

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: '<hashed_password>',
      role: 'ADMIN',
      fullName: 'Admin User',
      // ...other fields
    },
  });
}

main();