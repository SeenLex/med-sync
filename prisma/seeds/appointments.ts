import prisma from '../db';
import { Role, AppointmentStatus, AppointmentType } from '../generated/prisma';

async function seedAppointments() {
  console.log('🌱 Starting appointments seeding...');

  const patients = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        role: Role.PATIENT,
        fullName: 'John Doe',
        phone: '+1234567890',
        dateOfBirth: new Date('1985-03-15'),
        gender: 'Male',
        address: '123 Main St, New York, NY 10001',
        patient: {
          create: {
            pnc: '1234567890123',
            insuranceInfo: 'Health Insurance Co. - Policy #HI123456',
            emergencyContact: 'Jane Doe - +1234567891'
          }
        }
      },
      include: { patient: true }
    }),
    prisma.user.create({
      data: {
        email: 'mary.smith@example.com',
        role: Role.PATIENT,
        fullName: 'Mary Smith',
        phone: '+1234567892',
        dateOfBirth: new Date('1990-07-22'),
        gender: 'Female',
        address: '456 Oak Ave, Los Angeles, CA 90210',
        patient: {
          create: {
            pnc: '2345678901234',
            insuranceInfo: 'MediCare Plus - Policy #MP789012',
            emergencyContact: 'Robert Smith - +1234567893'
          }
        }
      },
      include: { patient: true }
    }),
    prisma.user.create({
      data: {
        email: 'alex.johnson@example.com',
        role: Role.PATIENT,
        fullName: 'Alex Johnson',
        phone: '+1234567894',
        dateOfBirth: new Date('1978-11-08'),
        gender: 'Male',
        address: '789 Pine St, Chicago, IL 60601',
        patient: {
          create: {
            pnc: '3456789012345',
            insuranceInfo: 'BlueCross BlueShield - Policy #BC345678',
            emergencyContact: 'Lisa Johnson - +1234567895'
          }
        }
      },
      include: { patient: true }
    }),
    prisma.user.create({
      data: {
        email: 'sarah.wilson@example.com',
        role: Role.PATIENT,
        fullName: 'Sarah Wilson',
        phone: '+1234567896',
        dateOfBirth: new Date('1992-04-12'),
        gender: 'Female',
        address: '321 Elm St, Miami, FL 33101',
        patient: {
          create: {
            pnc: '4567890123456',
            insuranceInfo: 'Aetna Health - Policy #AH901234',
            emergencyContact: 'Michael Wilson - +1234567897'
          }
        }
      },
      include: { patient: true }
    })
  ]);

  const doctors = await Promise.all([
    prisma.user.create({
      data: {
        email: 'dr.martinez@medcenter.com',
        role: Role.DOCTOR,
        fullName: 'Dr. Elena Martinez',
        phone: '+1555123456',
        address: 'Medical Center, 100 Health Blvd, Boston, MA 02101',
        doctor: {
          create: {
            licenseNumber: 'MD123456',
            biography: 'Board-certified cardiologist with 15 years of experience in cardiovascular medicine.'
          }
        }
      },
      include: { doctor: true }
    }),
    prisma.user.create({
      data: {
        email: 'dr.thompson@medcenter.com',
        role: Role.DOCTOR,
        fullName: 'Dr. James Thompson',
        phone: '+1555123457',
        address: 'Medical Center, 100 Health Blvd, Boston, MA 02101',
        doctor: {
          create: {
            licenseNumber: 'MD789012',
            biography: 'Internal medicine specialist focused on preventive care and chronic disease management.'
          }
        }
      },
      include: { doctor: true }
    }),
    prisma.user.create({
      data: {
        email: 'dr.patel@medcenter.com',
        role: Role.DOCTOR,
        fullName: 'Dr. Priya Patel',
        phone: '+1555123458',
        address: 'Medical Center, 100 Health Blvd, Boston, MA 02101',
        doctor: {
          create: {
            licenseNumber: 'MD345678',
            biography: 'Dermatologist specializing in skin cancer prevention and cosmetic dermatology.'
          }
        }
      },
      include: { doctor: true }
    }),
    prisma.user.create({
      data: {
        email: 'dr.kim@medcenter.com',
        role: Role.DOCTOR,
        fullName: 'Dr. Michael Kim',
        phone: '+1555123459',
        address: 'Medical Center, 100 Health Blvd, Boston, MA 02101',
        doctor: {
          create: {
            licenseNumber: 'MD567890',
            biography: 'Orthopedic surgeon with expertise in sports medicine and joint replacement.'
          }
        }
      },
      include: { doctor: true }
    })
  ]);

  console.log(`✅ Created ${patients.length} patients and ${doctors.length} doctors`);

  const appointmentStatuses = [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED, AppointmentStatus.CANCELED, AppointmentStatus.COMPLETED];
  const appointmentTypes = [AppointmentType.IN_PERSON, AppointmentType.VIRTUAL];
  
  const appointmentNotes = [
    'Annual checkup and physical examination',
    'Follow-up consultation for ongoing treatment',
    'Routine blood work and lab results review',
    'Cardiac stress test and evaluation',
    'Skin examination and mole check',
    'Joint pain assessment and treatment options',
    'Hypertension monitoring and medication review',
    'Diabetes management consultation',
    'Pre-operative consultation',
    'Post-surgery follow-up',
    'Allergy testing and consultation',
    'Vaccination and immunization',
    'Weight management consultation',
    'Mental health screening',
    'Preventive care and health screening'
  ];

  const appointments = [];
  
  for (let i = 0; i < 20; i++) {
    const startYear = 2020;
    const endYear = 2025;
    const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const randomMonth = Math.floor(Math.random() * 12);
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomHour = Math.floor(Math.random() * 8) + 9;
    const randomMinute = Math.floor(Math.random() * 4) * 15;
    
    const startTime = new Date(randomYear, randomMonth, randomDay, randomHour, randomMinute);
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);
    
    const randomPatient = patients[Math.floor(Math.random() * patients.length)];
    const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
    
    let status: AppointmentStatus;
    const now = new Date();
    if (startTime < now) {
      const rand = Math.random();
      if (rand < 0.7) status = AppointmentStatus.COMPLETED;
      else if (rand < 0.9) status = AppointmentStatus.CANCELED;
      else status = appointmentStatuses[Math.floor(Math.random() * appointmentStatuses.length)];
    } else {
      const rand = Math.random();
      if (rand < 0.6) status = AppointmentStatus.CONFIRMED;
      else if (rand < 0.9) status = AppointmentStatus.PENDING;
      else status = AppointmentStatus.CANCELED;
    }

    const type = appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];
    const note = appointmentNotes[Math.floor(Math.random() * appointmentNotes.length)];

    appointments.push({
      startTime,
      endTime,
      status,
      type,
      note,
      patientId: randomPatient.patient!.id,
      doctorId: randomDoctor.doctor!.id,
    });
  }

  for (const appointment of appointments) {
    await prisma.appointment.create({
      data: appointment,
    });
  }

  console.log('✅ Seeded 20 appointments');
}

seedAppointments()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });