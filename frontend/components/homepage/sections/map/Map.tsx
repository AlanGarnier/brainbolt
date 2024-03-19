import React from 'react'
import Section from '@/components/Section'
import Image from 'next/image'
import { SectionTitle, TypingText } from '@/components/CustomTexts'

const Map = () => {
  return (
    <Section>
      <div className="mx-auto flex flex-col text-center items-center justify-center space-y-5 lg:space-y-10 lg:max-w-[763px] mb-9 lg:mb-20">
        <TypingText>Lorem ipsum</TypingText>
        <SectionTitle>Lorem ipsum dolor sit amet consectetur. Euismod nam in ut nulla nulla euismod. Proin fermentum mi vitae diam id.</SectionTitle>
      </div>
      <Image src="/assets/img/map.png" alt="Map" width={1170} height={535} />
    </Section>
  );
};

export default Map;
