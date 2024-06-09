"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Friends } from "@/lib/types";
import { DataTableRowActions } from "../data-table/DataTableRowActions";
import { dateFormatting } from "@/utils/dateFormatting";
import Image from "next/image";

export const friendsColumnsData: ColumnDef<Friends>[] = [
  {
    id: "friend_info",
    header: "Utilisateur",
    cell: ({ row }) => {
      const { friend_pseudo, friend_picture } = row.original;
      return (
        <div className="flex items-center space-x-4">
          <Image src={friend_picture} alt={friend_pseudo} width={40} height={40} className="rounded-full" />
          <span className="text-primary-black/80 dark:text-white/80">{friend_pseudo}</span>
        </div>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.original.status;
      const handleStatus = (status: string) => {
        switch (status) {
          case "pending":
            return <span className="text-primary-orange font-bold">En attente ⏳</span>;
          case "accepted":
            return <span className="text-primary-green font-bold">Acceptée ✅</span>;
          default:
            return <span className="text-gray-500 font-bold">Inconnu</span>;
        }
      };
      return <div>{handleStatus(status)}</div>;
    },
  },
  {
    id: "created_at",
    accessorKey: "created_at",
    header: "Date de la demande",
    cell: ({ row }) => {
      const date = row.original.created_at;
      return <span className="text-primary-black/80 dark:text-white/80">{dateFormatting(date)}</span>;
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DataTableRowActions row={row} type="friends" />
    ),
  },
];
