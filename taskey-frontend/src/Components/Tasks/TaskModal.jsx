import React, { useRef, useEffect } from 'react';
import { X, CheckCircle2, Circle, Trash2 } from 'lucide-react';

function TaskModal({
    isOpen,
    task,
    onClose,
    onSave,
    onDeleteClick,
    onChange,
    isSaving
}) {
    const titleRef = useRef(null);

    // Auto-resize the title textarea
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = 'auto';
            titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
        }
    }, [task?.title, isOpen]);

    if (!isOpen || !task) return null;

    const toggleStatus = () => {
        onChange({
            ...task,
            status: task.status === "pending" ? "completed" : "pending"
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/90 backdrop-blur-sm transition-opacity">
            <div className="bg-background border-2 border-border rounded-[2rem] w-full max-w-3xl p-6 md:p-12 flex flex-col gap-6 md:gap-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-background border-2 border-border rounded-full hover:border-foreground transition-colors"
                >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <div className="flex items-center gap-4 mb-2 md:mb-4">
                    <button onClick={toggleStatus} className="group flex items-center gap-2">
                        {task.status === 'completed' ? (
                            <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-500 transition-transform group-hover:scale-110" />
                        ) : (
                            <Circle className="w-6 h-6 md:w-8 md:h-8 text-amber-500 transition-transform group-hover:scale-110" />
                        )}
                        <span className={`text-xs md:text-sm font-black uppercase tracking-widest ${task.status === 'completed' ? 'text-green-500' : 'text-amber-500'}`}>
                            {task.status}
                        </span>
                    </button>
                </div>

                <textarea
                    ref={titleRef}
                    rows={1}
                    className={`text-2xl md:text-5xl font-black bg-transparent border-b-2 border-border focus:border-foreground py-2 md:py-4 outline-none transition-colors w-full resize-none overflow-hidden ${task.status === 'completed' ? 'text-text-secondary/50 line-through' : 'text-text-primary'}`}
                    value={task.title || ''}
                    onChange={(e) => onChange({ ...task, title: e.target.value })}
                    placeholder="Task Title..."
                />

                <textarea
                    className="text-base md:text-2xl font-medium bg-transparent border-b-2 border-border focus:border-foreground py-2 md:py-4 outline-none resize-none min-h-[150px] md:min-h-[200px] transition-colors w-full text-text-secondary placeholder:text-border"
                    value={task.description || ''}
                    onChange={(e) => onChange({ ...task, description: e.target.value })}
                    placeholder="Add task description here..."
                />

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 md:mt-4">
                    <button
                        onClick={onSave}
                        disabled={isSaving}
                        className="px-6 py-3 md:px-8 md:py-4 bg-foreground text-background rounded-xl md:rounded-2xl font-black text-base md:text-xl hover:opacity-90 transition-opacity w-full sm:w-auto flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                    >
                        {isSaving ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent"></div>
                                Saving...
                            </>
                        ) : "Save Changes"}
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteClick(task);
                        }}
                        className="px-6 py-3 md:px-8 md:py-4 border-2 border-red-500/20 hover:border-red-500 bg-transparent text-red-500 rounded-xl md:rounded-2xl font-black text-base md:text-xl hover:bg-red-500 hover:text-white transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Trash2 className="w-5 h-5" />
                        Delete Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskModal;
