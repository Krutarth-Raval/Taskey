import React, { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import FloatingNavbar from "../Components/UI/FloatingNavbar";
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Search, ChevronDown, ChevronLeft, ChevronRight, Calendar, Shield, Users as UsersIcon, X, Trash2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

function Users() {
    const { user } = useAuth();
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Dropdown states
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/users');
                setUsersList(response.data.users || []);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, roleFilter]);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to permanently delete this user account? All of their tasks will be permanently removed as well.")) {
            return;
        }
        try {
            await api.delete(`/admin/users/${userId}`);
            setUsersList(prev => prev.filter(u => u.id !== userId));
            setSelectedUser(null);
            toast.success("User account deleted successfully");
        } catch (error) {
            console.error("Failed to delete user", error);
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    };

    // Filtering & Default Sorting logic (Newest First)
    const filteredUsers = usersList
        .filter(u => {
            const nameMatch = (u.name || '').toLowerCase().includes(searchQuery.toLowerCase());
            const emailMatch = (u.email || '').toLowerCase().includes(searchQuery.toLowerCase());
            const roleMatch = roleFilter === 'all' ? true : u.role === roleFilter;
            return (nameMatch || emailMatch) && roleMatch;
        })
        .sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return dateB - dateA;
        });

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));
    const displayedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    return (
        <MainLayout hideFooter>
            <FloatingNavbar />

            <div className="min-h-screen bg-background text-foreground pt-28 pb-32 px-6">
                <div className="max-w-4xl mx-auto flex flex-col gap-10">

                    {/* Header Search Controls */}
                    <div className="flex flex-col md:flex-row items-center gap-6 pb-12 border-b-2 border-border">
                        {/* Search Bar */}
                        <div className="flex-1 w-full relative">
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-2 border-border py-3 md:py-4 pl-12 pr-4 md:pl-14 md:pr-6 rounded-2xl text-lg md:text-xl font-bold focus:border-foreground transition-colors outline-none text-text-primary placeholder:text-border"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-text-secondary" />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
                            {/* Filter Role Dropdown */}
                            <div className="relative w-full sm:w-48">
                                <button
                                    onClick={() => { setIsFilterOpen(!isFilterOpen); }}
                                    className="w-full flex items-center justify-between px-5 md:px-6 py-3 md:py-4 bg-transparent border-2 border-border rounded-xl text-sm md:text-base font-bold text-text-primary hover:border-foreground focus:border-foreground transition-colors"
                                >
                                    <span className="uppercase tracking-widest">
                                        {roleFilter === 'all' ? 'All Roles' : roleFilter + 's'}
                                    </span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isFilterOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-border rounded-xl shadow-2xl flex flex-col p-2 gap-1 z-50 animate-fade-in">
                                        <button
                                            onClick={() => { setRoleFilter("all"); setIsFilterOpen(false); }}
                                            className={`px-4 py-3 rounded-lg text-sm md:text-base font-bold text-left uppercase tracking-widest transition-colors ${roleFilter === 'all' ? 'bg-foreground text-background' : 'hover:bg-border text-text-secondary hover:text-foreground'}`}
                                        >
                                            All Roles
                                        </button>
                                        <button
                                            onClick={() => { setRoleFilter("admin"); setIsFilterOpen(false); }}
                                            className={`px-4 py-3 rounded-lg text-sm md:text-base font-bold text-left uppercase tracking-widest transition-colors ${roleFilter === 'admin' ? 'bg-foreground text-background' : 'hover:bg-border text-text-secondary hover:text-foreground'}`}
                                        >
                                            Admins
                                        </button>
                                        <button
                                            onClick={() => { setRoleFilter("user"); setIsFilterOpen(false); }}
                                            className={`px-4 py-3 rounded-lg text-sm md:text-base font-bold text-left uppercase tracking-widest transition-colors ${roleFilter === 'user' ? 'bg-foreground text-background' : 'hover:bg-border text-text-secondary hover:text-foreground'}`}
                                        >
                                            Members
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Users List with same styling as Tasks list */}
                    <div className="flex flex-col">
                        {isLoading && (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-foreground"></div>
                            </div>
                        )}

                        {!isLoading && displayedUsers.length === 0 && (
                            <p className="text-center text-text-secondary text-xl font-bold mt-10">No users found.</p>
                        )}

                        {!isLoading && displayedUsers.length > 0 &&
                            displayedUsers.map(userItem => {
                                const completionRate = userItem.tasks_count > 0
                                    ? Math.round((userItem.completed_tasks_count / userItem.tasks_count) * 100)
                                    : 0;

                                return (
                                    <div
                                        key={userItem.id}
                                        onClick={() => setSelectedUser(userItem)}
                                        className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 md:py-8 border-b-2 border-border/30 hover:pl-4 md:hover:pl-6 transition-all duration-300 gap-4 sm:gap-0 cursor-pointer"
                                    >
                                        {/* Left Side: Name, Badge, Email */}
                                        <div className="flex flex-col gap-2 pr-2 w-full overflow-hidden">
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-base sm:text-lg md:text-3xl font-black truncate text-text-primary">
                                                    {userItem.name || "N/A"}
                                                </h4>
                                                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border shrink-0 ${userItem.role === 'admin' ? 'bg-foreground text-background border-foreground' : 'text-text-secondary border-border'
                                                    }`}>
                                                    {userItem.role === 'admin' ? 'Admin' : 'Member'}
                                                </span>
                                            </div>
                                            <p className="text-xs md:text-base font-medium text-text-secondary">
                                                {userItem.email}
                                            </p>
                                            <span className="text-[10px] md:text-sm font-bold text-text-secondary uppercase tracking-widest mt-1">
                                                Registered: {userItem.created_at ? new Date(userItem.created_at).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>

                                        {/* Right Side: Tasks Progress Bar & Numbers (Only for Members) */}
                                        {userItem.role !== 'admin' ? (
                                            <div className="flex flex-col gap-1.5 w-full sm:w-60 shrink-0">
                                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-text-secondary">
                                                    <span>{userItem.completed_tasks_count} / {userItem.tasks_count} Tasks</span>
                                                    <span>{completionRate}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-foreground/10 border border-border/40 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${completionRate === 100 ? 'bg-green-500' : 'bg-foreground'}`}
                                                        style={{ width: `${completionRate}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-full sm:w-60 shrink-0 flex sm:justify-end">
                                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary opacity-60">No Tasks Allowed</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        }
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 md:gap-6 mt-12">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className={`p-2.5 md:p-3 rounded-full border-2 border-border transition-colors ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-foreground text-text-primary'}`}
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                            <span className="text-xs md:text-sm font-black uppercase tracking-widest text-text-secondary">
                                PAGE {currentPage} OF {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className={`p-2.5 md:p-3 rounded-full border-2 border-border transition-colors ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:border-foreground text-text-primary'}`}
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            </button>
                        </div>
                    )}
                    {/* User Details Modal */}
                    {selectedUser && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/90 backdrop-blur-sm transition-opacity">
                            <div className="bg-background border-2 border-border rounded-[2rem] w-full max-w-2xl p-6 md:p-12 flex flex-col gap-6 md:gap-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-background border-2 border-border rounded-full hover:border-foreground transition-colors"
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6" />
                                </button>

                                {/* Modal Header */}
                                <div className="flex flex-col gap-2.5 mt-2">
                                    <span className="text-[10px] font-black tracking-widest uppercase text-text-secondary">
                                        User Profile Details
                                    </span>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="font-heading text-2xl md:text-4xl font-black uppercase tracking-tight text-text-primary break-words max-w-[85%]">
                                            {selectedUser.name || "N/A"}
                                        </h2>
                                        <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border shrink-0 ${selectedUser.role === 'admin' ? 'bg-foreground text-background border-foreground' : 'text-text-secondary border-border'
                                            }`}>
                                            {selectedUser.role === 'admin' ? 'Admin' : 'Member'}
                                        </span>
                                    </div>
                                </div>

                                {/* Details Panel */}
                                <div className="flex flex-col gap-4 border-y border-border/30 py-6">
                                    {/* Email */}
                                    <div className="flex justify-between items-center py-2.5">
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary">Email Address</span>
                                        <span className="text-sm md:text-lg font-black text-text-primary break-all ml-4">{selectedUser.email}</span>
                                    </div>

                                    {/* Registration Date */}
                                    <div className="flex justify-between items-center py-2.5">
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary">Registration Date</span>
                                        <span className="text-sm md:text-lg font-black text-text-primary flex items-center gap-2">

                                            {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                        </span>
                                    </div>

                                    {/* Role */}
                                    <div className="flex justify-between items-center py-2.5">
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary">Access Permission</span>
                                        <span className="text-sm md:text-lg font-black text-text-primary flex items-center gap-2">

                                            {selectedUser.role === 'admin' ? 'Administrator' : 'Standard Member'}
                                        </span>
                                    </div>
                                </div>

                                {/* Member Specific Statistics */}
                                {selectedUser.role !== 'admin' && (
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-text-primary mb-1">
                                            Task Performance
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-foreground/[0.02] border border-border/40 rounded-2xl flex flex-col gap-1">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total Created</span>
                                                <span className="text-xl md:text-2xl font-black text-text-primary">{selectedUser.tasks_count || 0}</span>
                                            </div>
                                            <div className="p-4 bg-foreground/[0.02] border border-border/40 rounded-2xl flex flex-col gap-1">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Completed</span>
                                                <span className="text-xl md:text-2xl font-black text-green-500">{selectedUser.completed_tasks_count || 0}</span>
                                            </div>
                                        </div>

                                        {/* Large Progress Bar */}
                                        <div className="flex flex-col gap-2 mt-2">
                                            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-text-secondary">
                                                <span>Overall Progress</span>
                                                <span>
                                                    {selectedUser.tasks_count > 0
                                                        ? Math.round((selectedUser.completed_tasks_count / selectedUser.tasks_count) * 100)
                                                        : 0}%
                                                </span>
                                            </div>
                                            <div className="w-full h-3 bg-foreground/10 border border-border/40 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${(selectedUser.completed_tasks_count / selectedUser.tasks_count) === 1 ? 'bg-green-500' : 'bg-foreground'
                                                        }`}
                                                    style={{
                                                        width: `${selectedUser.tasks_count > 0
                                                                ? Math.round((selectedUser.completed_tasks_count / selectedUser.tasks_count) * 100)
                                                                : 0
                                                            }%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex justify-end gap-4 mt-4">
                                    {selectedUser.role === 'admin' ? (
                                        <div className="w-full py-4 px-6 border border-border bg-foreground/[0.02] rounded-2xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary">
                                            <Lock className="w-4 h-4 text-text-secondary" />
                                            Admin profiles cannot be deleted
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleDeleteUser(selectedUser.id)}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-red-500/20 hover:border-red-500 bg-transparent text-red-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-[0.98]"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete Member Account
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </MainLayout>
    );
}

export default Users;
