import { getUser } from "@/app/actions/getUser";
import React from "react";

const UserProfilePage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const user = await getUser(userId);
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>Profil de {user.pseudo}</h2>
    </div>
  );
};

export default UserProfilePage;