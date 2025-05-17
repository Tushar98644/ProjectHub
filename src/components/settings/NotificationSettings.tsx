import React, { useState } from 'react';

const ToggleSwitch: React.FC<{ label: string; enabled: boolean; onChange: (enabled: boolean) => void }> = ({ label, enabled, onChange }) => {
    return (
        <div className="flex items-center justify-between py-3">
            <span className="text-slate-300">{label}</span>
            <button
                onClick={() => onChange(!enabled)}
                className={`
          relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800
          ${enabled ? 'bg-sky-600' : 'bg-slate-600'}
        `}
            >
                <span
                    className={`
            inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
                />
            </button>
        </div>
    );
};


const NotificationSettings: React.FC = () => {
    const [emailNotifications, setEmailNotifications] = useState({
        newFollowers: true,
        postLikes: true,
        comments: false,
        mentions: true,
        productUpdates: true,
        newsletters: false,
    });

    const handleToggle = (key: keyof typeof emailNotifications) => {
        setEmailNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-sky-400 mb-6">Notification Settings</h2>
            <div className="space-y-4 divide-y divide-slate-700">
                <div>
                    <h3 className="text-lg font-medium text-slate-200 mt-2 mb-1">Email Notifications</h3>
                    <p className="text-sm text-slate-400 mb-3">Choose what you want to be notified about via email.</p>
                    <ToggleSwitch label="New Followers" enabled={emailNotifications.newFollowers} onChange={() => handleToggle('newFollowers')} />
                    <ToggleSwitch label="Post Likes" enabled={emailNotifications.postLikes} onChange={() => handleToggle('postLikes')} />
                    <ToggleSwitch label="Comments on your posts" enabled={emailNotifications.comments} onChange={() => handleToggle('comments')} />
                    <ToggleSwitch label="Mentions" enabled={emailNotifications.mentions} onChange={() => handleToggle('mentions')} />
                </div>
                <div className="pt-4">
                    <h3 className="text-lg font-medium text-slate-200 mt-2 mb-1">System Notifications</h3>
                    <p className="text-sm text-slate-400 mb-3">Updates about our products and services.</p>
                    <ToggleSwitch label="Product Updates & Announcements" enabled={emailNotifications.productUpdates} onChange={() => handleToggle('productUpdates')} />
                    <ToggleSwitch label="Newsletters" enabled={emailNotifications.newsletters} onChange={() => handleToggle('newsletters')} />
                </div>
            </div>
            <div className="flex justify-end mt-8">
                <button
                    type="button"
                    className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
                >
                    Save Preferences
                </button>
            </div>
        </div>
    );
};

export default NotificationSettings;