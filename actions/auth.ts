'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (
    !email ||
    !/^[a-zA-Z0-9]+@[a-zA-Z]+\.(com|net|org)$/.test(email) ||
    !/(yahoo|gmail|outlook)\.com$/.test(email)
  ) {
    throw new Error('Invalid e-mail address!');
  }

  if (!password) {
    throw new Error('Password is required!');
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error('Authentication failed! Incorrect e-mail address or password!');
  }

  revalidatePath('/');
  redirect('/home');
}

export async function register(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const fullName = formData.get('fullName') as string;


  // Email validation
  if (!email) {
    throw new Error('Email is required!');
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(yahoo|gmail|outlook)\.com$/;
  if (!emailRegex.test(email)) {
    throw new Error('Email must be from yahoo, gmail, or outlook and end in .com');
  }

  // Name validation
  if (!fullName) {
    throw new Error('Full name is required!');
  }
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(fullName)) {
    throw new Error('Full name must contain only letters and spaces!');
  }

  // Password validation
  const passwordErrors = [];
  if (!password) passwordErrors.push('Password is required!');
  if (password.length < 6) passwordErrors.push('Password must be at least 6 characters!');
  if (!/[A-Z]/.test(password)) passwordErrors.push('Password must include an uppercase letter!');
  if (!/[a-z]/.test(password)) passwordErrors.push('Password must include a lowercase letter!');
  if (!/[0-9]/.test(password)) passwordErrors.push('Password must include a digit!');
  if (!/[^a-zA-Z0-9]/.test(password)) passwordErrors.push('Password must include a special character!');

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
    redirect('/')
  }
