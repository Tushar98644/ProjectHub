/* eslint-disable @next/next/no-img-element */
import React from 'react';

export interface User {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
    bio: string;
    isOnline?: boolean;
}

interface UserCardProps {
    user: User;
    onViewProfile: (userId: string) => void;
    onConnect: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onViewProfile, onConnect }) => {
    return (
        <div className="bg-slate-800 shadow-xl rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-sky-500/30">
            <div className="flex flex-col items-center sm:flex-row sm:items-start text-center sm:text-left">
                <div className="relative mb-4 sm:mb-0 sm:mr-6">
                    <img
                        className="w-24 h-24 rounded-full object-cover border-4 border-slate-700 shadow-md"
                        src={user.avatarUrl || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=0D8ABC&color=fff&size=128`}
                        alt={`${user.name}'s avatar`}
                    />
                    {user.isOnline && (
                        <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 border-2 border-slate-800 ring-1 ring-green-400"></span>
                    )}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-sky-400">{user.name}</h3>
                    <p className="text-sm text-slate-400">@{user.username}</p>
                    <p className="text-slate-300 mt-2 text-sm leading-relaxed">
                        {user.bio.length > 100 ? `${user.bio.substring(0, 97)}...` : user.bio}
                    </p>
                </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                    onClick={() => onViewProfile(user.id)}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-sky-400 border border-sky-500 rounded-md hover:bg-sky-500 hover:text-slate-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    View Profile
                </button>
                <button
                    onClick={() => onConnect(user.id)}
                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    Connect
                </button>
            </div>
        </div>
    );
};

export default UserCard;