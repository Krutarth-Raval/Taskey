import React, { useState, useEffect } from 'react';
import { ListTodo, Clock, CheckCircle } from 'lucide-react';

function GreetingCard({ userName = "User", stats = { total: 0, pending: 0, completed: 0 } }) {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good morning");
        else if (hour < 18) setGreeting("Good afternoon");
        else setGreeting("Good evening");
    }, []);

    return (
        <div className="w-full flex flex-col gap-8 md:gap-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary tracking-tight leading-tight">
                {greeting},<br /> <span className="text-foreground">{userName}</span>.
            </h2>

            <div className="flex flex-wrap gap-8 md:gap-16">
                <div className="flex flex-col">
                    <span className="text-3xl md:text-5xl font-black">{stats.total}</span>
                    <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">Total Tasks</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-3xl md:text-5xl font-black text-amber-500">{stats.pending}</span>
                    <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">Pending</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-3xl md:text-5xl font-black text-green-500">{stats.completed}</span>
                    <span className="text-xs md:text-sm text-text-secondary font-bold tracking-widest uppercase mt-1">Completed</span>
                </div>
            </div>
        </div>
    )
}

export default GreetingCard;