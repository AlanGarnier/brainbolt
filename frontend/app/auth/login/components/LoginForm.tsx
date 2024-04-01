"use client";
import React from 'react';
import Input from '@/components/forms/Input';
import { SectionTitle } from '@/components/CustomTexts';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import z from 'zod';
import { SignUpFormSchema } from '@/lib/schemas';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

type Inputs = z.infer<typeof SignUpFormSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    // Handle form submission here
  };

  return (
    <>
      <form className="space-y-8 w-full min-h-[240px] lg:min-h-[295px]" onSubmit={handleSubmit(onSubmit)}>
     
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <Image 
              width={40}
              height={40}
              src="/assets/img/brainbolt-favicon.png" 
              alt="Favicon Brainbolt" />
          <SectionTitle className='bg-clip-text text-transparent mb-8 bg-gradient-to-br from-white to-[#52525B]'>
            Connexion
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Button variant={'default'} className="glow">
            <Link href="/auth/login" className="font-semibold font-jost">
              Se connecter
            </Link>
          </Button>
        </motion.div>
      </form>
    </>
  );
};

export default LoginForm;
