import React from 'react'

interface SectionProps {
  children: React.ReactNode;
  background?: string;
}

const Section = ({children, background}: SectionProps) => {
  return (
    <section className={`${background} container mx-auto px-8 pt-5 pb-8 lg:pt-[90px] lg:pb-[110px] lg:px-[110px]`}>
      {children}
    </section>
  )
}

export default Section