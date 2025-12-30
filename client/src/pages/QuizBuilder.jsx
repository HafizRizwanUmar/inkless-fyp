import React, { useState } from 'react';
import { Plus, Trash, Check, MoveVertical } from 'lucide-react';

const QuizBuilder = () => {
    const [questions, setQuestions] = useState([
        { id: 1, text: 'What is the primary function of an activation function?', type: 'MCQ', options: ['Linearity', 'Non-linearity', 'Normalization', 'Regularization'], correct: 1 }
    ]);

    const addQuestion = () => {
        setQuestions([...questions, { id: questions.length + 1, text: '', type: 'MCQ', options: ['', '', '', ''], correct: 0 }]);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Quiz Builder</h1>
                <div className="space-x-4">
                    <button className="text-secondary-foreground hover:text-white">Cancel</button>
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/90">Save Quiz</button>
                </div>
            </div>

            <div className="space-y-6">
                {questions.map((q, idx) => (
                    <div key={q.id} className="bg-surface rounded-xl border border-border p-6 relative group">
                        <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move text-secondary-foreground opacity-50 hover:opacity-100">
                            <MoveVertical className="w-4 h-4" />
                        </div>
                        <div className="pl-8">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1 mr-4">
                                    <label className="block text-xs font-bold text-secondary-foreground uppercase mb-1">Question {idx + 1}</label>
                                    <input type="text" placeholder="Enter question text..." defaultValue={q.text} className="w-full bg-background border border-border rounded-lg p-3" />
                                </div>
                                <button className="p-2 text-secondary-foreground hover:text-red-500 bg-background rounded-lg border border-border">
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {q.options.map((opt, optIdx) => (
                                    <div key={optIdx} className="flex items-center space-x-3">
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${q.correct === optIdx ? 'border-green-500 bg-green-500/20' : 'border-border'}`}
                                            onClick={() => { /* Logic to set correct */ }}
                                        >
                                            {q.correct === optIdx && <div className="w-3 h-3 rounded-full bg-green-500" />}
                                        </div>
                                        <input
                                            type="text"
                                            placeholder={`Option ${optIdx + 1}`}
                                            defaultValue={opt}
                                            className="flex-1 bg-background border border-border rounded-lg p-2 text-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    onClick={addQuestion}
                    className="w-full py-4 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-secondary-foreground hover:border-primary hover:text-primary transition-colors font-medium"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Question
                </button>
            </div>
        </div>
    );
};

export default QuizBuilder;
