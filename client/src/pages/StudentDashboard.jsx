import React from 'react';
import { Link } from 'react-router-dom';
import { User, FolderOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentClassCard = ({ title, section, teacher, theme, link }) => (
    <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" }}
        className="group relative flex flex-col bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 w-full"
    >
        {/* Card Header (Banner) */}
        <div className={`h-28 ${theme} relative p-4 flex flex-col justify-between`}>
            <div className="flex justify-between items-start text-white">
                <Link to={link || "/class-details"} className="hover:underline decoration-1 underline-offset-2 w-full">
                    <h2 className="text-xl font-medium truncate mb-1">{title}</h2>
                    <p className="text-sm opacity-90 truncate">{section}</p>
                </Link>
                <div className="bg-white/20 p-1 rounded-full">
                    <User className="w-5 h-5 text-white" />
                </div>
            </div>
            <p className="text-white/90 text-sm font-medium truncate">{teacher}</p>
        </div>

        {/* Card Body */}
        <div className="flex-1 p-4 relative min-h-[120px] bg-surface flex flex-col justify-between">
            <div className="space-y-3">
                <p className="text-sm text-secondary-foreground" >Due Tomorrow:</p>
                <div className="text-sm font-medium hover:underline cursor-pointer truncate text-foreground">
                    Assignment 3: Neural Networks
                </div>
            </div>
        </div>

        {/* Card Footer */}
        <div className="border-t border-border p-3 flex justify-end space-x-2 bg-background/50">
            <button className="p-2 hover:bg-black/5 rounded-full text-secondary-foreground hover:text-primary transition-colors tooltip" title="Your Work">
                <FolderOpen className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full text-secondary-foreground hover:text-primary transition-colors tooltip" title="Your Work">
                <TrendingUp className="w-5 h-5" />
            </button>
        </div>
    </motion.div>
);

const StudentDashboard = () => {
    // Mock Data for Student Classes
    const enrolledClasses = [
        { id: 1, title: 'Introduction to AI', section: 'CS101', teacher: 'Prof. Alan Turing', theme: 'bg-gradient-to-r from-blue-600 to-indigo-600' },
        { id: 2, title: 'Web Development', section: 'CS305', teacher: 'Prof. Tim Berners-Lee', theme: 'bg-gradient-to-r from-orange-500 to-pink-600' },
        { id: 3, title: 'Database Systems', section: 'CS204', teacher: 'Prof. Ada Lovelace', theme: 'bg-gradient-to-r from-emerald-600 to-teal-600' },
        { id: 4, title: 'Algorithms', section: 'CS301', teacher: 'Prof. Donald Knuth', theme: 'bg-slate-700' },
        { id: 5, title: 'Computer Networks', section: 'CS401', teacher: 'Prof. Grace Hopper', theme: 'bg-purple-600' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Enrolled</h1>
                    <p className="text-sm text-secondary-foreground">Your academic courses for this semester.</p>
                </div>
            </div>

            {/* Grid of Class Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {enrolledClasses.map((cls) => (
                    <StudentClassCard
                        key={cls.id}
                        title={cls.title}
                        section={cls.section}
                        teacher={cls.teacher}
                        theme={cls.theme}
                        link={`/class-details`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;
