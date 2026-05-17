import { User, Home, ListTodo, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function FloatingNavbar() {
    const location = useLocation();
    const { user } = useAuth();

    const navItems = user?.role === 'admin' ? [
        { icon: User, path: '/profile', label: 'Profile', posClass: 'top-[15%] left-[15%]' },
        { icon: Home, path: '/admin-dashboard', label: 'Dashboard', posClass: 'top-[50%] left-[0%]' },
        { icon: Users, path: '/users', label: 'Users', posClass: 'top-[85%] left-[15%]' },
    ] : [
        { icon: User, path: '/profile', label: 'Profile', posClass: 'top-[15%] left-[15%]' },
        { icon: Home, path: '/user-dashboard', label: 'Dashboard', posClass: 'top-[50%] left-[0%]' },
        { icon: ListTodo, path: '/tasks', label: 'Tasks', posClass: 'top-[85%] left-[15%]' },
    ];

    return (
        <>
            {/* Desktop Circular Navbar */}
            <div className="hidden lg:block fixed -right-40 top-1/2 -translate-y-1/2 w-70 h-70 bg-card/80 backdrop-blur-md border-[3px] border-border rounded-full shadow-2xl z-50">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/'); // Handle exact home

                    // If it's active, it's significantly bigger.
                    const activeStyle = 'bg-foreground text-background shadow-xl scale-[1.1] w-14 h-14 ring-4 ring-background';
                    const inactiveStyle = 'bg-background text-text-secondary border-[3px] border-border hover:bg-border hover:text-foreground scale-100 hover:scale-110 w-12 h-12';

                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-500 group ${item.posClass} ${isActive ? activeStyle : inactiveStyle}`}
                            title={item.label}
                        >
                            <Icon className="w-5 h-5" />

                            {/* Tooltip on the LEFT */}
                            <span className="absolute right-full mr-6 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
                                {item.label}
                                {/* Little triangle arrow pointing to the right */}
                                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-foreground rotate-45"></div>
                            </span>
                        </Link>
                    )
                })}
            </div>

            {/* Mobile Bottom Floating Navbar */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-md border border-border p-2 rounded-full shadow-2xl z-50 flex items-center justify-center gap-2 sm:gap-4 w-[90%] max-w-[320px]">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/'); 

                    const activeStyle = 'bg-foreground text-background shadow-md scale-110';
                    const inactiveStyle = 'text-text-secondary hover:bg-border hover:text-foreground scale-100';

                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex flex-1 items-center justify-center h-12 rounded-full transition-all duration-300 ${isActive ? activeStyle : inactiveStyle}`}
                            title={item.label}
                        >
                            <Icon className="w-5 h-5" />
                        </Link>
                    )
                })}
            </div>
        </>
    );
}

export default FloatingNavbar;
