import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

// Constants for UI strings to support internationalization and resolve linter warnings
const TEXT = {
    title: "Reset Password",
    description: "Enter your new credentials below",
    emailLabel: "Email Address",
    passwordLabel: "New Password",
    confirmLabel: "Confirm New Password",
    invalidTitle: "Invalid Reset Link",
    invalidDesc: "This page can only be accessed using a valid reset link sent to your email.",
    requestLink: "Request Reset Link",
    backToProfile: "Back to Profile",
    rememberPassword: "Remember your password? ",
    signIn: "Sign In"
};

const ResetPassword = () => {
    const { user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState(searchParams.get('email') || '');
    const [token, setToken] = useState(searchParams.get('token') || '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Invalid token. Please use the link sent to your email.");
            return;
        }

        if (password !== passwordConfirmation) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post('/reset-password', {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation
            });
            toast.success(response.data.message || 'Password reset successful!');
            if (user) {
                navigate('/profile');
            } else {
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Password reset failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-svh w-full flex flex-col justify-center items-center bg-background p-4'>
            <div
                className={`w-full max-w-md transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
            >
                {token ? (
                    <>
                        <div className="mb-8 text-center">
                            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">
                                {TEXT.title}
                            </h1>
                            <p className="text-text-secondary text-lg">
                                {TEXT.description}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='bg-card rounded-2xl p-8 shadow-xl border border-border flex flex-col gap-6 relative overflow-hidden'>
                            {/* Decorative element */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-foreground"></div>

                            <div className='flex flex-col gap-5'>
                                <div className="space-y-2 group">
                                    <label htmlFor="email" className="text-sm font-medium text-text-primary ml-1 transition-colors group-focus-within:text-foreground">{TEXT.emailLabel}</label>
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
                                            readOnly={!!searchParams.get('email')}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label htmlFor="password" className="text-sm font-medium text-text-primary ml-1 transition-colors group-focus-within:text-foreground">{TEXT.passwordLabel}</label>
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

                                <div className="space-y-2 group">
                                    <label htmlFor="password_confirmation" className="text-sm font-medium text-text-primary ml-1 transition-colors group-focus-within:text-foreground">{TEXT.confirmLabel}</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary group-focus-within:text-foreground transition-colors duration-300">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            id="password_confirmation"
                                            type="password"
                                            value={passwordConfirmation}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-foreground text-background font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Resetting...' : TEXT.title}
                                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className='bg-card rounded-2xl p-8 shadow-xl border border-border flex flex-col gap-6 relative overflow-hidden text-center'>
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                        
                        <div className="mx-auto w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-2">
                            <Lock size={32} />
                        </div>
                        
                        <h2 className="font-heading text-2xl font-bold text-text-primary">
                            {TEXT.invalidTitle}
                        </h2>
                        
                        <p className="text-text-secondary text-base">
                            {TEXT.invalidDesc}
                        </p>

                        <div className="flex flex-col gap-3 mt-4">
                            <Link
                                to="/forgot-password"
                                className="w-full bg-foreground text-background font-semibold rounded-xl py-3 px-4 flex items-center justify-center hover:opacity-90 hover:shadow-lg transition-all duration-300"
                            >
                                {TEXT.requestLink}
                            </Link>
                        </div>
                    </div>
                )}

                {user ? (
                    <p className="mt-8 text-center text-text-secondary">
                        <Link to="/profile" className="font-semibold text-foreground hover:text-text-primary hover:underline transition-all duration-300">
                            {TEXT.backToProfile}
                        </Link>
                    </p>
                ) : (
                    <p className="mt-8 text-center text-text-secondary">
                        {TEXT.rememberPassword}
                        <Link to="/login" className="font-semibold text-foreground hover:text-text-primary hover:underline transition-all duration-300">
                            {TEXT.signIn}
                        </Link>
                    </p>
                )}
            </div>
        </div>
    )
}

export default ResetPassword
