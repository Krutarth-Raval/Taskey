import React from 'react';

function UserItem({ userItem, onClick }) {
    const completionRate = userItem.tasks_count > 0
        ? Math.round((userItem.completed_tasks_count / userItem.tasks_count) * 100)
        : 0;

    return (
        <div
            onClick={() => onClick(userItem)}
            className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 md:py-8 border-b-2 border-border/30 hover:pl-4 md:hover:pl-6 transition-all duration-300 gap-4 sm:gap-0 cursor-pointer"
        >
            {/* Left Side: Name, Badge, Email */}
            <div className="flex flex-col gap-2 pr-2 w-full overflow-hidden">
                <div className="flex items-center gap-3">
                    <h4 className="text-base sm:text-lg md:text-3xl font-black truncate text-text-primary">
                        {userItem.name || "N/A"}
                    </h4>
                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border shrink-0 ${
                        userItem.role === 'admin' ? 'bg-foreground text-background border-foreground' : 'text-text-secondary border-border'
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
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary opacity-60"></span>
                </div>
            )}
        </div>
    );
}

export default UserItem;
