import React, { useState } from 'react';
import { FileText, Search, Download, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const SubmissionList = ({ embedded = false }) => {
    const [filter, setFilter] = useState('All');

    const submissions = [
        { id: 1, name: 'Alice Johnson', file: 'neural_net_impl.py', similarity: '12%', status: 'Graded', marks: '88/100', date: 'Oct 28, 10:30 PM' },
        { id: 2, name: 'Bob Smith', file: 'project_final.zip', similarity: '45%', status: 'Flagged', marks: '-', date: 'Oct 28, 11:15 PM' },
        { id: 3, name: 'Charlie Davis', file: 'mlp_scratch.ipynb', similarity: '5%', status: 'Pending', marks: '-', date: 'Oct 27, 4:20 PM' },
        { id: 4, name: 'Diana Prince', file: 'assignment_1.pdf', similarity: '0%', status: 'Ungraded', marks: '-', date: 'Oct 28, 9:00 AM' },
        { id: 5, name: 'Evan Wright', file: 'main.py', similarity: '8%', status: 'Graded', marks: '92/100', date: 'Oct 26, 2:45 PM' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Graded': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'Flagged': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            default: return 'bg-secondary/10 text-secondary-foreground border-border';
        }
    };

    return (
        <div className="space-y-6">
            {!embedded && (
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Submissions</h1>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium shadow-lg shadow-primary/20">
                            Auto-Grade All
                        </button>
                        <Link to="/download-reports" className="px-4 py-2 bg-surface border border-border rounded-lg hover:bg-white/5 flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Reports
                        </Link>
                    </div>
                </div>
            )}

            <div className={`bg-surface rounded-xl border border-border overflow-hidden ${embedded ? 'shadow-none border-0 bg-transparent' : 'shadow-sm'}`}>
                {/* Toolbar */}
                <div className={`p-4 flex flex-col sm:flex-row justify-between items-center gap-4 ${embedded ? 'px-0 pt-0' : 'border-b border-border'}`}>
                    <div className="relative flex-1 w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-foreground" />
                        <input
                            type="text"
                            placeholder="Search student or file..."
                            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                        />
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
                        {['All', 'Graded', 'Ungraded', 'Flagged'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filter === f
                                        ? 'bg-primary text-white'
                                        : 'bg-background border border-border text-secondary-foreground hover:border-primary/50'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className={`text-xs uppercase text-secondary-foreground font-semibold ${embedded ? 'bg-surface/50 rounded-lg' : 'bg-background/50'}`}>
                            <tr>
                                <th className="px-6 py-4 rounded-l-lg">Student</th>
                                <th className="px-6 py-4">Submission</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Turned In</th>
                                <th className="px-6 py-4">Marks</th>
                                <th className="px-6 py-4 text-right rounded-r-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {submissions.map((sub) => (
                                <tr key={sub.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                                {sub.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-medium text-white">{sub.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-blue-400" />
                                            <span className="text-sm text-secondary-foreground hover:text-primary cursor-pointer hover:underline transition-colors">{sub.file}</span>
                                        </div>
                                        {/* Similarity Bar */}
                                        <div className="mt-1 flex items-center gap-2 w-24">
                                            <div className="flex-1 h-1 bg-background rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${parseInt(sub.similarity) > 20 ? 'bg-red-500' : 'bg-green-500'}`}
                                                    style={{ width: sub.similarity }}
                                                />
                                            </div>
                                            <span className={`text-[10px] ${parseInt(sub.similarity) > 20 ? 'text-red-400' : 'text-green-400'}`}>{sub.similarity}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(sub.status)}`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-secondary-foreground">
                                        {sub.date}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-white">
                                        {sub.marks}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link to="/ai-grading" className="px-3 py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg text-xs font-medium hover:bg-purple-500/20 transition-colors">
                                                AI Grade
                                            </Link>
                                            <Link to="/manual-marking" className="px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-medium hover:bg-blue-500/20 transition-colors">
                                                Manual
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubmissionList;
