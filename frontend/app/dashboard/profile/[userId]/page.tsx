import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { DashboardSubtitleScore, DashboardTitle,DashboardText } from "@/components/CustomTexts";
import Image from "next/image";
import React from "react";

const ProfilePage = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return null;
    }
    
    return (
        <>
            <div className="w-11/12 ">
                <DashboardTitle>Mon Profil 🎮 </DashboardTitle>   
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
                        <div className="flex space-x-4">
                            <DashboardSubtitleScore>Nombre de victoires :</DashboardSubtitleScore>
                        </div>
                    </div>
                </div>
            </div>
        </>  

    );
};

export default ProfilePage;
