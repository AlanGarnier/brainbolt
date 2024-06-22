import { getCurrentUser } from "@/app/actions/getCurrentUser";
import React from "react";

const ProfilePage = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return null;
    }
    return (
        <div>
            <h2>Notre Profil</h2>
            <p>Notre pseudo: {user.pseudo}</p>
        </div>
    )
    }

export default ProfilePage;