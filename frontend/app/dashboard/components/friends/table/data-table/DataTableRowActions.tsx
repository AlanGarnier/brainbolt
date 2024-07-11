"use client";

import { Table, Column, Row } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Friends } from "@/lib/types";
import { acceptFriendRequest } from "@/app/actions/friends/acceptFriendRequest";
import { rejectFriendRequest } from "@/app/actions/friends/rejectFriendRequest";
import { removeFriendRequest } from "@/app/actions/friends/removeFriendRequest";
import { deleteFriend } from "@/app/actions/friends/deleteFriend";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    type: string;
}

export function DataTableRowActions<TData extends Friends>({ row, type }: DataTableRowActionsProps<TData>) {
  const userId = row.original.user_id;
  const friendId = row.original.friend_id;

  const router = useRouter();

  const handleAccept = async () => {
    try {
        await acceptFriendRequest(userId, friendId);
        router.refresh();
        toast.success("Demande d'ami acceptée");
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message || "Failed to accept friend request");
        } else {
            toast.error("An unknown error occurred");
        }
    }
  };

  const handleReject = async () => {
    try {
      await rejectFriendRequest(userId, friendId);
      router.refresh();
      toast.success("Demande d'ami refusée");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to reject friend request");
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleRemove = async () => {
    try {
      await removeFriendRequest(userId, friendId);
      router.refresh();
      toast.success("Demande d'ami retirée");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to remove friend request");
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFriend(userId, friendId);
      router.refresh();
      toast.success("Ami supprimé");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to delete friend");
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4 text-primary-black/80 dark:text-white/80" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-primary-black border border-lighter-grey dark:border-dark-grey py-2 px-4 rounded-md ring-transparent hover:ring-transparent">
        {type === "received" && (
          <>
            <DropdownMenuItem className="cursor-pointer mb-2" onSelect={handleAccept}>
              Accepter
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onSelect={handleReject}>
              Refuser
            </DropdownMenuItem>
          </>
        )}
        {type === "pending" && (
          <DropdownMenuItem className="cursor-pointer mb-2" onSelect={handleRemove}>
            Retirer la demande
          </DropdownMenuItem>
        )}
        {type === "friends" && (
          <DropdownMenuItem className="cursor-pointer" onSelect={handleDelete}>
            Supprimer cet ami
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
