'use client'
import React, { useState } from 'react';
import ProfileSettings from '@/components/settings/ProfileSettings';
import AccountSettings from '@/components/settings/AccountSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import PrivacySecuritySettings from '@/components/settings/PrivacySecuritySettings';
import { DashLayout } from '@/components/Layout/Layout';

type TabId = 'profile' | 'account' | 'notifications' | 'privacy';

interface Tab {
    id: TabId;
    label: string;
    component: React.FC;
}

const tabs: Tab[] = [
    { id: 'profile', label: 'Profile', component: ProfileSettings },
    { id: 'account', label: 'Account', component: AccountSettings },
    { id: 'notifications', label: 'Notifications', component: NotificationSettings },
    { id: 'privacy', label: 'Privacy & Security', component: PrivacySecuritySettings },
];

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('profile');

    const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProfileSettings;

    return (
        <DashLayout>
            <div className="min-h-max mt-[-2vw] min-w-full relative rounded-md p-4 sm:p-6 lg:p-10 draggable opacity-70">
                <div className="mx-auto">
                    <header className="mb-8">
                        <h1 className="text-4xl font-bold tracking-tight text-sky-400">Settings</h1>
                        <p className="text-slate-400 mt-2">Manage your account settings and preferences.</p>
                    </header>

                    <div className="bg-slate-800 w-full shadow-2xl rounded-lg overflow-hidden">
                        <nav className="flex border-b border-slate-700">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                  px-4 sm:px-6 py-4 font-medium text-sm sm:text-base
                  focus:outline-none transition-colors duration-200 ease-in-out
                  ${activeTab === tab.id
                                            ? 'border-b-2 border-sky-500 text-sky-400 bg-slate-700/50'
                                            : 'text-slate-400 hover:text-sky-400 hover:bg-slate-700/30'
                                        }
                `}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="p-6 sm:p-8">
                            <ActiveComponent />
                        </div>
                    </div>
                </div>
            </div>
        </DashLayout>
    );
};

export default SettingsPage;

