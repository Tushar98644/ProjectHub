/* eslint-disable @next/next/no-img-element */
'use client'
import { DashLayout } from "@/components/Layout/Layout";
import { useSession } from "next-auth/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaEnvelope, FaUserCircle, FaBriefcase, FaLink, FaGithub, FaLinkedin, FaTwitter, FaEdit } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const initialProfileData = {
    bio: "Passionate full-stack developer with a love for creating innovative solutions and contributing to open-source projects. Always eager to learn new technologies.",
    role: "Software Engineer",
    location: "Guwahati, Assam, India",
    website: "https://myportfolio.example.com",
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username",
    skills: ["React", "Node.js", "TypeScript", "Next.js", "GraphQL", "Docker"],
    interests: ["AI/ML", "Web3", "DevOps", "UI/UX Design"],
    projectsContributed: 12,
    followers: 2500,
    following: 320,
};

type ProfileData = typeof initialProfileData;

const Profile = () => {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);

    const userImage = session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name?.replace(' ', '+') || 'User'}&background=0D8ABC&color=fff&size=160`;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleSkillsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileData(prev => ({ ...prev, skills: e.target.value.split(',').map(skill => skill.trim()) }));
    };

    const handleInterestsChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProfileData(prev => ({ ...prev, interests: e.target.value.split(',').map(interest => interest.trim()) }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Profile data saved:", profileData);
        setIsEditing(false);
        alert("Profile updated successfully! (Check console for data)");
    };


    const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
        <div className="text-center p-4 bg-slate-700/50 rounded-lg shadow">
            <p className="text-2xl font-semibold text-sky-400">{value}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
        </div>
    );

    const InfoItem: React.FC<{ icon: React.ReactNode; text?: string; href?: string; label?: string }> = ({ icon, text, href, label }) => {
        if (!text && !href) return null;
        return (
            <div className="flex items-center text-slate-300 mb-2">
                <span className="mr-3 text-sky-400 text-lg">{icon}</span>
                {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-sky-300 transition-colors break-all">
                        {label || text}
                    </a>
                ) : (
                    <span className="break-all">{text}</span>
                )}
            </div>
        );
    };

    const TagList: React.FC<{ items: string[]; title: string }> = ({ items, title }) => (
        <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {items.map(item => (
                    <span key={item} className="px-3 py-1 text-xs bg-sky-500/30 text-sky-300 rounded-full">
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <DashLayout>
            <div className="container mx-auto px-4 py-8 text-slate-200 max-w-4xl opacity-70">
                {/* Profile Header */}
                <div className="bg-slate-800 shadow-xl rounded-lg p-6 md:p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                        <div className="relative mb-6 md:mb-0 md:mr-8">
                            <img
                                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-slate-700 shadow-lg"
                                src={userImage}
                                alt={session?.user?.name || "User Avatar"}
                            />                            
                        
                            {/* <span className="absolute bottom-2 right-3 block h-5 w-5 rounded-full bg-green-500 border-2 border-slate-800 ring-1 ring-green-400"></span> */}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl lg:text-4xl font-bold text-sky-400 mb-1">{session?.user?.name || "User Name"}</h1>
                            <p className="text-slate-400 mb-2 text-lg">{profileData.role}</p>
                            <InfoItem icon={<MdLocationOn />} text={profileData.location} />
                            <InfoItem icon={<FaEnvelope />} text={session?.user?.email ?? undefined} />

                            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                                {profileData.website && <InfoItem icon={<FaLink />} href={profileData.website} label="Website" />}
                                {profileData.github && <InfoItem icon={<FaGithub />} href={profileData.github} label="GitHub" />}
                                {profileData.linkedin && <InfoItem icon={<FaLinkedin />} href={profileData.linkedin} label="LinkedIn" />}
                                {profileData.twitter && <InfoItem icon={<FaTwitter />} href={profileData.twitter} label="Twitter" />}
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
                            >
                                <FaEdit className="mr-2" /> {isEditing ? "Cancel" : "Edit Profile"}
                            </button>
                        </div>
                    </div>

                    {!isEditing && profileData.bio && (
                        <div className="mt-6 pt-6 border-t border-slate-700">
                            <h3 className="text-lg font-semibold text-slate-100 mb-2">About Me</h3>
                            <p className="text-slate-300 leading-relaxed whitespace-pre-line">{profileData.bio}</p>
                        </div>
                    )}
                </div>

                {/* Edit Profile Form */}
                {isEditing && (
                    <div className="bg-slate-800 shadow-xl rounded-lg p-6 md:p-8 mb-8">
                        <h2 className="text-2xl font-semibold text-sky-400 mb-6">Edit Your Profile</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">Your Role / Title</label>
                                <input type="text" name="role" id="role" value={profileData.role} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:ring-sky-500 focus:border-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1">Location</label>
                                <input type="text" name="location" id="location" value={profileData.location} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:ring-sky-500 focus:border-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-slate-300 mb-1">Bio</label>
                                <textarea name="bio" id="bio" rows={4} value={profileData.bio} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:ring-sky-500 focus:border-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-slate-300 mb-1">Website/Portfolio URL</label>
                                <input type="url" name="website" id="website" value={profileData.website} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:ring-sky-500 focus:border-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="github" className="block text-sm font-medium text-slate-300 mb-1">GitHub Profile URL</label>
                                <input type="url" name="github" id="github" value={profileData.github} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:ring-sky-500 focus:border-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="linkedin" className="block text-sm font-medium text-slate-300 mb-1">LinkedIn Profile URL</label>
                                <input type="url" name="linkedin" id="linkedin" value={profileData.linkedin} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:ring-sky-500 focus:border-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="twitter" className="block text-sm font-medium text-slate-300 mb-1">Twitter Profile URL</label>
                                <input type="url" name="twitter" id="twitter" value={profileData.twitter} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:ring-sky-500 focus:border-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="skills" className="block text-sm font-medium text-slate-300 mb-1">Skills (comma-separated)</label>
                                <input type="text" name="skills" id="skills" value={profileData.skills.join(', ')} onChange={handleSkillsChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:ring-sky-500 focus:border-sky-500" />
                            </div>
                            <div>
                                <label htmlFor="interests" className="block text-sm font-medium text-slate-300 mb-1">Interests (comma-separated)</label>
                                <input type="text" name="interests" id="interests" value={profileData.interests.join(', ')} onChange={handleInterestsChange} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-slate-100 focus:ring-sky-500 focus:border-sky-500" />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Stats & Activity Section */}
                {!isEditing && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        <StatCard label="Projects Contributed" value={profileData.projectsContributed} />
                        <StatCard label="Followers" value={profileData.followers} />
                        <StatCard label="Following" value={profileData.following} />
                    </div>
                )}

                {!isEditing && (
                    <div className="bg-slate-800 shadow-xl rounded-lg p-6 md:p-8">
                        <TagList items={profileData.skills} title="Skills" />
                        <TagList items={profileData.interests} title="Interests" />

                        {/* Placeholder for recent activity or projects */}
                        <div className="mt-6 pt-6 border-t border-slate-700">
                            <h3 className="text-lg font-semibold text-slate-100 mb-3">Recent Activity</h3>
                            <ul className="space-y-3">
                                <li className="text-sm text-slate-400">Contributed to <a href="#" className="text-sky-400 hover:underline">Project Alpha</a>.</li>
                                <li className="text-sm text-slate-400">Started following <a href="#" className="text-sky-400 hover:underline">Jane Doe</a>.</li>
                                <li className="text-sm text-slate-400">Posted a new discussion in <a href="#" className="text-sky-400 hover:underline">Tech Talk</a>.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </DashLayout>
    );
};

export default Profile;