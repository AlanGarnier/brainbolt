
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { DashboardSubtitleScore, DashboardTitle,DashboardText } from "@/components/CustomTexts";
import Image from "next/image";
import { ProfileButton } from "@/components/ui/profilebutton";
import Link from 'next/link'


const UserProfilePage = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return null;
    }
    
    return (
        <>
            <div className="w-11/12 ">
            <DashboardTitle>Profil joueur 🎮</DashboardTitle>   
        </div>
        <div className="flex flex-col items-center justify-center  mt-4">
            <div className=" p-8 rounded-lg text-center">
                <div className="relative rounded-full overflow-hidden w-32 h-32 mb-4">
                    <Image
                        src={user?.picture || "/assets/img/user-placeholder.png"}
                        alt={user?.pseudo || "User"}
                        layout="fill"
                        className="object-cover"
                    />
                </div>
                <DashboardTitle>{user.pseudo}</DashboardTitle>

            </div>
            <div className="text-center">
                        <div className="flex flex-col items-center justify-center gap-8">
                        <ProfileButton
                        asChild
                        variant={'default'}
                        className="glow">
                            <Link
                                href="#"
                                >
                                Ajouter en ami 
                            </Link>
                    </ProfileButton>                             <DashboardSubtitleScore>Score</DashboardSubtitleScore>

                            <DashboardText> {"user?.score" || "Votre ami n'a toujours pas de score á afficher"}</DashboardText>
                        </div>
             </div>
        </div>
        </>  

    );
};

export default UserProfilePage;
