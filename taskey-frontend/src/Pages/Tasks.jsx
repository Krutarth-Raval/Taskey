import React, { useState, useEffect } from 'react';
import MainLayout from "../layouts/MainLayout";
import FloatingNavbar from "../Components/UI/FloatingNavbar";
import { Search, X, CheckCircle2, Circle, ChevronLeft, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';

function Tasks() {
    // Tasks Data
    const [tasks, setTasks] = useState([]);

    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data.tasks || []);
        } catch (error) {
            toast.error("Failed to fetch tasks");
        }
    };

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
    const titleRef = React.useRef(null);

    // Dynamic title resize effect
    React.useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = 'auto';
            titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
        }
    }, [selectedTask?.title, selectedTask]);

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

    // Reset pagination when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortDate, filterStatus]);

    const handleTaskClick = (task) => {
        setSelectedTask({ ...task }); // copy to modal state
    };

    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    const handleUpdateTask = async () => {
        try {
            await api.patch(`/tasks/${selectedTask.id}`, selectedTask);
            setTasks(prev => prev.map(t => t.id === selectedTask.id ? selectedTask : t));
            setSelectedTask(null);
            toast.success("Task updated successfully");
        } catch (error) {
            toast.error("Failed to update task");
        }
    };

    const toggleModalStatus = () => {
        setSelectedTask(prev => ({
            ...prev,
            status: prev.status === "pending" ? "completed" : "pending"
        }));
    };

    return (
        <MainLayout hideFooter>
            <FloatingNavbar />

            <div className="min-h-screen bg-background text-foreground pt-28 pb-32 px-6">
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

                        {/* Sort & Filter */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto z-10">
                            {/* Sort Date Custom Dropdown */}
                            <div className="relative w-full sm:w-48">
                                <button
                                    onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
                                    className="w-full flex items-center justify-between px-5 md:px-6 py-3 md:py-4 bg-transparent border-2 border-border rounded-xl text-sm md:text-base font-bold text-text-primary hover:border-foreground focus:border-foreground transition-colors"
                                >
                                    <span>{sortDate === 'newToOld' ? 'NEWEST FIRST' : 'OLDEST FIRST'}</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isSortOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-border rounded-xl shadow-2xl flex flex-col p-2 gap-1 z-50">
                                        <button
                                            onClick={() => { setSortDate("newToOld"); setIsSortOpen(false); }}
                                            className={`px-4 py-3 rounded-lg text-sm md:text-base font-bold text-left transition-colors ${sortDate === 'newToOld' ? 'bg-foreground text-background' : 'hover:bg-border text-text-secondary hover:text-foreground'}`}
                                        >
                                            NEWEST FIRST
                                        </button>
                                        <button
                                            onClick={() => { setSortDate("oldToNew"); setIsSortOpen(false); }}
                                            className={`px-4 py-3 rounded-lg text-sm md:text-base font-bold text-left transition-colors ${sortDate === 'oldToNew' ? 'bg-foreground text-background' : 'hover:bg-border text-text-secondary hover:text-foreground'}`}
                                        >
                                            OLDEST FIRST
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Filter Status Custom Dropdown */}
                            <div className="relative w-full sm:w-48">
                                <button
                                    onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
                                    className="w-full flex items-center justify-between px-5 md:px-6 py-3 md:py-4 bg-transparent border-2 border-border rounded-xl text-sm md:text-base font-bold text-text-primary hover:border-foreground focus:border-foreground transition-colors"
                                >
                                    <span className="uppercase tracking-widest">{filterStatus === 'all' ? 'All Tasks' : filterStatus}</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isFilterOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-background border-2 border-border rounded-xl shadow-2xl flex flex-col p-2 gap-1 z-50">
                                        <button
                                            onClick={() => { setFilterStatus("all"); setIsFilterOpen(false); }}
                                            className={`px-4 py-3 rounded-lg text-sm md:text-base font-bold text-left uppercase tracking-widest transition-colors ${filterStatus === 'all' ? 'bg-foreground text-background' : 'hover:bg-border text-text-secondary hover:text-foreground'}`}
                                        >
                                            All Tasks
                                        </button>
                                        <button
                                            onClick={() => { setFilterStatus("pending"); setIsFilterOpen(false); }}
                                            className={`px-4 py-3 rounded-lg text-sm md:text-base font-bold text-left uppercase tracking-widest transition-colors ${filterStatus === 'pending' ? 'bg-foreground text-background' : 'hover:bg-border text-text-secondary hover:text-foreground'}`}
                                        >
                                            Pending
                                        </button>
                                        <button
                                            onClick={() => { setFilterStatus("completed"); setIsFilterOpen(false); }}
                                            className={`px-4 py-3 rounded-lg text-sm md:text-base font-bold text-left uppercase tracking-widest transition-colors ${filterStatus === 'completed' ? 'bg-foreground text-background' : 'hover:bg-border text-text-secondary hover:text-foreground'}`}
                                        >
                                            Completed
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Task List */}
                    <div className="flex flex-col">
                        {displayedTasks.length === 0 ? (
                            <p className="text-center text-text-secondary text-xl font-bold mt-10">No tasks found.</p>
                        ) : (
                            displayedTasks.map(task => (
                                <div
                                    key={task.id}
                                    onClick={() => handleTaskClick(task)}
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 md:py-8 border-b-2 border-border/30 hover:pl-4 md:hover:pl-6 transition-all duration-300 cursor-pointer gap-3 sm:gap-0"
                                >
                                    <div className="flex flex-col gap-2 pr-2 w-full overflow-hidden">
                                        <h4 className={`text-base sm:text-lg md:text-3xl font-black break-words w-full leading-tight ${task.status === 'completed' ? 'line-through text-text-secondary/50' : 'text-text-primary'}`}>
                                            {capitalizeFirstLetter(task.title)}
                                        </h4>
                                        {task.description && (
                                            <p className={`text-xs md:text-base font-medium text-text-secondary line-clamp-2 ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>
                                                {capitalizeFirstLetter(task.description)}
                                            </p>
                                        )}
                                        <span className="text-[10px] md:text-sm font-bold text-text-secondary uppercase tracking-widest mt-1">{task.created_at ? new Date(task.created_at).toLocaleDateString() : task.date}</span>
                                    </div>
                                    <div className="flex items-center gap-4 shrink-0">
                                        <span className={`text-xs md:text-sm font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 rounded-lg border-2 ${task.status === 'completed' ? 'border-green-500/50 text-green-500' : 'border-amber-500/50 text-amber-500'}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-4 md:gap-6 mt-12">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-3 md:p-4 bg-transparent border-2 border-border rounded-full hover:border-foreground transition-colors disabled:opacity-30 disabled:hover:border-border"
                        >
                            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                        <span className="font-bold text-sm md:text-xl text-text-secondary tracking-widest">
                            PAGE {currentPage} OF {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-3 md:p-4 bg-transparent border-2 border-border rounded-full hover:border-foreground transition-colors disabled:opacity-30 disabled:hover:border-border"
                        >
                            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                </div>
            </div>

            {/* Task Update Modal */}
            {selectedTask && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/90 backdrop-blur-sm transition-opacity">
                    <div className="bg-background border-2 border-border rounded-[2rem] w-full max-w-3xl p-6 md:p-12 flex flex-col gap-6 md:gap-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
                        {/* Close button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-background border-2 border-border rounded-full hover:border-foreground transition-colors"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>

                        <div className="flex items-center gap-4 mb-2 md:mb-4">
                            <button onClick={toggleModalStatus} className="group flex items-center gap-2">
                                {selectedTask.status === 'completed' ? (
                                    <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-500 transition-transform group-hover:scale-110" />
                                ) : (
                                    <Circle className="w-6 h-6 md:w-8 md:h-8 text-amber-500 transition-transform group-hover:scale-110" />
                                )}
                                <span className={`text-xs md:text-sm font-black uppercase tracking-widest ${selectedTask.status === 'completed' ? 'text-green-500' : 'text-amber-500'}`}>
                                    {selectedTask.status}
                                </span>
                            </button>
                        </div>

                        <textarea
                            ref={titleRef}
                            rows={1}
                            className={`text-2xl md:text-5xl font-black bg-transparent border-b-2 border-border focus:border-foreground py-2 md:py-4 outline-none transition-colors w-full resize-none overflow-hidden ${selectedTask.status === 'completed' ? 'text-text-secondary/50 line-through' : 'text-text-primary'}`}
                            value={selectedTask.title}
                            onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                            placeholder="Task Title..."
                        />

                        <textarea
                            className="text-base md:text-2xl font-medium bg-transparent border-b-2 border-border focus:border-foreground py-2 md:py-4 outline-none resize-none min-h-[150px] md:min-h-[200px] transition-colors w-full text-text-secondary placeholder:text-border"
                            value={selectedTask.description}
                            onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                            placeholder="Add task description here..."
                        />

                        <div className="flex justify-end mt-2 md:mt-4">
                            <button
                                onClick={handleUpdateTask}
                                className="px-6 py-3 md:px-8 md:py-4 bg-foreground text-background rounded-xl md:rounded-2xl font-black text-base md:text-xl hover:opacity-80 transition-opacity w-full sm:w-auto"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </MainLayout>
    );
}

export default Tasks;
