import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

// Reusable Components
import InputField from '../Components/UI/InputField'

const ForgotPassword = () => {
    const { user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        if (user?.email) {
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/forgot-password', { email });
            toast.success(response.data.message || 'Reset link sent successfully!');
            setIsSuccess(true);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset link.');
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
                {!isSuccess ? (
                    <>
                        <div className="mb-8 text-center">
                            <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-2">
                                {user ? 'Reset Password' : 'Forgot Password?'}
                            </h1>
                            <p className="text-text-secondary text-lg">
                                {user 
                                    ? 'Confirm your email to receive a secure password reset link' 
                                    : 'Enter your email to receive a password reset link'}
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
                                    disabled={isLoading || !!user}
                                    required={true}
                                    icon={Mail}
                                />

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-foreground text-background font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className='bg-card rounded-2xl p-8 shadow-xl border border-border flex flex-col gap-6 relative overflow-hidden text-center'>
                        <div className="absolute top-0 left-0 w-full h-1 bg-foreground"></div>
                        
                        <div className="mx-auto w-16 h-16 bg-foreground/10 text-foreground rounded-full flex items-center justify-center mb-2">
                            <Mail size={32} />
                        </div>
                        
                        <h2 className="font-heading text-2xl font-bold text-text-primary">
                            Check Your Email
                        </h2>
                        
                        <p className="text-text-secondary text-base">
                            We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>. Please check your inbox.
                        </p>

                        <div className="flex flex-col gap-3 mt-4">
                            <a
                                href="https://mail.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-foreground text-background font-semibold rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-lg transition-all duration-300"
                            >
                                Open Gmail
                            </a>
                            <Link
                                to={`/reset-password?email=${encodeURIComponent(email)}`}
                                className="w-full bg-transparent border border-border text-foreground font-semibold rounded-xl py-3 px-4 flex items-center justify-center hover:bg-border transition-all duration-300"
                            >
                                Go to Reset Password
                            </Link>
                            {user && (
                                <Link
                                    to="/profile"
                                    className="w-full bg-transparent border border-border text-foreground font-semibold rounded-xl py-3 px-4 flex items-center justify-center hover:bg-border transition-all duration-300"
                                >
                                    Back to Profile
                                </Link>
                            )}
                        </div>
                    </div>
                )}

                {user ? (
                    <p className="mt-8 text-center text-text-secondary">
                        <Link to="/profile" className="font-semibold text-foreground hover:text-text-primary hover:underline transition-all duration-300">
                            Back to Profile
                        </Link>
                    </p>
                ) : (
                    <p className="mt-8 text-center text-text-secondary">
                        Remember your password?{' '}
                        <Link to="/login" className="font-semibold text-foreground hover:text-text-primary hover:underline transition-all duration-300">
                            Sign In
                        </Link>
                    </p>
                )}
            </div>
        </div>
    )
}

export default ForgotPassword
