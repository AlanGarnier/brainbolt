import Link from 'next/link';
import React from 'react';

interface CustomTextProps {
    children: React.ReactNode;
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

export const TypingText = ({children}: CustomTextProps) => {
  return (
    <p className="typing-text">
        {children}
    </p>
  )
}

export const SectionTitle = ({children}: CustomTextProps) => {
    return (
        <h2 className="section-title">
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
