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

                    <Button
                        asChild
                        variant={'default'}
                        className="glow"
                        onClick={handleSubmit(onSubmit)}>
                        <Link
                            href="/auth/login"
                            className="font-bold font-jost">
                            Se connecter
                        </Link>
                    </Button>                    
                </motion.div>
                <div className="flex items-center justify-center text-gray-500 mt-4">
                    <hr className="flex-grow border-gray-500" />
                    <span className="mx-4">ou</span>
                    <hr className="flex-grow border-gray-500" />
                </div>


                {/* Bouton "Se connecter avec Google" */}

                <button className="flex items-center justify-center w-full py-4 bg-gray-800 text-white rounded-md">
                    <Image
                        width={20}
                        height={20}
                        src="/assets/img/google-icon.png"
                        alt="Favicon Brainbolt"
                        className="mr-2" />
                    <span className="ml-2">Se connecter avec Google</span>
                </button>
                {/* Vous n'avez pas de compte */}
                <div className="text-center mt-4">
                    <p>Vous n’avez pas de compte ?

                        <Link href="/auth/signup">
                            <span className="font-semibold font-jost  bg-gradient-to-r from-primary-purple to-primary-skyblue text-transparent  bg-clip-text text-[16px] group-hover:text-white  "> Inscrivez-vous ici </span>
                        </Link>
                    </p>
                </div>
            </form>
        </>
    );
};

export default LoginForm;
