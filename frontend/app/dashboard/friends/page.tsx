import { DashboardTitle } from '@/components/CustomTexts'
import { DataTableComponent } from '../components/friends/table/data-table/DataTableComponent'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import { getFriends } from '@/app/actions/friends/getFriends'
import { friendsColumnsData } from '../components/friends/table/columns/friendsColumnsData'

export default async function FriendsPage () {

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const data = await getFriends(user.id);
  
  return (
    <>
        <div className="w-11/12 mx-auto">
          <DashboardTitle>Amis 👥</DashboardTitle>
        </div>
        <div className="w-11/12 mt-10 mx-auto">
          <DataTableComponent
            columns={friendsColumnsData} 
            data={data as any[]} 
            type="friends"
          />
        </div>
    </>
  )
}