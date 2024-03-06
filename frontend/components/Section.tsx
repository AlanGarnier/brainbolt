import React from 'react'

interface SectionProps {
  children: React.ReactNode;
}

const Section = ({children}: SectionProps) => {
  return (
    <section className="container mx-auto px-8 pt-5 pb-8 lg:pt-[90px] lg:pb-[110px] lg:px-[110px] bg-section ">
      {children}
    </section>
  )
}

export default Section