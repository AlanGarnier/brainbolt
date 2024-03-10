"use client";
import React, { useState } from 'react';
import Steps from './Steps';
import Input from '@/components/forms/Input';
import { SectionTitle } from '@/components/CustomTexts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    id: '1',
    name: 'Email/Mot de passe',
    fields: ['email', 'password']
  },
  {
    id: '2',
    name: 'Nom d’utilisateur',
    fields: ['username', 'state', 'city', 'street', 'zip']
  },
  { id: '3', name: 'Avatar', fields: ['image'] }
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
        <form className="space-y-8 w-full min-h-[295px]">
          { currentStep === 0 && (
            <div>
              <SectionTitle 
                className='bg-clip-text text-transparent mb-8 bg-gradient-to-br from-white to-[#52525B]'>
                Commençons par ton email/mot de passe
              </SectionTitle>
              <div className="flex flex-col space-y-4">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  // register={register("email")}
                  // error={errors.email?.message}     
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  // register={register("password")}
                  // error={errors.password?.message}
                />
              </div>
            </div>
          )}
          { currentStep === 1 && (
            <div>
              <SectionTitle 
                className='bg-clip-text text-transparent mb-8 bg-gradient-to-br from-white to-[#52525B]'>
                Trouve-toi un nom de joueur unique !
              </SectionTitle>
              <Input
                id="name"
                type="text"
                placeholder="Nom d'utilisateur"
                // register={register("name")}
                // error={errors.name?.message}
              />
            </div>
          )}
          { currentStep === 2 && (
            <div>
              <SectionTitle 
                className='bg-clip-text text-transparent mb-8 bg-gradient-to-br from-white to-[#52525B]'>
                Presque fini ! Pimp ton profil en ajoutant une image d&apos;avatar !
              </SectionTitle>
              <Input
                id="name"
                type="text"
                placeholder="Nom d'utilisateur"
                // register={register("name")}
                // error={errors.name?.message}
              />
            </div>
          )}
        </form>
        {/* Navigation */}
        <div className='mt-8 pt-5'>
          <div className='flex justify-between'>
            <Button
              onClick={prev}
              disabled={currentStep === 0}
              variant='navigation'
            >
              <ChevronLeft className='h-5 w-5' />
            </Button>
            <Button
              onClick={next}
              disabled={currentStep === steps.length - 1}
              variant='navigation'
            >
              <ChevronRight className='h-5 w-5' />
            </Button>
          </div>
        </div>
    </>
  )
}

export default SignUpForm