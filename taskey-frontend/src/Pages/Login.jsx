import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// Reusable Components
import InputField from '../Components/UI/InputField'

const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const loggedInUser = await login({ email, password });
        setIsLoading(false);
        if (loggedInUser) {
            if (loggedInUser.role === 'admin') {
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
                        <InputField
                            id="email"
                            type="email"
                            label="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            disabled={isLoading}
                            required
                            icon={Mail}
                        />

                        <InputField
                            id="password"
                            type="password"
                            label="Password"
                            rightLabel={
                                <Link 
                                    to={isLoading ? "#" : "/forgot-password"} 
                                    className={`text-xs font-semibold text-text-secondary hover:text-foreground transition-colors ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    Forgot password?
                                </Link>
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={isLoading}
                            required
                            icon={Lock}
                        />

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-foreground text-background font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <>
                                        Signing In...
                                        <Loader2 size={18} className="animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                <p className="mt-8 text-center text-text-secondary">
                    Don't have an account?{' '}
                    <Link 
                        to={isLoading ? "#" : "/register"} 
                        className={`font-semibold text-foreground hover:text-text-primary hover:underline transition-all duration-300 ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login