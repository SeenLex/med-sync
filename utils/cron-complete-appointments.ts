import prisma from "../prisma/db";

async function completeExpiredAppointments() {
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

  const result = await prisma.appointment.updateMany({
    where: {
      status: "CONFIRMED",
      startTime: { lte: thirtyMinutesAgo },
    },
    data: { status: "COMPLETED" },
  });

  console.log(`Marked ${result.count} appointments as COMPLETED.`);
}

completeExpiredAppointments()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 