import React from 'react'
import Section from '@/components/Section'
import Image from 'next/image'
import { SectionTitle, TypingText } from '@/components/CustomTexts'

const Map = () => {
  return (
    <Section>
      <div className="flex flex-col items-center justify-center space-y-8">
        <SectionTitle>Lorem ipsum</SectionTitle>
        <TypingText>Lorem ipsum dolor sit amet consectetur. Euismod nam in ut nulla nulla euismod. Proin fermentum mi vitae diam id.</TypingText>
        <Image src="/assets/img/map.png" alt="Map" width={1600} height={3200} />
      </div>
    </Section>
  );
};

export default Map;
