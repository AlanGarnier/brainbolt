"use client";

interface StepsProps {
    steps: {
        id: string,
        name: string,
        fields: string[]
    }[],
    currentStep: number
}

const Steps = ({steps, currentStep}: StepsProps) => {

  return (
    <nav className="mb-12">
        <ol className="flex justify-center lg:justify-start items-center w-full space-x-4  sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
            {
                steps.map((step, index) => (
                    <li key={step.name} className="flex items-center font-ubuntu font-bold space-x-2.5 rtl:space-x-reverse">
                    {currentStep > index ? (
                        <>
                            <span className="flex items-center justify-center w-8 h-8 border border-white/60 rounded-full shrink-0 text-base">{step.id}</span>
                            <h3 className="font-medium leading-tight text-white/60 hidden lg:block">{step.name}</h3>
                        </>
                    ) : currentStep === index ? (
                        <>
                            <span className="flex items-center justify-center w-8 h-8 border border-white bg-white rounded-full shrink-0 text-base text-primary-black">{step.id}</span>
                            <h3 className="font-medium leading-tight text-white hidden lg:block">{step.name}</h3>
                        </>
                    ) : (
                        <>
                        <span className="flex items-center justify-center w-8 h-8 border border-white/60 rounded-full shrink-0 text-base">{step.id}</span>
                        <h3 className="font-medium leading-tight text-white/60 hidden lg:block">{step.name}</h3>
                        </>
                    )}
                  </li>
                ))
            }
        </ol>
    </nav>
  )
}

export default Steps