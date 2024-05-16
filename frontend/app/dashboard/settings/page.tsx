import { getCurrentUser } from '@/app/actions/getCurrentUser';
import React from 'react'
import SettingsPageContent from '../components/settings/SettingsPageContent';
import { DashboardTitle } from '@/components/CustomTexts';

const SettingsPage = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return null;
    }
  return (
    
    <div className="w-11/12 mx-auto">
        <DashboardTitle>Paramètres ⚙️</DashboardTitle>
        <SettingsPageContent user={user} />
    </div>
  )
}

export default SettingsPage