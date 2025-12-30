import React, { useState } from 'react';
import { Clock, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const QuizAttempt = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    return (
        <div className="h-screen bg-background flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 bg-surface border-b border-border flex justify-between items-center">
                <div>
                    <h1 className="font-bold text-lg">Mid-Term: Artificial Intelligence</h1>
                    <p className="text-xs text-secondary-foreground">Section A • 45 Questions</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 font-mono font-bold">
                        <Clock className="w-4 h-4" />
                        28:45
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Question Area */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <span className="text-sm font-bold text-primary uppercase tracking-wider">Question {currentQuestion + 1}</span>
                            <h2 className="text-2xl font-bold mt-2 leading-relaxed">
                                Which of the following algorithms is primarily used for reinforcement learning?
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {['K-Means Clustering', 'Q-Learning', 'Random Forest', 'Support Vector Machine'].map((opt, idx) => (
                                <div key={idx} className="p-4 rounded-xl border-2 border-border hover:border-primary cursor-pointer transition-all bg-surface hover:bg-background group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full border-2 border-border group-hover:border-primary flex items-center justify-center font-bold text-secondary-foreground group-hover:text-primary">
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        <span className="text-lg">{opt}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-between">
                            <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-surface text-secondary-foreground" disabled={currentQuestion === 0}>
                                <ChevronLeft className="w-4 h-4" /> Previous
                            </button>
                            <button className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-bold hover:bg-primary/90">
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <div className="w-80 bg-surface border-l border-border p-6 hidden lg:block overflow-y-auto">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Question Navigator
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                        {Array(45).fill(0).map((_, i) => (
                            <div
                                key={i}
                                className={`aspect-square rounded flex items-center justify-center text-sm font-bold cursor-pointer transition-colors ${i === currentQuestion ? 'bg-primary text-white' : i < 5 ? 'bg-green-500/20 text-green-500' : 'bg-background hover:bg-border'}`}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-border">
                        <div className="flex items-center gap-2 mb-2 text-sm">
                            <div className="w-3 h-3 rounded bg-green-500/20"></div> <span className="text-secondary-foreground">Answered</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2 text-sm">
                            <div className="w-3 h-3 rounded bg-primary"></div> <span className="text-secondary-foreground">Current</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded bg-background border border-border"></div> <span className="text-secondary-foreground">Unanswered</span>
                        </div>
                    </div>
                    <button className="w-full mt-8 bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors">Submit Quiz</button>
                </div>
            </div>
        </div>
    );
};

export default QuizAttempt;
