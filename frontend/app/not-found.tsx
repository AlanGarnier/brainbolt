import Section from "@/components/Section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

function NotFoundPage() {
	return (
        <>
        <Section>
            <div className="container mx-auto flex flex-col justify-center items-center">
                <Image 
                    width={300}
                    height={300}
                    className="-mt-20 mb-4"
                    src="/assets/img/kirby.gif" 
                    alt="404" 
                />
                <h2 className="block min-h-6 lg:min-h-20 pt-4 mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white to-[#52525B] text-6xl lg:text-[96px] font-ubuntu font-bold text-center">404</h2>
                <p className="mb-6 text-white/70 text-center">The page que vous recherchez n&apos;existe pas.</p>
                <Button
                    asChild
                    variant={'default'}
                    className="glow">
                    <Link
                    href="/"
                    className="font-semibold font-jost text-[16px]">
                    Retour à l&apos;accueil
                    </Link>
                </Button>
            </div>
        </Section>
        </>
    )
}

export default NotFoundPage