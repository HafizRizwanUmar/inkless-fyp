import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MoreVertical, FolderOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ClassCard = ({ title, section, students, theme, link, code }) => (
    <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
        className="group relative flex flex-col bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 w-full"
    >
        <div className={`h-24 ${theme} relative p-4 flex flex-col justify-between`}>
            <div className="flex justify-between items-start text-white">
                <Link to={link || "/class-details"} className="hover:underline decoration-1 underline-offset-2">
                    <h2 className="text-xl font-medium truncate">{title}</h2>
                    <p className="text-sm opacity-90">{section}</p>
                </Link>
                <button className="p-1 hover:bg-white/20 rounded-full transition-colors text-white">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Card Body */}
        <div className="flex-1 p-4 relative min-h-[100px]">
            <p className="text-sm text-secondary-foreground mb-1">{students} Students</p>
            {code && (
                <div className="text-xs font-mono bg-secondary/50 p-2 rounded inline-block text-primary">
                    Code: {code}
                </div>
            )}
        </div>

        {/* Card Footer */}
        <div className="border-t border-border p-3 flex justify-end space-x-2 bg-background/50">
            <button className="p-2 hover:bg-surface rounded-full text-secondary-foreground hover:text-primary transition-colors tooltip" title="Open Gradebook">
                <TrendingUp className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-surface rounded-full text-secondary-foreground hover:text-primary transition-colors tooltip" title="Open Folder">
                <FolderOpen className="w-5 h-5" />
            </button>
        </div>
    </motion.div>
);

const TeacherDashboard = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('http://localhost:5000/api/classes', {
                    headers: { 'x-auth-token': token }
                });
                const data = await res.json();
                setClasses(data);
            } catch (err) {
                console.error("Error fetching classes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    if (loading) return <div className="p-6 text-center text-secondary-foreground">Loading classes...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Teaching</h1>
                    <p className="text-sm text-secondary-foreground">Manage your active courses.</p>
                </div>
                <div className="flex space-x-3">
                    <Link to="/create-class" className="flex items-center space-x-2 bg-transparent text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 px-4 py-2 rounded-lg transition-all font-medium">
                        <Plus className="w-5 h-5" />
                        <span>Create Class</span>
                    </Link>
                </div>
            </div>

            {/* Grid of Class Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {classes.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-surface rounded-xl border border-border">
                        <p className="text-secondary-foreground">No classes found. Create one to get started!</p>
                    </div>
                ) : (
                    classes.map((cls) => (
                        <ClassCard
                            key={cls._id}
                            title={cls.title}
                            section={cls.section}
                            students={cls.students?.length || 0}
                            theme={cls.theme}
                            link={`/class-details`}
                            code={cls.code}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TeacherDashboard;
