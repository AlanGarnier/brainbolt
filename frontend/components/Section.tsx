import React from 'react'

interface SectionProps {
  children: React.ReactNode;
  background?: string;
  id?: string;
}

const Section = ({children, background, id}: SectionProps) => {
  return (
    <section id={`${id}`} className={`${background} container mx-auto px-8 pt-5 pb-8 lg:pt-[70px] lg:pb-[110px] lg:px-[110px]`}>
      {children}
    </section>
  )
}

export default Section