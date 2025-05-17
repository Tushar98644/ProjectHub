'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import UserCard, { User } from '@/components/Users/UserCard'; // Adjust path as needed
import { DashLayout } from '@/components/Layout/Layout';

const mockUsers: User[] = [
    { id: '1', name: 'Alice Wonderland', username: 'aliceW', avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', bio: 'Curiouser and curiouser! Exploring the digital rabbit hole.', isOnline: true },
    { id: '2', name: 'Bob The Builder', username: 'bobBuilds', avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg', bio: 'Can we fix it? Yes, we can! Passionate about creating and innovating.', isOnline: false },
    { id: '3', name: 'Charlie Brown', username: 'goodgrief', avatarUrl: 'https://randomuser.me/api/portraits/men/46.jpg', bio: 'Just a friendly guy trying to kick the football. Loves his dog.', isOnline: true },
    { id: '4', name: 'Diana Prince', username: 'wonderwoman', avatarUrl: 'https://randomuser.me/api/portraits/women/47.jpg', bio: 'Fighting for those who cannot fight for themselves. Believer in truth and justice.', isOnline: true },
    { id: '5', name: 'Edward Scissorhands', username: 'eddyCut', avatarUrl: 'https://randomuser.me/api/portraits/men/48.jpg', bio: 'A gentle soul with a unique talent. Loves topiary and ice sculptures.', isOnline: false },
    { id: '6', name: 'Fiona Gallagher', username: 'fionaG', avatarUrl: 'https://randomuser.me/api/portraits/women/49.jpg', bio: 'Resilient and resourceful. Always looking out for family.', isOnline: true },
    { id: '7', name: 'Gus Fring', username: 'chickenman', avatarUrl: 'https://randomuser.me/api/portraits/men/50.jpg', bio: 'Proprietor of Los Pollos Hermanos. Discreet and professional.', isOnline: false },
    { id: '8', name: 'Hermione Granger', username: 'brightwitch', avatarUrl: 'https://randomuser.me/api/portraits/women/51.jpg', bio: 'Insufferable know-it-all, but a loyal friend. Books and cleverness!', isOnline: true },
];


const FindUsersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        setIsLoading(true);
        const lowercasedFilter = searchTerm.toLowerCase();
        const newFilteredUsers = mockUsers.filter(user =>
            user.name.toLowerCase().includes(lowercasedFilter) ||
            user.username.toLowerCase().includes(lowercasedFilter)
        );

        setTimeout(() => {
            setFilteredUsers(newFilteredUsers);
            setIsLoading(false);
        }, 300);
    }, [searchTerm]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleViewProfile = (userId: string) => {
        console.log(`Viewing profile for user ID: ${userId}`);
        alert(`Navigate to profile of user ${userId}`);
    };

    const handleConnect = (userId: string) => {
        console.log(`Connecting with user ID: ${userId}`);
        alert(`Sending connection request to user ${userId}`);
    };

    return (
        <DashLayout>
            <div className="min-h-screen p-4 sm:p-6 lg:p-8 opacity-80">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-8 text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-sky-400">Find Users</h1>
                        <p className="text-slate-400 mt-2">Discover and connect with other users on the platform.</p>
                    </header>

                    <div className="mb-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                name="searchUsers"
                                id="searchUsers"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="block w-full pl-10 pr-3 py-3 bg-slate-700 border border-slate-600 rounded-md leading-5 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm shadow-md"
                                placeholder="Search by name or username..."
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-10">
                            <p className="text-lg text-slate-300">Loading users...</p>
                            {/* You can add a spinner here */}
                        </div>
                    ) : filteredUsers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredUsers.map(user => (
                                <UserCard
                                    key={user.id}
                                    user={user}
                                    onViewProfile={handleViewProfile}
                                    onConnect={handleConnect}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <h3 className="text-xl font-semibold text-slate-300">No Users Found</h3>
                            <p className="text-slate-400 mt-1">Try adjusting your search term or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashLayout>
    );
};

export default FindUsersPage;