import React, { useState } from 'react';
import { Upload, Calendar, FileText, Brain, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateAssignment = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        marks: '',
        enableAI: false
    });
    const [files, setFiles] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFiles(prev => [...prev, ...Array.from(e.target.files)]);
        }
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">New Assignment</h1>
                    <p className="text-secondary-foreground">Create a new assignment for your students.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="px-4 py-2 text-secondary-foreground hover:bg-surface/50 rounded-lg transition-colors">Draft</button>
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg hover:shadow-primary/20">
                        Assign
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Assignment Title"
                                className="w-full bg-transparent text-2xl font-bold placeholder-secondary-foreground/50 border-none focus:ring-0 px-0"
                            />
                            <div className="h-px bg-border w-full" />
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="8"
                                placeholder="Instructions (optional)"
                                className="w-full bg-transparent text-base placeholder-secondary-foreground/50 border-none focus:ring-0 px-0 resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-surface rounded-xl border border-border p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold flex items-center">
                                <FileText className="w-5 h-5 mr-2 text-primary" />
                                Attachments
                            </h3>
                            <label className="cursor-pointer text-sm text-primary hover:underline flex items-center">
                                <Plus className="w-4 h-4 mr-1" />
                                Add File
                                <input type="file" multiple className="hidden" onChange={handleFileChange} />
                            </label>
                        </div>

                        {files.length === 0 ? (
                            <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center text-secondary-foreground">
                                <Upload className="w-8 h-8 mb-2 opacity-50" />
                                <p className="text-sm">No files attached yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <AnimatePresence>
                                    {files.map((file, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                                        >
                                            <span className="text-sm truncate">{file.name}</span>
                                            <button onClick={() => removeFile(index)} className="text-secondary-foreground hover:text-red-500">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    <div className="bg-surface rounded-xl border border-border p-5 shadow-sm space-y-5">
                        <div>
                            <label className="text-xs font-semibold uppercase text-secondary-foreground tracking-wider mb-2 block">Points</label>
                            <input
                                type="number"
                                name="marks"
                                value={formData.marks}
                                onChange={handleChange}
                                placeholder="100"
                                className="w-full bg-background border border-border rounded-lg p-2.5"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold uppercase text-secondary-foreground tracking-wider mb-2 block">Due Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground" />
                                <input
                                    type="datetime-local"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleChange}
                                    className="w-full bg-background border border-border rounded-lg p-2.5 pl-10 text-sm"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <label className="flex items-start space-x-3 cursor-pointer group">
                                <div className={`mt-0.5 w-10 h-6 rounded-full relative transition-colors ${formData.enableAI ? 'bg-primary' : 'bg-secondary'}`}>
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.enableAI ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                                <input
                                    type="checkbox"
                                    name="enableAI"
                                    checked={formData.enableAI}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                <div>
                                    <div className="flex items-center">
                                        <Brain className="w-4 h-4 mr-1.5 text-purple-400" />
                                        <span className="font-semibold text-sm group-hover:text-primary transition-colors">AI Grading</span>
                                    </div>
                                    <p className="text-xs text-secondary-foreground mt-0.5">Auto-grade this assignment.</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignment;
