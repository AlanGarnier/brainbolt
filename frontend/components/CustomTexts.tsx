"use client";
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { textContainer, typingText } from '@/lib/motion';

interface CustomTextProps {
    children: React.ReactNode;
    className?: string;
}

interface TypingTextProps {
    text: string;
}

interface NavLinkProps {
    children: React.ReactNode;
    link: string;
}

export const HeroTitle = ({children}: CustomTextProps) => {
    return (
        <h1 className="hero-title">
            {children}
        </h1>
    )
}

export const HeroSubtitle = ({children}: CustomTextProps) => {
    return (
        <p className="hero-subtitle">
            {children}
        </p>
    )
}

export const TypingText = ({text}: TypingTextProps) => {
  return (
    <motion.p 
        variants={textContainer}
        className="typing-text">
        {
            Array.from(text).map((letter, index) => (
                <motion.span
                    variants={typingText}
                    key={index}
                >
                {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))
        }
    </motion.p>
  )
}

export const SectionTitle = ({children, className}: CustomTextProps) => {
    return (
        <h2 className={`section-title ${className}`}>
            {children}
        </h2>
    )
}

export const FeatureTitle = ({children}: CustomTextProps) => {
    return (
        <h3 className="feature-title">
            {children}
        </h3>
            
    )
}

export const FeatureText = ({children}: CustomTextProps) => {
    return (
        <p className="feature-text">
            {children}
        </p>
    )
}

export const BannerTitle = ({children}: CustomTextProps) => {
    return (
        <h2 className="banner-title">
            {children}  
        </h2>
    )
}

export const BannerText = ({children}: CustomTextProps) => {
    return (
        <p className="banner-text">
            {children}
        </p>
    )
}

export const NavLink = ({children, link}: NavLinkProps) => {
    return (
        <li className="nav-link flex">
            <Link 
                href={link}
                className="flex items-center md:px-4 lg:px-4 -mb-1">
                {children}
            </Link>
        </li>
    )
}


