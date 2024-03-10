"use client";
import React, { useState } from 'react'
import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    register?: any;
    // value?: any;
    // onChange?: (value: any) => void;
    error?: string | undefined;
    textarea?: boolean;
    className?: string;
  }

const Input = ({id,
    label,
    type,
    placeholder,
    register,
    error,
    textarea = false,
    className = "input",
    // value,
    // onChange,
  }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputClassName = clsx(
        "w-full",
        "rounded-xl",
        "border",
        {
          "border-red-500": error,
          "bg-red-200": error,
          "border-transparent": !error,
        },
        "bg-primary-light-green",
        "px-5",
        "py-2",
        "outline-none",
        className
      );
    
      const handleTextareaInput = (
        event: React.ChangeEvent<HTMLTextAreaElement>
      ) => {
        const textarea = event.target;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      };

  return (
    <div className='mb-4'>
        <label className="mb-2 block" htmlFor={id}>
            {label}
        </label>
        <div className="relative">
            {
                textarea ? (
                    <textarea
                        className={inputClassName}
                        {...register}
                        id={id}
                        placeholder={placeholder}
                        onInput={handleTextareaInput}
                    />
                ) : (
                        <>
                            <input
                            className={inputClassName}
                            {...register}
                            type={showPassword ? "text" : type}
                            id={id}
                            placeholder={placeholder}
                            />
                            {type === "password" && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 mr-4 -translate-y-1/2 transform"
                            >
                                {showPassword ? (
                                <EyeOff aria-label="Masquer le mot de passe" />
                                ) : (
                                <Eye aria-label="Afficher le mot de passe" />
                                )}
                            </button>
                            )}
                        </>
                    )
            }
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default Input