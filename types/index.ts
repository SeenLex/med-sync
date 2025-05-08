// User Types
export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  contactNumber?: string;
  dateOfBirth?: Date;
  gender?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;
  userId: string;
  user: User;
  insuranceInfo?: string;
  emergencyContact?: string;
}

export interface Doctor {
  id: string;
  userId: string;
  user: User;
  specialization: string;
  licenseNumber?: string;
  biography?: string;
  availability?: Availability[];
}

// Appointment Types
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED';
export type AppointmentType = 'IN_PERSON' | 'VIRTUAL';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  patient: Patient;
  doctor: Doctor;
  videoSession?: VideoSession;
}

export interface AppointmentFormData {
  doctorId: string;
  startTime: Date;
  endTime: Date;
  type: AppointmentType;
  notes?: string;
}

export interface Availability {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}

export interface VideoSession {
  id: string;
  appointmentId: string;
  sessionToken: string;
  startedAt?: Date;
  endedAt?: Date;
}

// Other related types
export type RecordType = 'LAB_RESULT' | 'PRESCRIPTION' | 'VISIT_SUMMARY' | 'MEDICAL_HISTORY' | 'OTHER';
export type NotificationType = 
  'APPOINTMENT_REMINDER' | 
  'APPOINTMENT_CONFIRMED' | 
  'APPOINTMENT_CANCELED' | 
  'NEW_MESSAGE' | 
  'MEDICAL_RECORD_UPDATE' | 
  'SYSTEM';

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  title: string;
  description: string;
  fileUrl?: string;
  type: RecordType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
}
