import { useState, useEffect } from 'react';
import { X, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';

interface AIAgentProps {
    isOpen: boolean;
    onClose: () => void;
}

type AgentState = 'idle' | 'welcome' | 'tasks';

export function AIAgent({ isOpen, onClose }: AIAgentProps) {
    const [state, setState] = useState<AgentState>('idle');
    const [messages, setMessages] = useState<{ type: 'agent' | 'user'; text: string; options?: string[] }[]>([]);

    useEffect(() => {
        if (isOpen && state === 'idle') {
            setState('welcome');
            // Simulate delay for natural feel
            setTimeout(() => {
                setMessages([
                    {
                        type: 'agent',
                        text: "Hi! I'm your Reveal Intelligence assistant. I can help you set up your DVIR system quickly and correctly."
                    }
                ]);
                setTimeout(() => {
                    setState('tasks');
                }, 1000);
            }, 500);
        } else if (!isOpen) {
            setState('idle');
            setMessages([]);
        }
    }, [isOpen]);

    const handleTaskSelect = (task: string) => {
        // For now, we just log it or show a placeholder. 
        // In the full flow, this would trigger Activity 2.
        setMessages(prev => [
            ...prev,
            { type: 'user', text: task },
            { type: 'agent', text: "Great choice! Let's get started with that. (Prototype ends here for Activity 1)" }
        ]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl border-l border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out transform translate-x-0">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">Reveal Intelligence</span>
                </div>
                <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[85%] p-3 rounded-lg shadow-sm ${msg.type === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                }`}
                        >
                            <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}

                {state === 'tasks' && (
                    <div className="space-y-2 mt-4 animate-fade-in">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider ml-1">Suggested Tasks</p>
                        <button
                            onClick={() => handleTaskSelect("Create an inspection form")}
                            className="w-full text-left p-3 bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md rounded-lg transition-all flex items-center justify-between group"
                        >
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Create an inspection form</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        </button>
                        <button
                            onClick={() => handleTaskSelect("Invite and train drivers")}
                            className="w-full text-left p-3 bg-white border border-blue-100 hover:border-blue-300 hover:shadow-md rounded-lg transition-all flex items-center justify-between group"
                        >
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Invite and train drivers</span>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                        </button>
                    </div>
                )}
            </div>

            {/* Input Area (Placeholder) */}
            <div className="p-4 border-t border-gray-100 bg-white">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600">
                        <MessageSquare className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
