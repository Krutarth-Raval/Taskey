import React, { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import FloatingNavbar from "../Components/UI/FloatingNavbar";
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function AdminDashboard() {
    const { user } = useAuth();
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/users');
                setUsersList(response.data.users || []);
            } catch (error) {
                toast.error("Failed to load dashboard metrics");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Statistics calculations
    const totalRegularUsers = usersList.filter(u => u.role !== 'admin').length;
    const totalAdmins = usersList.filter(u => u.role === 'admin').length;
    const overallTotal = usersList.length;

    return (
        <MainLayout hideFooter>
            <FloatingNavbar />

            <div className="h-svh bg-background text-foreground px-6 flex flex-col items-center justify-center pt-0 md:pt-16">
                <div className="w-full max-w-4xl mx-auto flex flex-col gap-10">

                    {/* Greeting & Quick Stats */}
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-foreground"></div>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-8 md:gap-10 animate-fade-in">
                            <div className="flex flex-col gap-2">
                                <span className="flex items-center gap-2 px-3.5 py-1 bg-foreground/10 text-foreground font-bold text-[10px] tracking-widest uppercase rounded-full w-fit mb-2">
                                    <Shield className="w-3.5 h-3.5" /> Admin Portal
                                </span>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary tracking-tight leading-tight">
                                    {greeting},<br /> <span className="text-foreground">{user?.name || "Admin"}</span>.
                                </h2>
                            </div>

                            {/* Inline Metrics Counters */}
                            <div className="flex flex-wrap gap-8 md:gap-16 mt-4">
                                <div className="flex flex-col">
                                    <span className="text-3xl md:text-5xl font-black">{totalRegularUsers}</span>
                                    <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">Users</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-3xl md:text-5xl font-black text-foreground">{totalAdmins}</span>
                                    <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">Admins</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-3xl md:text-5xl font-black text-foreground">{overallTotal}</span>
                                    <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">Total</span>
                                </div>
                            </div>

                            {/* Action Redirect Card */}
                            <Link
                                to="/users"
                                className="flex items-center gap-3 mt-10 md:mt-16 text-foreground font-bold text-xl md:text-2xl hover:opacity-70 transition-opacity group w-fit"
                            >
                                <div className="p-3 bg-foreground text-background rounded-full group-hover:translate-x-2 transition-transform duration-300">
                                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                View Users Directory
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

export default AdminDashboard;
