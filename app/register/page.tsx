"use client";

import React, { useState } from "react";
import { saveUser } from "../../actions/user";
import { register } from "../../actions/auth";

const RegisterPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const form = event.currentTarget.form;
    if (!form) return;

    const formData = new FormData(form);

    try {
      await saveUser(formData);
      await register(formData);
    } catch (error) {
      if(error instanceof Error) {
        setErrorMessage(error.message || 'Login failed. Please try again.');
    } else {
        setErrorMessage('An unexpected error occured. Please try again');
    }
  } finally {
    setIsLoading(false);
  }
    }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Welcome Back!
        </h2>
        {errorMessage && (
            <div className="mb-4 text-center text-red-500 text-sm font-medium">
                {errorMessage}
            </div>
        )}

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 font-medium mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-300 text-black"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-600 font-medium mb-2"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-300 text-black"
            />
          </div>
          <div className="mb-4">
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-600 font-medium mb-2"
              >
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-300 text-black"
              />
            </div>
            <label
              htmlFor="surname"
              className="block text-gray-600 font-medium mb-2"
            >
              Surname:
            </label>
            <input
              id="surname"
              name="surname"
              type="text"
              required
              placeholder="Enter your surname"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-300 text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 font-medium mb-2"
            >
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-300 text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-600 font-medium mb-2"
            >
              Phone:
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-300 text-black"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-600 font-medium mb-2"
            >
              Gender:
            </label>
            <input
              id="gender"
              name="gender"
              type="text"
              required
              placeholder="Enter your gender"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-300 text-black"
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <button
              type="button"
              onClick={handleRegister}
              disabled={isLoading}
              className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isLoading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500'
              }`}
            >
                {isLoading ? 'Register...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
