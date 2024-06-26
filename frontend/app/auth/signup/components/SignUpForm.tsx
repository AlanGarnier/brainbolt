"use client";
import React, { useState } from 'react';
import Steps from './Steps';
import Input from '@/components/forms/Input';
import { SectionTitle } from '@/components/CustomTexts';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import z from 'zod';
import { SignUpFormSchema } from '@/lib/schemas';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation'
import { CldUploadButton } from 'next-cloudinary';
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { checkCredentialsAvailability } from '@/utils/validations';

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
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState('/assets/img/user-placeholder.png');
  
  const delta = currentStep - previousStep

  const router = useRouter()

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
    setValue("picture", result.info.secure_url, {
      shouldValidate: true,
    });
    setAvatarUrl(result.info.secure_url);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      method: "POST",
      body: JSON.stringify(
        {
          email: data.email,
          password: data.password,
          pseudo: data.pseudo,
          picture: data.picture,
        }
      ),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    if (result?.error) {
      toast.error(result.error);
      return;
    } else {
      toast.success("Inscription réussie");
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/auth/login",
      });
      router.refresh();
      router.push('/auth/login');
    }
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })
    const {picture} = getValues()

    if (!output) return

    if (currentStep === 0) {
      const email = getValues().email;
      const isAvailable = await checkCredentialsAvailability('email', email);

      if (!isAvailable) {
        toast.error("Cet email est déjà associé à un compte");
        return;
      }
    }

    if (currentStep === 1) {
      const pseudo = getValues().pseudo;
      const isAvailable = await checkCredentialsAvailability('pseudo', pseudo);

      if (!isAvailable) {
        toast.error("Le nom d'utilisateur est déjà pris");
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep(step => step + 1);
      // console.log('en cours')
    } else if (currentStep === steps.length - 1 && getValues().picture) {
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
                {errors.password && (
                  <div>
                    {errors.password.types?.min && <p>{errors.password.types.min}</p>}
                    {errors.password.types?.uppercase && <p>{errors.password.types.uppercase}</p>}
                    {errors.password.types?.special && <p>{errors.password.types.special}</p>}
                    {errors.password.types?.number && <p>{errors.password.types.number}</p>}
                  </div>
                )}
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
                register={register("pseudo")}
                error={errors.pseudo?.message}
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
              {/* rounded-md py-12 flex justify-center items-center bg-gradient-to-r from-primary-purple to-primary-skyblue */}
              <div 
                className="w-[200px] h-[200px] relative bg-cover mx-auto rounded-full border-4 border-white" style={{ backgroundImage: `url(${avatarUrl})` }}>
                <CldUploadButton
                  className="w-[48px] h-[48px] absolute flex justify-center items-center bottom-0 right-0 rounded-full bg-white"
                  options={{ maxFiles: 1 }}
                  uploadPreset="pemdkgyj"
                  onUpload={handleUpload}
                >
                  <label 
                    className="cursor-pointer" 
                    htmlFor="file">
                      <Upload color='#333' className="h-7 w-7" />
                  </label>
                  <Input id="image" type="file" register={register("picture")} className="hidden" />
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
              disabled={currentStep === steps.length - 1 && !getValues().picture}
            >
              {
                currentStep === steps.length - 1 ? 'Valider' : <ChevronRight className='h-5 w-5' />
              }
            </Button>
          </div>
          <div className="text-center mt-4">
            <p>Déjà un compte ? {` `}
                <Link href="/auth/login">
                    <span className="font-semibold font-jost bg-gradient-to-r from-primary-purple to-primary-skyblue text-transparent bg-clip-text text-[16px]">Connectez-vous ici</span>
                </Link>
            </p>
          </div>
        </div>
    </>
  )
}

export default SignUpForm