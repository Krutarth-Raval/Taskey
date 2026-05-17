import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedInUser = await login({ email, password });
        if (loggedInUser) {
            if (loggedInUser.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        }
    };

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center bg-background p-4'>
            <div
                className={`w-full max-w-md transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
            >
                <div className="mb-8 text-center">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-text-secondary text-lg">
                        Sign in to continue to Taskey
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='bg-card rounded-2xl p-8 shadow-xl border border-border flex flex-col gap-6 relative overflow-hidden'>
                    {/* Decorative element */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-foreground"></div>

                    <div className='flex flex-col gap-5'>
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
                                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <div className="flex justify-between items-center ml-1">
                                <label htmlFor="password" className="text-sm font-medium text-text-primary transition-colors group-focus-within:text-foreground">Password</label>
                                <Link to="/forgot-password" className="text-xs font-semibold text-text-secondary hover:text-foreground transition-colors">Forgot password?</Link>
                            </div>
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
                                    className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full bg-foreground text-background font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                            >
                                Sign In
                                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </form>

                <p className="mt-8 text-center text-text-secondary">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-foreground hover:text-text-primary hover:underline transition-all duration-300">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login