import React from 'react';

const AccountSettings: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-sky-400 mb-6">Account Settings</h2>
            <form className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        placeholder="yourusername"
                    />
                </div>
                <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-300 mb-1">
                        Current Password
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-slate-300 mb-1">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    />
                </div>
                <div className="pt-4 border-t border-slate-700">
                    <h3 className="text-lg font-medium text-slate-200 mb-2">Delete Account</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                        type="button"
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
                    >
                        Delete My Account
                    </button>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
                    >
                        Update Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;