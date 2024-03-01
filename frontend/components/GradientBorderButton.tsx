import React from 'react'

interface GradientBorderButtonProps {
    children: React.ReactNode;
}

const GradientBorderButton = ({children}: GradientBorderButtonProps) => {
  return (
    <button className="p-[2px] relative glow">
        <div className="absolute group inset-0 bg-gradient-to-r from-primary-purple to-primary-skyblue rounded-lg" />
        <div className="px-8 py-[6px] bg-primary-black rounded-[6px]  relative group transition duration-200 font-jost font-medium hover:bg-transparent">
          {children}
        </div>
    </button>
  )
}

export default GradientBorderButton