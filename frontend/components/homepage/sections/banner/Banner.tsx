import React from 'react';
import Section from '@/components/Section'

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Banner = () => {
  return (
    <Section>
      <div className="flex flex-col mx-auto lg:max-w-[796px] space-y-[40px] items-center justify-center h-full text-center">
        <h1 className="banner-title">Lorem ipsum dolor sit amet consectetur. </h1>
        <h2 className="banner-text">Lorem ipsum dolor sit amet consectetur. Euismod nam in ut nulla nulla euismod.</h2>

        <div className="inline">
          <Button
            asChild
            variant={'default'}>
            <Link
              href="/login"
              className="font-semibold font-jost text-[16px]">
              Lancez la partie
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}

export default Banner;
