import { getPendingRequests } from "@/app/actions/friends/getPendingRequests";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { DashboardText, DashboardTitle } from "@/components/CustomTexts";
import { DataTableComponent } from "../../components/friends/table/data-table/DataTableComponent";
import { getReceivedRequests } from "@/app/actions/friends/getReceivedRequests";
import { receivedColumnsData } from "../../components/friends/table/columns/receivedColumnsData";
import { pendingColumnsData } from "../../components/friends/table/columns/pendingColumnsData";

export const metadata = {
  title: 'Gérer les demandes en amis - Dashboard',
  description: 'Gérer les demandes en amis sur votre dashboard',
};

export default async function FriendsRequestsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const pendingRequests = await getPendingRequests(user.id);
  const receivedRequests = await getReceivedRequests(user.id);

  return (
    <>
      <div className="w-11/12 mx-auto">
        <DashboardTitle>Demandes en amis 📩</DashboardTitle>
      </div>

      <div className="w-11/12 mx-auto">
        <DashboardText className="mb-6">Demandes en amis reçues 📩</DashboardText>
        <DataTableComponent columns={receivedColumnsData} data={receivedRequests} type="received" />
      </div>

      <div className="w-11/12 my-10 mx-auto">
        <DashboardText className="mb-6">Requêtes en attente ⏳</DashboardText>
        <DataTableComponent columns={pendingColumnsData} data={pendingRequests} type="pending" />
      </div>
    </>
  );
}
