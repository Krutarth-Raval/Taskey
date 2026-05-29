import React from 'react';
import { X, Lock, Trash2 } from 'lucide-react';

function UserModal({ isOpen, userItem, onClose, onDeleteClick }) {
    if (!isOpen || !userItem) return null;

    const progressRate = userItem.tasks_count > 0
        ? Math.round((userItem.completed_tasks_count / userItem.tasks_count) * 100)
        : 0;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-background/90 backdrop-blur-sm transition-opacity">
            <div className="bg-background border-2 border-border rounded-[2rem] w-full max-w-2xl p-6 md:p-12 flex flex-col gap-6 md:gap-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
                {/* Close button */}
                <button
                    onClick={onClose}
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
                            {userItem.name || "N/A"}
                        </h2>
                        <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border shrink-0 ${
                            userItem.role === 'admin' ? 'bg-foreground text-background border-foreground' : 'text-text-secondary border-border'
                        }`}>
                            {userItem.role === 'admin' ? 'Admin' : 'Member'}
                        </span>
                    </div>
                </div>

                {/* Details Panel */}
                <div className="flex flex-col gap-4 border-y border-border/30 py-6">
                    {/* Email */}
                    <div className="flex justify-between items-center py-2.5">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary">Email Address</span>
                        <span className="text-sm md:text-lg font-black text-text-primary break-all ml-4">{userItem.email}</span>
                    </div>

                    {/* Registration Date */}
                    <div className="flex justify-between items-center py-2.5">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary">Registration Date</span>
                        <span className="text-sm md:text-lg font-black text-text-primary flex items-center gap-2">
                            {userItem.created_at ? new Date(userItem.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                        </span>
                    </div>

                    {/* Role */}
                    <div className="flex justify-between items-center py-2.5">
                        <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary">Access Permission</span>
                        <span className="text-sm md:text-lg font-black text-text-primary flex items-center gap-2">
                            {userItem.role === 'admin' ? 'Administrator' : 'Standard Member'}
                        </span>
                    </div>
                </div>

                {/* Member Specific Statistics */}
                {userItem.role !== 'admin' && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-text-primary mb-1">
                            Task Performance
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-foreground/[0.02] border border-border/40 rounded-2xl flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total Created</span>
                                <span className="text-xl md:text-2xl font-black text-text-primary">{userItem.tasks_count || 0}</span>
                            </div>
                            <div className="p-4 bg-foreground/[0.02] border border-border/40 rounded-2xl flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Completed</span>
                                <span className="text-xl md:text-2xl font-black text-green-500">{userItem.completed_tasks_count || 0}</span>
                            </div>
                        </div>

                        {/* Large Progress Bar */}
                        <div className="flex flex-col gap-2 mt-2">
                            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-text-secondary">
                                <span>Overall Progress</span>
                                <span>{progressRate}%</span>
                            </div>
                            <div className="w-full h-3 bg-foreground/10 border border-border/40 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${progressRate === 100 ? 'bg-green-500' : 'bg-foreground'}`}
                                    style={{ width: `${progressRate}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-4 mt-4">
                    {userItem.role === 'admin' ? (
                        <div className="w-full py-4 px-6 border border-border bg-foreground/[0.02] rounded-2xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary">
                            <Lock className="w-4 h-4 text-text-secondary" />
                            Admin profiles cannot be deleted
                        </div>
                    ) : (
                        <button
                            onClick={() => onDeleteClick(userItem)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 border-2 border-red-500/20 hover:border-red-500 bg-transparent text-red-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-[0.98]"
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Member Account
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserModal;
