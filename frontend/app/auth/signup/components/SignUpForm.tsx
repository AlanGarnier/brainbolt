"use client";
import React, { useState } from 'react';
import Steps from './Steps';
import Input from '@/components/forms/Input';
import { SectionTitle } from '@/components/CustomTexts';
import { ChevronLeft, ChevronRight, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

import z from 'zod';
import { SignUpFormSchema } from '@/lib/schemas';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CldUploadButton } from 'next-cloudinary';
import { motion } from 'framer-motion'

const steps = [
  {
    id: '1',
    name: 'Email/Mot de passe',
    fields: ['email', 'password']
  },
  {
    id: '2',
    name: 'Nom d’utilisateur',
    fields: ['username']
  },
  { id: '3', name: 'Avatar', fields: ['image'] },
]

type Inputs = z.infer<typeof SignUpFormSchema>;

const SignUpForm = () => {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  
  const delta = currentStep - previousStep

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<Inputs> = data => {
    // console.log(data)
    // console.log('Form submitted')
    return data
 
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })
    const {image} = getValues()

    if (!output) return

    // console.log('valeurs actuelles', getValues())

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep(step => step + 1);
      // console.log('en cours')
    } else if (currentStep === steps.length - 1 && getValues().image) {
      await handleSubmit(onSubmit)();
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
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
        <form className="space-y-8 w-full min-h-[240px] lg:min-h-[295px]" onSubmit={handleSubmit(onSubmit)}>
          {/* Si le currentStep est égal à 0, on affiche les champs email et password */}
          { currentStep === 0 && (
            <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <SectionTitle 
                className='bg-clip-text text-transparent mb-8 bg-gradient-to-br from-white to-[#52525B]'>
                Commençons par ton email/mot de passe
              </SectionTitle>
              <div className="flex flex-col space-y-4">
                <Input
                  id="email"
                  label="email"
                  type="email"
                  placeholder="Email"
                  register={register("email")}
                  error={errors.email?.message}     
                />
                <Input
                  id="password"
                  label="password"
                  type="password"
                  placeholder="Mot de passe"
                  register={register("password")}
                  error={errors.password?.message}
                />
              </div>
            </motion.div>
          )}
          {/* Si le currentStep est égal à 1, on affiche le champ username */}
          { currentStep === 1 && (
            <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <SectionTitle 
                className='bg-clip-text text-transparent mb-8 bg-gradient-to-br from-white to-[#52525B]'>
                Trouve-toi un nom de joueur unique !
              </SectionTitle>
              <Input
                id="username"
                label="username"
                type="text"
                placeholder="Nom d'utilisateur"
                register={register("username")}
                error={errors.username?.message}
              />
            </motion.div>
          )}
          {/* Si le currentStep est égal à 2, on affiche le champ image */}
          { currentStep === 2 && (
             <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <SectionTitle 
                className='bg-clip-text text-transparent mb-8 bg-gradient-to-br from-white to-[#52525B]'>
                Presque fini ! Pimp ton profil en ajoutant une image d&apos;avatar !
              </SectionTitle>
              <div className="relative w-48 h-48 bg-gradient-to-r from-primary-purple to-primary-skyblue rounded-full flex justify-center items-center">
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  uploadPreset="pemdkgyj"
                  onUpload={handleUpload}
                >
                  <label 
                    className="cursor-pointer" 
                    htmlFor="file">
                      <FileUp className="h-24 w-24" />
                  </label>
                  <Input id="image" type="file" register={register("image")} className="hidden" />
                </CldUploadButton>
              </div>
            </motion.div>
          )}
        </form>
        {/* Navigation */}
        <div className='mt-8 pt-5'>
          <div className='flex justify-between'>
            {/* Bouton précédent */}
            <Button
              onClick={prev}
              disabled={currentStep === 0}
              variant="navigation"
            >
              <ChevronLeft className='h-5 w-5' />
            </Button>
            {/* Bouton suivant / valider */}
            <Button
              onClick={next}
              type="submit"
              variant="navigation"
              disabled={currentStep === steps.length - 1 && !getValues().image}
            >
              {
                currentStep === steps.length - 1 ? 'Valider' : <ChevronRight className='h-5 w-5' />
              }
            </Button>
          </div>
        </div>
    </>
  )
}

export default SignUpForm