import React from 'react'

interface RadialBorderGradientProps {
  direction: string;
}

const RadialBorderGradient = ({direction}: RadialBorderGradientProps) => {
  return (
    <div className={`absolute inset-x-0 h-px w-1/4 mx-auto -${direction}-px shadow-2xl  bg-gradient-to-r from-transparent via-[#B4B4B4]/70 to-transparent`} />
  )
}

export default RadialBorderGradient