"use client";
import React from 'react'
import { fadeIn, staggerContainer } from '@/lib/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/Section';

const Platform = () => {
  return (
    <section className="container mx-auto text-center w-full lg:pr-[110px] lg:pl-[135px]">
      <motion.div
        variants={staggerContainer(0, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
          >
            <Image src="/assets/img/dashboard-mockup.png" alt="Dashboard Mockup" width={1170} height={535} />
          </motion.div>
      </motion.div>
    </section>
  )
}

export default Platform