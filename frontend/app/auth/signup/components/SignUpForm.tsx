"use client";
import React, { useState } from 'react';
import Steps from './Steps';
import Input from '@/components/forms/Input';

const steps = [
  {
    id: '1',
    name: 'Personal Information',
    fields: ['firstName', 'lastName', 'email']
  },
  {
    id: '2',
    name: 'Address',
    fields: ['country', 'state', 'city', 'street', 'zip']
  },
  { id: '3', name: 'Complete', fields: ['toto'] }
]

const SignUpForm = () => {
  // const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  // const delta = currentStep - previousStep

  const next = () => {
    // const fields = steps[currentStep].fields
      // setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }

  const prev = () => {
    if (currentStep > 0) {
      // setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }
  
  return (
    <>
        {/* Steps */}
        <Steps 
          steps={steps} 
          currentStep={currentStep} 
        />
        {/* Form */}
        <form className="space-y-8 w-full">
          <Input
            id="name"
            type="text"
            // label="Nom"
            placeholder="Nom d'utilisateur"
            // register={register("name")}
            // error={errors.name?.message}
          />
          <Input
            id="email"
            type="email"
            // label="Email"
            placeholder="Email"
            // register={register("email")}
            // error={errors.email?.message}     
          />
          <Input
            id="password"
            type="password"
            // label="Mot de passe"
            placeholder="Mot de passe"
            // register={register("password")}
            // error={errors.password?.message}
          />
        </form>
        {/* Navigation */}
        <div className='mt-8 pt-5'>
          <div className='flex justify-between'>
            <button
              type='button'
              onClick={prev}
              disabled={currentStep === 0}
              className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 19.5L8.25 12l7.5-7.5'
                />
              </svg>
            </button>
            <button
              type='button'
              onClick={next}
              disabled={currentStep === steps.length - 1}
              className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 4.5l7.5 7.5-7.5 7.5'
                />
              </svg>
            </button>
          </div>
        </div>
    </>
  )
}

export default SignUpForm