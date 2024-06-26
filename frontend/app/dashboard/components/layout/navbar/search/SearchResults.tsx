import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Skeleton } from "@/components/ui/skeleton"

import { addFriend } from '@/app/actions/friends/addFriend';
import { getFriends } from '@/app/actions/friends/getFriends';
import { getPendingRequests } from '@/app/actions/friends/getPendingRequests';
import { getReceivedRequests } from '@/app/actions/friends/getReceivedRequests';
import { removeFriendRequest } from '@/app/actions/friends/removeFriendRequest';
import { UserCheck, UserPlus } from 'lucide-react';
import Link from 'next/link';






type Props = {
    results: any[];
    errorMessage: string;
    user: {
        id: string;
    }
};

const SearchResults: React.FC<Props> = ({ results, errorMessage, user }) => {
    const [friendRequests, setFriendRequests] = useState<string[]>([]);
    const [friends, setFriends] = useState<string[]>([]);
    const [receivedFriendRequests, setReceivedFriendRequests] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    // On montre les demandes d'amis en attente
    useEffect(() => {
        const fetchRequestsAndFriends = async () => {
            setLoading(true);
            try {
                const pendingRequests = await getPendingRequests(user.id); // Récupérer les demandes en attente
                const receivedRequests = await getReceivedRequests(user.id); // Récupérer les demandes reçues
                const friendIds = pendingRequests.map((req: any) => req.friend_id); // Récupérer les id des amis
                const receivedFriendIds = receivedRequests.map((req: any) => req.user_id); 
                setFriendRequests(friendIds);
                setReceivedFriendRequests(receivedFriendIds);

                const currentFriends = await getFriends(user.id);
                const currentFriendIds = currentFriends.map((friend: any) => friend.friend_id);
                setFriends(currentFriendIds);
            } catch (error) {
                toast.error('Failed to fetch friend requests');
            } finally {
                setLoading(false); 
            }
        };

        fetchRequestsAndFriends();
    }, [user.id]);

    // fonction pour ajouter un ami
    const handleAddFriend = async (friendId: string) => {
        try {
            const userId = user.id;
            await addFriend(userId, friendId);
            setFriendRequests((prev) => [...prev, friendId]);
            router.refresh();
            toast.success('Votre demande d\'ami a été envoyée');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || 'Failed to send friend request');
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    // fonction pour retirer sa demande d'ami
    const handleRemoveFriendRequest = async (friendId: string) => {
        try {
            const userId = user.id;
            await removeFriendRequest(userId, friendId);
            setFriendRequests((prev) => prev.filter((id) => id !== friendId));
            router.refresh();
            toast.success('Votre demande d\'ami a été retirée');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || 'Failed to remove friend request');
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    return (
        <div className="absolute min-w-[386px] p-3 mx-auto top-14 right-0 z-50 bg-white dark:bg-primary-black border border-lighter-grey dark:border-dark-grey rounded-lg shadow-lg">
            {results.length > 0 ? (
                results.map((result, index) => (
                    <div key={result._id.$oid} className={`flex items-center p-2 ${index !== results.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                        <Image
                            src={result.picture}
                            alt={result.pseudo}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div className="flex-grow">
                        {result._id.$oid !== user.id && (
                        <Link href={`/dashboard/user/${result._id.$oid}`}>
                            <p className="text-primary-black dark:text-white">
                                {result.pseudo} {' '}
                                
                            </p>
                        </Link>
                        )}
                        {/* if the user is himself */}
                        {result._id.$oid === user.id && (
                            <p className="text-primary-black dark:text-white">
                                {result.pseudo} {' '}
                                {result._id.$oid === user.id && <span className="text-primary-black/80 dark:text-white/80">(vous)</span>}
                            </p>)}
                        </div>
                        {result._id.$oid !== user.id && (
                            loading ? (
                                <Skeleton className="w-20 h-8 rounded-lg" />
                            ) : friends.includes(result._id.$oid) ? (
                                <UserCheck className="text-primary-green font-bold" size={24} />
                            ) : (
                                receivedFriendRequests.includes(result._id.$oid) ? (
                                    <button
                                        className='p-2 rounded-lg border border-primary-orange bg-transparent text-primary-orange text-sm'
                                        disabled
                                    >
                                        Demande reçue
                                    </button>
                                ) : (
                                    friendRequests.includes(result._id.$oid) ? (
                                        <button
                                            className='p-2 rounded-lg border border-primary-red bg-transparent text-primary-red text-sm'
                                            onClick={() => handleRemoveFriendRequest(result._id.$oid)}
                                        >
                                            Retirer la demande
                                        </button>
                                    ) : (
                                        <button
                                            className="p-2 rounded-lg bg-gradient-to-r from-primary-purple to-primary-skyblue text-white/70 hover:text-white/100"
                                            onClick={() => handleAddFriend(result._id.$oid)}
                                            disabled={friendRequests.includes(result._id.$oid)}
                                        >
                                            <UserPlus size={20} />
                                        </button>
                                    )
                                )
                            )
                        )}
                    </div>
                ))
            ) : (
                <p className="text-primary-black dark:text-white">{errorMessage}</p>
            )}
        </div>
    );
};

export default SearchResults;