import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { CheckSquare, ShieldCheck, Filter, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const hasToken = !!localStorage.getItem('token');

    useEffect(() => {
        if (!loading && user) {
            if (user.role === 'admin') {
                navigate('/admin-dashboard', { replace: true });
            } else {
                navigate('/user-dashboard', { replace: true });
            }
        }
    }, [user, loading, navigate]);

    const words = ["Smarter", "Quicker", "Faster", "Better"];
    const [wordIndex, setWordIndex] = useState(0);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (loading && hasToken) {
        return (
            <div className="min-h-svh w-full flex items-center justify-center bg-background text-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
            </div>
        );
    }

    const features = [
        {
            title: "Task Management",
            description: "Create, update, and organize tasks efficiently.",
            icon: CheckSquare
        },
        {
            title: "Secure Authentication",
            description: "Protected user accounts and secure login system.",
            icon: ShieldCheck
        },
        {
            title: "Task Filtering",
            description: "Quickly find tasks using status or category filters.",
            icon: Filter
        }
    ];

    return (
        <MainLayout>
            <div className="min-h-svh bg-background text-foreground">

                {/* Hero */}
                <section className={`relative overflow-hidden min-h-svh flex flex-col items-center justify-center text-center px-6 py-24 transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

                    <h1 className="font-heading text-4xl md:text-6xl font-extrabold max-w-3xl mx-auto leading-tight">
                        Manage Your Tasks{" "}
                        <span className="relative inline-grid text-text-primary text-center">
                            {words.map((word, index) => (
                                <span
                                    key={word}
                                    className={`col-start-1 row-start-1 transition-all duration-500 ease-in-out ${index === wordIndex
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                        }`}
                                >
                                    {word}
                                </span>
                            ))}
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-text-secondary max-w-xl">
                        Organize your work, track progress,
                        and boost productivity with a clean
                        and modern task management system.
                    </p>

                    <div className="flex gap-4 mt-8">
                        <Link
                            to="/register"
                            className="relative overflow-hidden px-8 py-3 rounded-xl bg-foreground text-background font-medium hover:scale-105 transition-transform duration-300 active:scale-95 shadow-lg group"
                        >
                            <span className="relative z-10">Get Started</span>
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                        </Link>

                        <Link
                            to="https://github.com/Krutarth-Raval/Taskey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 rounded-xl border border-border hover:bg-border/50 hover:scale-105 transition-all duration-300 active:scale-95"
                        >
                            GitHub
                        </Link>
                    </div>
                </section>

                {/* Features */}
                <section className={`min-h-svh flex flex-col justify-center px-4 md:px-6 py-12 md:py-24 relative overflow-hidden transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    {/* Background glowing blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="max-w-5xl mx-auto text-center mb-6 md:mb-16 relative z-10 w-full">
                        <span className="inline-block py-1 px-3 rounded-full bg-border text-xs font-bold tracking-wider uppercase mb-2 md:mb-4 text-text-secondary">Why Taskey?</span>
                        <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-2 md:mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto ">
                            Everything you need to manage your workflow, beautifully designed and simple to use.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 max-w-5xl mx-auto relative z-10 w-full">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className={`group relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-card border border-border transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 overflow-hidden flex flex-col ${index === 2 ? "col-span-2 md:col-span-1" : "col-span-1"
                                        }`}
                                >
                                    {/* Hover Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative z-10 flex-1">
                                        {/* Icon Container */}
                                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-background border border-border flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm relative overflow-hidden">
                                            {/* Icon flare effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-foreground/10 to-transparent translate-y-full group-hover:-translate-y-full transition-transform duration-700"></div>
                                            <Icon className="w-5 h-5 md:w-7 md:h-7 text-text-primary relative z-10" />
                                        </div>

                                        <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-3 text-text-primary group-hover:text-foreground transition-colors">
                                            {feature.title}
                                        </h3>

                                        <p className="text-xs md:text-base text-text-secondary leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Subtle decorative corner icon */}
                                    <Icon className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-40 md:h-40 text-foreground/[0.02] group-hover:text-foreground/[0.05] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* CTA */}
                <section className="min-h-svh flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/[0.04] rounded-full blur-[100px] pointer-events-none"></div>

                    {/* Top Badge */}
                    <span className="inline-block py-1 px-3 rounded-full bg-border text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-4 text-text-secondary">
                        Get Started
                    </span>

                    <h2 className="font-heading text-3xl md:text-5xl font-black max-w-xl mx-auto leading-tight text-text-primary">
                        Ready to get <span className="text-foreground">productive?</span>
                    </h2>

                    <p className="mt-4 text-xs md:text-base text-text-secondary max-w-md mx-auto leading-relaxed">
                        Unlock a cleaner workflow, track tasks seamlessly, and elevate your productivity daily.
                    </p>

                    <Link
                        to="/register"
                        className="relative overflow-hidden mt-8 px-8 py-3.5 rounded-xl bg-foreground text-background font-bold text-xs md:text-sm tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-md group"
                    >
                        <span className="relative z-10">Start Now</span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                    </Link>
                </section>
            </div>
        </MainLayout>
    );
}

export default Home;