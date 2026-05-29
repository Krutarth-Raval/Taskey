import React, { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import FloatingNavbar from "../Components/UI/FloatingNavbar";
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import noUsersIllustration from '../assets/no-users.png';

// Reusable / Custom Components
import Dropdown from '../Components/UI/Dropdown';
import Pagination from '../Components/UI/Pagination';
import ConfirmationModal from '../Components/UI/ConfirmationModal';
import UserItem from '../Components/Users/UserItem';
import UserModal from '../Components/Users/UserModal';

function Users() {
    const { user } = useAuth();
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Dropdown state
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/admin/users');
                setUsersList(response.data.users || []);
            } catch (error) {
                console.error("Failed to fetch users", error);
                toast.error("Failed to fetch users");
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

    const handleDeleteUser = (userItem) => {
        setUserToDelete(userItem);
    };

    const confirmDeleteUser = async () => {
        if (!userToDelete) return;
        setIsDeleting(true);
        try {
            await api.delete(`/admin/users/${userToDelete.id}`);
            setUsersList(prev => prev.filter(u => u.id !== userToDelete.id));
            setSelectedUser(null);
            setUserToDelete(null);
            toast.success("User account deleted successfully");
        } catch (error) {
            console.error("Failed to delete user", error);
            toast.error(error.response?.data?.message || "Failed to delete user");
        } finally {
            setIsDeleting(false);
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

    const filterOptions = [
        { value: 'all', label: 'All Roles' },
        { value: 'admin', label: 'Admins' },
        { value: 'user', label: 'Members' }
    ];

    return (
        <MainLayout hideFooter>
            <FloatingNavbar />

            <div className="min-h-svh bg-background text-foreground pt-28 pb-32 px-6">
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
                            <Dropdown
                                value={roleFilter}
                                options={filterOptions}
                                onChange={setRoleFilter}
                                isOpen={isFilterOpen}
                                onToggle={setIsFilterOpen}
                            />
                        </div>
                    </div>

                    {/* Users List */}
                    <div className="flex flex-col">
                        {isLoading && (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-foreground"></div>
                            </div>
                        )}

                        {!isLoading && displayedUsers.length === 0 && (
                            <div className="flex flex-col items-center justify-center text-center py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <img 
                                    src={noUsersIllustration} 
                                    alt="No users found" 
                                    className="w-64 h-64 md:w-80 md:h-80 object-contain mb-6 select-none opacity-90"
                                />
                                <h3 className="text-xl md:text-2xl font-black text-text-primary mb-2 uppercase tracking-wide">
                                    {usersList.length === 0 ? "No registered users" : "No users found"}
                                </h3>
                                <p className="text-sm md:text-base text-text-secondary max-w-sm leading-relaxed">
                                    {usersList.length === 0 
                                        ? "There are no user accounts registered in the system yet." 
                                        : `No accounts matching "${roleFilter === 'all' ? 'All Roles' : roleFilter === 'admin' ? 'Admins' : 'Members'}" were found.`}
                                </p>
                            </div>
                        )}

                        {!isLoading && displayedUsers.length > 0 &&
                            displayedUsers.map(userItem => (
                                <UserItem
                                    key={userItem.id}
                                    userItem={userItem}
                                    onClick={setSelectedUser}
                                />
                            ))
                        }
                    </div>

                    {/* Pagination Controls */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />

                    {/* User Details Modal */}
                    <UserModal
                        isOpen={!!selectedUser}
                        userItem={selectedUser}
                        onClose={() => setSelectedUser(null)}
                        onDeleteClick={handleDeleteUser}
                    />

                </div>
            </div>

            {/* Custom Premium Delete User Reassurance Modal */}
            <ConfirmationModal
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={confirmDeleteUser}
                title="Delete User?"
                message={
                    <>
                        Are you absolutely sure you want to permanently delete <strong>{userToDelete?.name || 'this user'}</strong>? All of their registered tasks will be permanently removed as well. <strong>This action cannot be undone.</strong>
                    </>
                }
                confirmText="Yes, Delete User"
                isDanger={true}
                isLoading={isDeleting}
            />
        </MainLayout>
    );
}

export default Users;
