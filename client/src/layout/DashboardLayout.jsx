import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bell, User, LogOut, BookOpen, FileText, Settings, Menu, X, Users, CheckSquare, Brain, PenTool, PieChart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarItem = ({ icon: Icon, label, path, active }) => (
    <Link to={path}>
        <div className={`flex items-center space-x-4 px-6 py-3 rounded-r-full mr-2 transition-colors ${active ? 'bg-primary/10 text-primary font-semibold' : 'text-secondary-foreground hover:bg-secondary hover:text-foreground'}`}>
            <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
            <span className="text-sm tracking-medium">{label}</span>
        </div>
    </Link>
);

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => setIsOpen(!isOpen);

    // Determine role based on path for simplified demo
    let role = 'student';
    if (location.pathname.includes('teacher')) role = 'teacher';
    if (location.pathname.includes('admin')) role = 'admin';

    const menuItems = [
        { icon: LayoutDashboard, label: 'Classes', path: `/${role}/dashboard` },
        { icon: BookOpen, label: 'Calendar', path: '/calendar' }, // Placeholder
        { icon: CheckSquare, label: 'To-do', path: '/submission-list' }, // Mapping to To-do/Review
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    // Add role specific items if needed, but keep it simple like Classroom
    if (role === 'teacher') {
        // Teachers see "To Review" instead of "To-do" conceptually, but same link for now
    }

    const archivedClasses = [
        { icon: BookOpen, label: 'Archived Classes', path: '/archived' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];


    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
            {/* Topbar */}
            <header className="h-16 border-b border-border bg-card sticky top-0 z-50 flex items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <button onClick={toggleSidebar} className="p-3 hover:bg-secondary rounded-full text-secondary-foreground transition-colors">
                        <Menu className="w-6 h-6" />
                    </button>
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white border border-border rounded-lg flex items-center justify-center text-primary font-bold text-xl">
                            I
                        </div>
                        <span className="text-xl font-medium text-foreground hidden md:block">Inkless Classroom</span>
                    </Link>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-secondary rounded-full text-secondary-foreground">
                        <PlusIcon className="w-6 h-6" />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-full text-secondary-foreground">
                        <Bell className="w-6 h-6" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium ml-2 cursor-pointer hover:ring-2 hover:ring-gray-200">
                        {role[0].toUpperCase()}
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <AnimatePresence mode='wait'>
                    {isOpen && (
                        <motion.aside
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 300, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="bg-card border-r border-border h-[calc(100vh-64px)] overflow-y-auto sticky top-16 flex-col hidden md:flex py-4"
                        >
                            <nav className="flex-1 space-y-1">
                                {menuItems.map((item) => (
                                    <SidebarItem key={item.path} {...item} active={location.pathname === item.path} />
                                ))}

                                <div className="my-4 border-t border-border mx-6" />
                                <div className="px-6 py-2 text-xs font-medium text-secondary-foreground uppercase tracking-wider">
                                    Enrolled
                                </div>
                                {/* Example Enrolled Classes */}
                                <SidebarItem icon={BookOpen} label="Intro to AI" path="/class-details" active={false} />
                                <SidebarItem icon={BookOpen} label="Web Development" path="/class-details-2" active={false} />

                                <div className="my-4 border-t border-border mx-6" />
                                {archivedClasses.map((item) => (
                                    <SidebarItem key={item.path} {...item} active={location.pathname === item.path} />
                                ))}
                            </nav>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-background">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// Start Icon helper
const PlusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
)

export default DashboardLayout;
