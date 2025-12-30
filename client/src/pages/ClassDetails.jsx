import React, { useState } from 'react';
import { FileText, Users, BarChart2, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClassDetails = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const tabs = [
        { id: 'Overview', icon: FileText },
        { id: 'Assignments', icon: FileText },
        { id: 'Students', icon: Users },
        { id: 'Analytics', icon: BarChart2 },
    ];

    return (
        <div className="space-y-6">
            {/* Header Banner */}
            <div className="h-48 rounded-xl bg-gradient-to-r from-blue-900 to-slate-900 relative flex items-end p-8 border border-border">
                <div className="absolute top-4 right-4 bg-black/30 p-2 rounded-full cursor-pointer hover:bg-black/50 transition-colors">
                    <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Introduction to AI</h1>
                    <p className="text-blue-200 text-lg">CS101 • Fall 2025 • Section A</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-border flex space-x-6">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 px-2 flex items-center space-x-2 font-medium transition-colors relative ${activeTab === tab.id ? 'text-primary' : 'text-secondary-foreground hover:text-white'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.id}</span>
                        {activeTab === tab.id && (
                            <motion.div layoutId="active-tab" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'Overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-surface p-6 rounded-xl border border-border">
                                        <h3 className="text-lg font-bold mb-4">Class Description</h3>
                                        <p className="text-secondary-foreground leading-relaxed">
                                            This course introduces the basic concepts of Artificial Intelligence.
                                            Topics include machine learning, neural networks, and natural language processing.
                                        </p>
                                    </div>
                                    <div className="bg-surface p-6 rounded-xl border border-border">
                                        <h3 className="text-lg font-bold mb-4">Recent Announcements</h3>
                                        <div className="p-4 bg-background rounded-lg border-l-4 border-primary">
                                            <h4 className="font-bold">Welcome to the Class!</h4>
                                            <p className="text-sm text-secondary-foreground mt-1">Please read the syllabus carefully.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface p-6 rounded-xl border border-border h-fit">
                                    <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                                    <ul className="space-y-4">
                                        <li className="flex justify-between">
                                            <span className="text-secondary-foreground">Students</span>
                                            <span className="font-bold">45</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-secondary-foreground">Assignments</span>
                                            <span className="font-bold">12</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-secondary-foreground">Average Grade</span>
                                            <span className="font-bold text-green-400">88%</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                        {activeTab === 'Assignments' && <div className="p-4 text-center text-secondary-foreground">Assignments List Component will go here.</div>}
                        {activeTab === 'Students' && <div className="p-4 text-center text-secondary-foreground">Student List Component will go here.</div>}
                        {activeTab === 'Analytics' && <div className="p-4 text-center text-secondary-foreground">Analytics Component will go here.</div>}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ClassDetails;
