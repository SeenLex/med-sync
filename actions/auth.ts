'use server';

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { saveUser } from './user';



export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(yahoo|gmail|outlook)\.com$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email must be from yahoo, gmail, or outlook and end in .com');
  }

  if (!password) {
    throw new Error('Password is required!');
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error('Authentication failed! Incorrect e-mail address or password!');
  }
  const { getUserByEmail } = await import('./user');
  const dbUser = await getUserByEmail(email);

  if (!dbUser) {
    throw new Error('User not found in the database!');
  }
  revalidatePath('/', 'layout');

  if (dbUser.role === 'DOCTOR') {
    redirect('/doctor');
  } else if (dbUser.role === 'ADMIN') {
    redirect('/admin');
  } else {
    redirect('/');
  }
}

export async function register(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const fullName = formData.get('fullName') as string;
  const pnc = formData.get('pnc') as string;
  const gender = formData.get('gender') as string;
  const address = formData.get('address') as string;
  const dateOfBirth = formData.get('dateOfBirth') as string;
  
  if (!email) {
    throw new Error('Email is required!');
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(yahoo|gmail|outlook)\.com$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email must be from yahoo, gmail, or outlook and end in .com');
  }

  if (!fullName) {
    throw new Error('Full name is required!');
  }
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(fullName)) {
    throw new Error('Full name must contain only letters and spaces!');
  }
  if (!pnc) throw new Error('PNC is required!');
  if (!gender) throw new Error('Gender is required!');
  if (!address) throw new Error('Address is required!');
  if (!dateOfBirth) throw new Error('Date of birth is required!');

  const passwordErrors = [];
  if (!password) passwordErrors.push('Password is required!');
  if (password.length < 6) passwordErrors.push('Password must be at least 6 characters!');
  if (!/[A-Z]/.test(password)) passwordErrors.push('Password must include at least an uppercase letter!');
  if (!/[a-z]/.test(password)) passwordErrors.push('Password must include at least a lowercase letter!');
  if (!/[0-9]/.test(password)) passwordErrors.push('Password must include at least a digit!');
  if (!/[^a-zA-Z0-9]/.test(password)) passwordErrors.push('Password must include at least a special character!');

  if (passwordErrors.length > 0) {
    throw new Error(passwordErrors.join(' '));
  }

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match!');
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message || 'Failed to register!');
  }
  saveUser(formData);
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/' , 'layout')
  redirect('/landing-page')
}