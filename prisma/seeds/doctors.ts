const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const specialties = await prisma.specialty.findMany();
  const specialtyMap = Object.fromEntries(specialties.map((s: any) => [s.name, s.id]));

  const doctorsToCreate = [
    {
      email: 'dr.cardiology@example.com',
      fullName: 'Dr. Alice Heart',
      phone: '+10000000001',
      address: '1 Cardio Lane, Health City',
      specialty: 'Cardiology',
      licenseNumber: 'MD1001',
      biography: 'Expert in heart health and cardiovascular diseases.'
    },
    {
      email: 'dr.dermatology@example.com',
      fullName: 'Dr. Bob Skin',
      phone: '+10000000002',
      address: '2 Skin Ave, Health City',
      specialty: 'Dermatology',
      licenseNumber: 'MD1002',
      biography: 'Specialist in skin care and dermatological treatments.'
    },
    {
      email: 'dr.neurology@example.com',
      fullName: 'Dr. Carol Brain',
      phone: '+10000000003',
      address: '3 Neuro Blvd, Health City',
      specialty: 'Neurology',
      licenseNumber: 'MD1003',
      biography: 'Neurologist with a focus on brain and nervous system disorders.'
    },
    {
      email: 'dr.endocrinology@example.com',
      fullName: 'Dr. Dan Hormone',
      phone: '+10000000004',
      address: '4 Endo St, Health City',
      specialty: 'Endocrinology',
      licenseNumber: 'MD1004',
      biography: 'Endocrinologist specializing in hormone-related diseases.'
    },
    {
      email: 'dr.gastroenterology@example.com',
      fullName: 'Dr. Eve Gut',
      phone: '+10000000005',
      address: '5 Gastro Rd, Health City',
      specialty: 'Gastroenterology',
      licenseNumber: 'MD1005',
      biography: 'Expert in digestive system and gastrointestinal health.'
    },
    {
      email: 'dr.urology@example.com',
      fullName: 'Dr. Frank Kidney',
      phone: '+10000000006',
      address: '6 Uro Ave, Health City',
      specialty: 'Urology',
      licenseNumber: 'MD1006',
      biography: 'Urologist with experience in urinary tract and male reproductive health.'
    },
    {
      email: 'dr.rheumatology@example.com',
      fullName: 'Dr. Grace Joint',
      phone: '+10000000007',
      address: '7 Rheuma St, Health City',
      specialty: 'Rheumatology',
      licenseNumber: 'MD1007',
      biography: 'Specialist in arthritis and autoimmune diseases.'
    },
    {
      email: 'dr.ophthalmology@example.com',
      fullName: 'Dr. Henry Eye',
      phone: '+10000000008',
      address: '8 Ophthal Blvd, Health City',
      specialty: 'Ophthalmology',
      licenseNumber: 'MD1008',
      biography: 'Ophthalmologist focused on eye health and vision care.'
    },
    {
      email: 'dr.generalmed@example.com',
      fullName: 'Dr. Irene General',
      phone: '+10000000009',
      address: '9 General Ave, Health City',
      specialty: 'General Medicine',
      licenseNumber: 'MD1009',
      biography: 'General practitioner for comprehensive primary care.'
    },
    {
      email: 'dr.pediatrics@example.com',
      fullName: 'Dr. Jack Child',
      phone: '+10000000010',
      address: '10 Pediatrics Rd, Health City',
      specialty: 'Pediatrics',
      licenseNumber: 'MD1010',
      biography: 'Pediatrician dedicated to children\'s health and wellness.'
    }
  ];

  // Collect specialties already covered by the static list
  const coveredSpecialties = new Set(doctorsToCreate.map(doc => doc.specialty));

  // For any specialty not covered, add a default doctor
  for (const specialty of specialties) {
    if (!coveredSpecialties.has(specialty.name)) {
      doctorsToCreate.push({
        email: `dr.${specialty.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
        fullName: `Dr. ${specialty.name} Specialist`,
        phone: '+10000009999',
        address: `${specialty.name} Clinic, Health City`,
        specialty: specialty.name,
        licenseNumber: `MD9${specialty.id.toString().padStart(3, '0')}`,
        biography: `Specialist in ${specialty.name}.`
      });
    }
  }

  for (const doc of doctorsToCreate) {
    const specialtyId = specialtyMap[doc.specialty];
    if (!specialtyId) {
      console.warn(`Specialty not found for ${doc.specialty}, skipping doctor ${doc.email}`);
      continue;
    }
    await prisma.user.create({
      data: {
        email: doc.email,
        role: 'DOCTOR',
        fullName: doc.fullName,
        phone: doc.phone,
        address: doc.address,
        doctor: {
          create: {
            specialtyId,
            licenseNumber: doc.licenseNumber,
            biography: doc.biography,
          }
        }
      }
    });
  }

  console.log('✅ Seeded doctors with specialties!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 