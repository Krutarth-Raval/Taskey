import React, { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import FloatingNavbar from "../Components/UI/FloatingNavbar";
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(() => {
        try {
            const cached = localStorage.getItem('user_stats');
            return cached ? JSON.parse(cached) : { total: 0, pending: 0, completed: 0 };
        } catch {
            return { total: 0, pending: 0, completed: 0 };
        }
    });
    const [adminStats, setAdminStats] = useState(() => {
        try {
            const cached = localStorage.getItem('admin_stats');
            return cached ? JSON.parse(cached) : { total: 0, users: 0, admins: 0 };
        } catch {
            return { total: 0, users: 0, admins: 0 };
        }
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') !== 'light';
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                if (user?.role === 'admin') {
                    const response = await api.get('/admin/users');
                    const users = response.data.users || [];
                    const newAdminStats = {
                        total: users.length,
                        users: users.filter(u => u.role !== 'admin').length,
                        admins: users.filter(u => u.role === 'admin').length
                    };
                    setAdminStats(newAdminStats);
                    localStorage.setItem('admin_stats', JSON.stringify(newAdminStats));
                } else {
                    const response = await api.get('/tasks');
                    const tasks = response.data.tasks || [];
                    const newStats = {
                        total: tasks.length,
                        pending: tasks.filter(t => t.status === 'pending').length,
                        completed: tasks.filter(t => t.status === 'completed').length
                    };
                    setStats(newStats);
                    localStorage.setItem('user_stats', JSON.stringify(newStats));
                }
            } catch (error) {
                console.error("Failed to fetch stats", error);
            }
        };
        fetchStats();
    }, [user]);

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            await api.delete('/delete-account');
            toast.success("Account deleted successfully");
            navigate('/');
            setTimeout(async () => {
                await logout();
            }, 100);
        } catch (error) {
            toast.error("Failed to delete account");
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const handleLogout = async () => {
        setTimeout(async () => {
            await logout();
        }, 100);
        navigate('/');
    };

    const userData = {
        name: user?.name || "User Name",
        email: user?.email || "user@example.com",
        initial: user?.name ? user.name.charAt(0).toUpperCase() : "U",
        stats: stats
    };

    return (
        <MainLayout hideFooter>
            <FloatingNavbar />

            <div className="md:h-svh min:h-svh bg-background text-foreground pt-28 pb-20 px-6 mb-8 md:mb-0">
                <div className="max-w-3xl mx-auto flex flex-col gap-10 ">

                    {/* 1. Profile Overview Box */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 pb-12 border-b-2 border-border">
                        {/* Profile Picture */}
                        <div className="w-28 h-28 shrink-0 rounded-full bg-foreground flex items-center justify-center text-background text-5xl font-bold shadow-lg">
                            {userData.initial}
                        </div>

                        {/* Details */}
                        <div className="flex flex-col items-center md:items-start w-full">
                            <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-3">
                                <h2 className="text-3xl font-extrabold text-text-primary">{userData.name}</h2>
                            </div>

                            {/* Stats - Inline Instagram Style */}
                            <div className="flex w-full max-w-sm md:max-w-none justify-between md:justify-start mt-2 md:gap-8">
                                {user?.role === 'admin' ? (
                                    <>
                                        <div className="flex flex-col items-center md:items-start flex-1 md:flex-none">
                                            <span className="text-xl font-bold text-text-primary">{adminStats.total}</span>
                                            <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">TOTAL</span>
                                        </div>
                                        <div className="flex flex-col items-center md:items-start flex-1 md:flex-none">
                                            <span className="text-xl font-bold text-text-primary">{adminStats.users}</span>
                                            <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">USER</span>
                                        </div>
                                        <div className="flex flex-col items-center md:items-start flex-1 md:flex-none">
                                            <span className="text-xl font-bold text-text-primary">{adminStats.admins}</span>
                                            <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">ADMIN</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-col items-center md:items-start flex-1 md:flex-none">
                                            <span className="text-xl font-bold text-text-primary">{userData.stats.total}</span>
                                            <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">TOTAL</span>
                                        </div>
                                        <div className="flex flex-col items-center md:items-start flex-1 md:flex-none">
                                            <span className="text-xl font-bold text-text-primary">{userData.stats.pending}</span>
                                            <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">PENDING</span>
                                        </div>
                                        <div className="flex flex-col items-center md:items-start flex-1 md:flex-none">
                                            <span className="text-xl font-bold text-text-primary">{userData.stats.completed}</span>
                                            <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">COMPLETED</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sections Container */}
                    <div className="flex flex-col">

                        {/* Account Preference */}
                        <div className="py-8 border-b-2 border-border flex flex-col gap-6">
                            <h3 className="text-sm font-black text-text-secondary uppercase tracking-widest">Account Preference</h3>
                            <div className="flex flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-xl underline underline-offset-8">App Theme</span>
                                </div>

                                {/* Option Selector */}
                                <div className="flex bg-transparent border-2 border-border rounded-xl p-1 self-start sm:self-auto">
                                    <button
                                        onClick={() => setIsDarkMode(false)}
                                        className={`flex items-center gap-2 px-4 py-1 rounded-lg text-sm font-bold transition-all ${!isDarkMode ? 'bg-foreground text-background shadow-md' : 'text-text-secondary hover:text-foreground'}`}
                                    >
                                        Light
                                    </button>
                                    <button
                                        onClick={() => setIsDarkMode(true)}
                                        className={`flex items-center gap-2 px-4 py-1 rounded-lg text-sm font-bold transition-all ${isDarkMode ? 'bg-foreground text-background shadow-md' : 'text-text-secondary hover:text-foreground'}`}
                                    >
                                        Dark
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Account Settings */}
                        <div className="py-8 border-b-2 border-border flex flex-col gap-6">
                            <h3 className="text-sm font-black text-text-secondary uppercase tracking-widest">Account Settings</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row sm:items-center justify-between gap-2 py-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-xl underline underline-offset-8">Your Email</span>
                                    </div>
                                    <div className="flex bg-transparent border-2 border-border rounded-xl p-1 self-start sm:self-auto">
                                        <div className="flex items-center gap-2 px-4 py-1 rounded-lg text-sm font-bold">
                                            {userData.email}
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => setShowForgotModal(true)} className="flex items-center gap-4 py-3 cursor-pointer w-fit text-text-primary">
                                    <span className="font-bold text-xl underline underline-offset-8">Forgot Password</span>
                                </div>
                                <div className="flex items-center gap-4 py-3 cursor-pointer text-red-500 w-fit" onClick={handleDeleteAccount}>
                                    <span className="font-bold text-xl underline underline-offset-8">Delete Account</span>
                                </div>
                                <div className="flex items-center gap-4 py-3 cursor-pointer text-text-primary w-fit" onClick={() => setShowLogoutModal(true)}>
                                    <span className="font-bold text-xl underline underline-offset-8">Log Out</span>
                                </div>
                            </div>
                        </div>

                        {/* About Us */}
                        <div className="py-8 flex flex-col gap-6 ">
                            <h3 className="text-sm font-black text-text-secondary uppercase tracking-widest">About Us</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row sm:items-center justify-between gap-2 py-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-xl underline underline-offset-8">Follow Us</span>
                                    </div>
                                    <div className="flex bg-transparent border-2 border-border rounded-xl p-1 self-start sm:self-auto">
                                        <a href="https://x.com/_KrutarthRaval_" className="px-4 py-1 rounded-lg hover:text-background hover:bg-foreground hover:shadow-md transition-all flex items-center justify-center">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </a>
                                        <a href="https://github.com/Krutarth-Raval" className="px-4 py-1 rounded-lg hover:text-background hover:bg-foreground hover:shadow-md transition-all flex items-center justify-center">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                            </svg>
                                        </a>
                                        <a href="https://www.linkedin.com/in/raval-krutarth" className="px-4 py-1 rounded-lg hover:text-background hover:bg-foreground hover:shadow-md transition-all flex items-center justify-center">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <Link to="/terms" className="flex items-center gap-4 py-3 hover:opacity-70 transition-opacity cursor-pointer w-fit text-text-primary">
                                    <span className="font-bold text-xl underline underline-offset-8">Terms and Conditions</span>
                                </Link>
                                <Link to="/privacy" className="flex items-center gap-4 py-3 hover:opacity-70 transition-opacity cursor-pointer w-fit text-text-primary">
                                    <span className="font-bold text-xl underline underline-offset-8">Privacy Policy</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Custom Premium Delete Reassurance Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
                    <div className="bg-card border-2 border-border p-6 md:p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl flex flex-col gap-6 relative select-none animate-in fade-in zoom-in-95 duration-200">
                        {/* Warning Header */}
                        <div className="flex flex-col items-center text-center gap-4">

                            <div className="flex flex-col gap-1">

                                <h3 className="font-heading text-xl md:text-2xl font-black uppercase tracking-tight text-text-primary">
                                    Delete Account?
                                </h3>
                            </div>
                        </div>

                        {/* Reassurance Message */}
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed text-center">
                            Are you absolutely sure? This will permanently delete your profile, credentials, and all tasks from our databases. <strong>This action cannot be undone.</strong>
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 mt-2">
                            <button
                                onClick={confirmDeleteAccount}
                                disabled={isDeleting}
                                className="w-full py-3 rounded-xl bg-red-500 text-white font-bold text-xs md:text-sm tracking-wider uppercase hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                                {isDeleting ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                ) : "Yes, Delete Account"}
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={isDeleting}
                                className="w-full py-3 rounded-xl bg-transparent border border-border/60 hover:bg-border/20 text-text-primary font-bold text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Premium Logout Reassurance Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
                    <div className="bg-card border-2 border-border p-6 md:p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl flex flex-col gap-6 relative select-none animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-heading text-xl md:text-2xl font-black uppercase tracking-tight text-text-primary">
                                    Log Out?
                                </h3>
                            </div>
                        </div>

                        {/* Reassurance Message */}
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed text-center">
                            Are you sure you want to end your current session? You will need to sign back in to access your task dashboard.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 mt-2">
                            <button
                                onClick={handleLogout}
                                className="w-full py-3 rounded-xl bg-foreground text-background font-bold text-xs md:text-sm tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
                            >
                                Yes, Log Out
                            </button>
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="w-full py-3 rounded-xl bg-transparent border border-border/60 hover:bg-border/20 text-text-primary font-bold text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Premium Forgot Password Reassurance Modal */}
            {showForgotModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md transition-all duration-300">
                    <div className="bg-card border-2 border-border p-6 md:p-8 rounded-3xl max-w-md w-full mx-4 shadow-2xl flex flex-col gap-6 relative select-none animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-heading text-xl md:text-2xl font-black uppercase tracking-tight text-text-primary">
                                    Reset Password?
                                </h3>
                            </div>
                        </div>

                        {/* Reassurance Message */}
                        <p className="text-xs md:text-sm text-text-secondary leading-relaxed text-center">
                            You will be redirected to the forgot password page to request a secure password reset link. Do you wish to continue?
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 mt-2">
                            <button
                                onClick={() => {
                                    setShowForgotModal(false);
                                    navigate('/forgot-password');
                                }}
                                className="w-full py-3 rounded-xl bg-foreground text-background font-bold text-xs md:text-sm tracking-wider uppercase hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
                            >
                                Yes, Continue
                            </button>
                            <button
                                onClick={() => setShowForgotModal(false)}
                                className="w-full py-3 rounded-xl bg-transparent border border-border/60 hover:bg-border/20 text-text-primary font-bold text-xs md:text-sm tracking-wider uppercase transition-colors duration-300 cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}

export default Profile;
