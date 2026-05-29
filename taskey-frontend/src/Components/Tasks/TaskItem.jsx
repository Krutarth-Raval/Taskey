import React from 'react';
import { Trash2 } from 'lucide-react';

const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

function TaskItem({ task, onClick, onDeleteClick }) {
    return (
        <div
            onClick={() => onClick(task)}
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
                <span className="text-[10px] md:text-sm font-bold text-text-secondary uppercase tracking-widest mt-1">
                    {task.created_at ? new Date(task.created_at).toLocaleDateString() : task.date}
                </span>
            </div>
            <div className="flex items-center justify-between gap-4 shrink-0">
                <span className={`text-xs md:text-sm font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-2 rounded-lg border-2 ${task.status === 'completed' ? 'border-green-500/50 text-green-500' : 'border-amber-500/50 text-amber-500'}`}>
                    {task.status}
                </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent opening the edit modal!
                        onDeleteClick(task);
                    }}
                    className="p-2 border-2 border-red-500/20 hover:border-red-500 bg-transparent text-red-500 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
                    title="Delete Task"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default TaskItem;
