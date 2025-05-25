export type UserRole = "PATIENT" | "DOCTOR" | "ADMIN";
export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELED" | "COMPLETED";
export type AppointmentType = "IN_PERSON" | "VIRTUAL";
export type RecordType = "LAB_RESULT" | "PRESCRIPTION" | "VISIT_SUMMARY" | "MEDICAL_HISTORY" | "OTHER";
export type NotificationType = "APPOINTMENT_REMINDER"| "APPOINTMENT_CONFIRMED"  | "APPOINTMENT_CANCELED"  | "NEW_MESSAGE"  | "MEDICAL_RECORD_UPDATE"  | "SYSTEM";

export interface User {
  id: number;
  email: string;
  role: UserRole;
  fullName: string;
  profileImage?: string | null;
  phone?: string | null;
  dateOfBirth?: Date | null;
  gender?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
  patient?: Patient;
  doctor?: Doctor;
  admin?: Admin;
  notifications?: Notification[];
  sentMessages?: Message[];
}

export interface Patient {
  id: number;
  userId: number;
  pnc?: string | null;
  insuranceInfo?: string | null;
  emergencyContact?: string | null;
  user: User;
  appointments?: Appointment[];
  medicalRecords?: MedicalRecord[];
  chatSessions?: ChatSession[];
}

export interface Doctor {
  id: number;
  userId: number;
  specialization: string;
  licenseNumber?: string | null;
  biography?: string | null;
  user: User;
  appointments?: Appointment[];
  medicalRecords?: MedicalRecord[];
  availability?: Availability[];
  chatSessions?: ChatSession[];
}

export interface Admin {
  id: number;
  userId: number;
  department?: string | null;
  permissions: string[];
  user: User;
}

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  type: AppointmentType;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  patient: Patient;
  doctor: Doctor;
  videoSession?: VideoSession;
}

export interface VideoSession {
  id: number;
  appointmentId: number;
  sessionToken: string;
  startedAt?: Date | null;
  endedAt?: Date | null;
  appointment: Appointment;
}

export interface Availability {
  id: number;
  doctorId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  doctor: Doctor;
}

export interface ChatSession {
  id: number;
  patientId: number;
  doctorId: number;
  createdAt: Date;
  updatedAt: Date;
  patient: Patient;
  doctor: Doctor;
  messages?: Message[];
}

export interface Message {
  id: number;
  chatSessionId: number;
  senderId: number;
  senderRole: UserRole;
  content: string;
  fileUrl?: string | null;
  readAt?: Date | null;
  createdAt: Date;
  chatSession: ChatSession;
  sender: User;
}

export interface MedicalRecord {
  id: number;
  patientId: number;
  doctorId: number;
  title: string;
  description: string;
  fileUrl?: string | null;
  type: RecordType;
  createdAt: Date;
  updatedAt: Date;
  patient: Patient;
  doctor: Doctor;
}

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  user: User;
}
