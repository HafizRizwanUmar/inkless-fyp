import React, { useState } from 'react';
import { Clock, Download, FileText, ChevronRight, Edit, Users, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SubmissionList from './SubmissionList'; // Assuming we can use this component

const AssignmentDetails = () => {
    const [activeTab, setActiveTab] = useState('instructions');

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-surface border-b border-border pb-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2 text-primary text-sm font-medium mb-2">
                        <Link to="/teacher/dashboard" className="hover:underline">CS101 - Intro to AI</Link>
                        <ChevronRight className="w-4 h-4 text-secondary-foreground" />
                        <span className="text-secondary-foreground">Assignments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-secondary-foreground hover:text-white">
                            <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-secondary-foreground hover:text-white">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Neural Networks Implementation</h1>
                <div className="flex items-center space-x-4 text-sm text-secondary-foreground">
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> 42 Students</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Due Oct 28, 11:59 PM</span>
                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium border border-primary/20">100 Points</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border flex space-x-8">
                {['instructions', 'student-work'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium capitalize transition-all relative ${activeTab === tab ? 'text-primary' : 'text-secondary-foreground hover:text-white'
                            }`}
                    >
                        {tab.replace('-', ' ')}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'instructions' ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="space-y-4">
                                    <div className="prose prose-invert max-w-none text-secondary-foreground">
                                        <p>
                                            Implement a Multi-Layer Perceptron (MLP) from scratch using Python and NumPy.
                                            Your implementation should demonstrate backpropagation and training on the MNIST dataset.
                                        </p>
                                        <h3 className="text-white font-bold mt-4">Requirements:</h3>
                                        <ul className="list-disc pl-5 space-y-2 mt-2">
                                            <li>Use ReLu activation for hidden layers.</li>
                                            <li>Use Softmax for the output layer.</li>
                                            <li>Achieve at least 95% accuracy on the test set.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border">
                                    <h3 className="text-sm font-bold uppercase text-secondary-foreground mb-4">Attachments</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-red-500/20 rounded text-red-400">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium group-hover:text-primary transition-colors">Assignment_Guidelines.pdf</p>
                                                    <p className="text-xs text-secondary-foreground">PDF • 2.4 MB</p>
                                                </div>
                                            </div>
                                            <Download className="w-4 h-4 text-secondary-foreground hover:text-white" />
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-yellow-500/20 rounded text-yellow-400">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium group-hover:text-primary transition-colors">Dataset_Link.txt</p>
                                                    <p className="text-xs text-secondary-foreground">Text File</p>
                                                </div>
                                            </div>
                                            <Download className="w-4 h-4 text-secondary-foreground hover:text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Stats */}
                            <div className="space-y-6">
                                <div className="bg-surface rounded-xl border border-border p-6">
                                    <h3 className="text-sm font-bold uppercase text-secondary-foreground mb-4">Submission Summary</h3>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="p-4 bg-background rounded-lg border border-border">
                                            <div className="text-2xl font-bold text-white">38</div>
                                            <div className="text-xs text-secondary-foreground">Turned In</div>
                                        </div>
                                        <div className="p-4 bg-background rounded-lg border border-border">
                                            <div className="text-2xl font-bold text-white">4</div>
                                            <div className="text-xs text-secondary-foreground">Assigned</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-border">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-secondary-foreground">Graded</span>
                                            <span className="font-medium text-green-400">22 / 42</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-1.5 mt-2">
                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '52%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            {/* Reuse SubmissionList but formatted for this view */}
                            <SubmissionList embedded={true} />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default AssignmentDetails;
