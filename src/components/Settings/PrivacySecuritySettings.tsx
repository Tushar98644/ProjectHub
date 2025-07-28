import React, { useState } from "react";

const ToggleSwitch: React.FC<{
    label: string;
    description?: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}> = ({ label, description, enabled, onChange }) => {
    return (
        <div className="flex items-center justify-between py-4 border-b border-slate-700 last:border-b-0">
            <div>
                <span className="text-slate-200 font-medium">{label}</span>
                {description && (
                    <p className="text-sm text-slate-400">{description}</p>
                )}
            </div>
            <button
                onClick={() => onChange(!enabled)}
                className={`
          relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800
          ${enabled ? "bg-sky-600" : "bg-slate-600"}
        `}
            >
                <span
                    className={`
            inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out
            ${enabled ? "translate-x-6" : "translate-x-1"}
          `}
                />
            </button>
        </div>
    );
};

const PrivacySecuritySettings: React.FC = () => {
    const [settings, setSettings] = useState({
        twoFactorAuth: false,
        profileVisibility: true, // true for public, false for private
        dataSharing: true,
        activityLogging: false,
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-sky-400 mb-6">
                Privacy & Security
            </h2>
            <div className="space-y-2">
                <ToggleSwitch
                    label="Two-Factor Authentication (2FA)"
                    description="Add an extra layer of security to your account."
                    enabled={settings.twoFactorAuth}
                    onChange={() => handleToggle("twoFactorAuth")}
                />
                <ToggleSwitch
                    label="Public Profile Visibility"
                    description="Allow anyone to view your profile information."
                    enabled={settings.profileVisibility}
                    onChange={() => handleToggle("profileVisibility")}
                />
                <ToggleSwitch
                    label="Data Sharing with Third Parties"
                    description="Allow us to share anonymized data to improve our services."
                    enabled={settings.dataSharing}
                    onChange={() => handleToggle("dataSharing")}
                />
                <ToggleSwitch
                    label="Activity Logging"
                    description="Keep a log of your account activity for security reviews."
                    enabled={settings.activityLogging}
                    onChange={() => handleToggle("activityLogging")}
                />
            </div>

            <div className="mt-8 p-6 bg-slate-700/50 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-100 mb-3">
                    Manage Connected Devices
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                    Review and revoke access for devices that have logged into
                    your account.
                </p>
                {/* Placeholder for device list */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-600/70 rounded-md">
                        <div>
                            <p className="font-medium text-slate-200">
                                Chrome on Windows 10
                            </p>
                            <p className="text-xs text-slate-400">
                                Last active: 2 hours ago - New York, USA
                            </p>
                        </div>
                        <button className="text-xs text-red-400 hover:text-red-300 font-semibold">
                            Revoke
                        </button>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-600/70 rounded-md">
                        <div>
                            <p className="font-medium text-slate-200">
                                Safari on iPhone 15 Pro
                            </p>
                            <p className="text-xs text-slate-400">
                                Last active: 1 day ago - London, UK
                            </p>
                        </div>
                        <button className="text-xs text-red-400 hover:text-red-300 font-semibold">
                            Revoke
                        </button>
                    </div>
                </div>
                <button
                    type="button"
                    className="mt-6 w-full sm:w-auto px-6 py-2 border border-sky-600 text-sky-400 hover:bg-sky-600 hover:text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
                >
                    View All Activity Logs
                </button>
            </div>

            <div className="flex justify-end mt-8">
                <button
                    type="button"
                    className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
                >
                    Save Security Settings
                </button>
            </div>
        </div>
    );
};

export default PrivacySecuritySettings;
