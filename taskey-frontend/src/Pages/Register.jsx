import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight, UserPlus, ArrowLeft, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

function RegisterPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }
        setIsLoading(true);
        const registeredUser = await register({ name, email, password, password_confirmation: confirmPassword });
        setIsLoading(false);
        if (registeredUser) {
            if (registeredUser.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        }
    };

    return (
        <div className='min-h-svh w-full flex flex-col justify-center items-center bg-background p-4'>
            <div
                className={`w-full max-w-md transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
            >
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    disabled={isLoading}
                    className="self-start flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all duration-300 group mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back
                </button>

                <div className="mb-8 text-center">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">
                        Join Taskey
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Start managing your tasks today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='bg-card rounded-2xl p-8 shadow-xl border border-border flex flex-col gap-6 relative overflow-hidden'>
                    {/* Decorative element */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-foreground"></div>

                    <div className='flex flex-col gap-5'>
                        <div className="space-y-2 group">
                            <label htmlFor="name" className="text-sm font-medium text-text-primary ml-1 transition-colors group-focus-within:text-foreground">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary group-focus-within:text-foreground transition-colors duration-300">
                                    <User size={18} />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    disabled={isLoading}
                                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label htmlFor="email" className="text-sm font-medium text-text-primary ml-1 transition-colors group-focus-within:text-foreground">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary group-focus-within:text-foreground transition-colors duration-300">
                                    <Mail size={18} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    disabled={isLoading}
                                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label htmlFor="password" className="text-sm font-medium text-text-primary ml-1 transition-colors group-focus-within:text-foreground">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary group-focus-within:text-foreground transition-colors duration-300">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <label htmlFor="confirm-password" className="text-sm font-medium text-text-primary ml-1 transition-colors group-focus-within:text-foreground">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary group-focus-within:text-foreground transition-colors duration-300">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-foreground text-background font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <>
                                        Creating Account...
                                        <Loader2 size={18} className="animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                <p className="mt-8 text-center text-text-secondary">
                    Already have an account?{' '}
                    <Link 
                        to={isLoading ? "#" : "/login"} 
                        className={`font-semibold text-foreground hover:text-text-primary hover:underline transition-all duration-300 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage