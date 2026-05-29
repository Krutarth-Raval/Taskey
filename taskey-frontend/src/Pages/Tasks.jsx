import React, { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import FloatingNavbar from "../Components/UI/FloatingNavbar";
import { Search } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import noTasksIllustration from '../assets/no-tasks.png';

// Reusable / Custom Components
import Dropdown from '../Components/UI/Dropdown';
import Pagination from '../Components/UI/Pagination';
import ConfirmationModal from '../Components/UI/ConfirmationModal';
import TaskItem from '../Components/Tasks/TaskItem';
import TaskModal from '../Components/Tasks/TaskModal';

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortDate, setSortDate] = useState("newToOld");
    const [filterStatus, setFilterStatus] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    // Dropdown states
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Modal State
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data.tasks || []);
        } catch (error) {
            toast.error("Failed to fetch tasks");
        } finally {
            setIsLoading(false);
        }
    };

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortDate, filterStatus]);

    // Derived filtered & sorted tasks
    const filteredTasks = tasks
        .filter(task => filterStatus === "all" || task.status === filterStatus)
        .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            const dateA = new Date(a.created_at || a.date);
            const dateB = new Date(b.created_at || b.date);
            if (sortDate === "newToOld") return dateB - dateA;
            return dateA - dateB;
        });

    const totalPages = Math.max(1, Math.ceil(filteredTasks.length / tasksPerPage));
    const displayedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

    const handleTaskClick = (task) => {
        setSelectedTask({ ...task }); // copy to modal state
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    const handleUpdateTask = async () => {
        if (isSaving) return;
        setIsSaving(true);
        try {
            await api.patch(`/tasks/${selectedTask.id}`, selectedTask);
            setTasks(prev => prev.map(t => t.id === selectedTask.id ? selectedTask : t));
            setSelectedTask(null);
            toast.success("Task updated successfully");
        } catch (error) {
            toast.error("Failed to update task");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteTask = (taskItem) => {
        setTaskToDelete(taskItem);
    };

    const confirmDeleteTask = async () => {
        if (!taskToDelete) return;
        setIsDeleting(true);
        try {
            await api.delete(`/tasks/${taskToDelete.id}`);
            setTasks(prev => prev.filter(t => t.id !== taskToDelete.id));
            setTaskToDelete(null);
            setSelectedTask(null);
            toast.success("Task deleted successfully");
        } catch (error) {
            toast.error("Failed to delete task");
        } finally {
            setIsDeleting(false);
        }
    };

    const sortOptions = [
        { value: 'newToOld', label: 'NEWEST FIRST' },
        { value: 'oldToNew', label: 'OLDEST FIRST' }
    ];

    const filterOptions = [
        { value: 'all', label: 'All Tasks' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' }
    ];

    return (
        <MainLayout hideFooter>
            <FloatingNavbar />

            <div className="min-h-svh bg-background text-foreground pt-28 pb-32 px-6">
                <div className="max-w-4xl mx-auto flex flex-col gap-10">

                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row items-center gap-6 pb-12 border-b-2 border-border">
                        {/* Search Bar */}
                        <div className="flex-1 w-full relative">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-2 border-border py-3 md:py-4 pl-12 pr-4 md:pl-14 md:pr-6 rounded-2xl text-lg md:text-xl font-bold focus:border-foreground transition-colors outline-none text-text-primary placeholder:text-border"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-text-secondary" />
                        </div>

                        {/* Sort & Filter Custom Dropdowns */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
                            <Dropdown
                                value={sortDate}
                                options={sortOptions}
                                onChange={setSortDate}
                                isOpen={isSortOpen}
                                onToggle={(open) => {
                                    setIsSortOpen(open);
                                    if (open) setIsFilterOpen(false);
                                }}
                            />
                            <Dropdown
                                value={filterStatus}
                                options={filterOptions}
                                onChange={setFilterStatus}
                                isOpen={isFilterOpen}
                                onToggle={(open) => {
                                    setIsFilterOpen(open);
                                    if (open) setIsSortOpen(false);
                                }}
                            />
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="flex flex-col">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-foreground"></div>
                            </div>
                        ) : displayedTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <img 
                                    src={noTasksIllustration} 
                                    alt="No tasks found" 
                                    className="w-64 h-64 md:w-80 md:h-80 object-contain mb-6 select-none opacity-90"
                                />
                                <h3 className="text-xl md:text-2xl font-black text-text-primary mb-2 uppercase tracking-wide">
                                    {tasks.length === 0 ? "Start your journey" : "No results found"}
                                </h3>
                                <p className="text-sm md:text-base text-text-secondary max-w-sm leading-relaxed">
                                    {tasks.length === 0 
                                        ? "You don't have any tasks yet. Create a new task to get started and stay productive!" 
                                        : "We couldn't find any tasks matching your filters. Try adjusting your search or filters."}
                                </p>
                            </div>
                        ) : (
                            displayedTasks.map(task => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onClick={handleTaskClick}
                                    onDeleteClick={handleDeleteTask}
                                />
                            ))
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />

                </div>
            </div>

            {/* Task Update Modal */}
            <TaskModal
                isOpen={!!selectedTask}
                task={selectedTask}
                onClose={handleCloseModal}
                onSave={handleUpdateTask}
                onDeleteClick={(task) => handleDeleteTask(task)}
                onChange={setSelectedTask}
                isSaving={isSaving}
            />

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={!!taskToDelete}
                onClose={() => setTaskToDelete(null)}
                onConfirm={confirmDeleteTask}
                title="Delete Task?"
                message={
                    <>
                        Are you sure you want to permanently delete the task <strong>"{taskToDelete?.title}"</strong>? <strong>This action cannot be undone.</strong>
                    </>
                }
                confirmText="Yes, Delete Task"
                isDanger={true}
                isLoading={isDeleting}
            />
        </MainLayout>
    );
}

export default Tasks;
