import GreetingCard from "../Components/UI/GreetingCard"
import CreateTask from "../Components/UI/CreateTask"
import FloatingNavbar from "../Components/UI/FloatingNavbar"
import MainLayout from "../layouts/MainLayout"
import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import api from '../api/axios'

function UserDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

    const fetchStats = async () => {
        try {
            const response = await api.get('/tasks');
            const tasks = response.data.tasks || [];
            setStats({
                total: tasks.length,
                pending: tasks.filter(t => t.status === 'pending').length,
                completed: tasks.filter(t => t.status === 'completed').length
            });
        } catch (error) {
            console.error("Failed to fetch stats", error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const userData = {
        name: user?.name || "User",
        stats: stats
    };

    return (
        <MainLayout hideFooter>
            <FloatingNavbar />

            <div className="h-svh bg-background text-foreground px-6 flex flex-col items-center justify-center pt-0 md:pt-16">
                <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
                    <GreetingCard userName={userData.name} stats={userData.stats} />
                    <CreateTask onTaskCreated={fetchStats} />
                </div>
            </div>
        </MainLayout>
    )
}

export default UserDashboard;