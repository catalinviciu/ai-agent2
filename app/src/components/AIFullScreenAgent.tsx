import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Loader2, ChevronRight, Sparkles, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { FormPreview } from './FormPreview';
import { MOCK_FORM_DATA } from '../data/mockFormData';

interface AIFullScreenAgentProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'initial' | 'method-selection' | 'ai-questions' | 'upload' | 'generating' | 'preview' | 'publishing' | 'success';

interface Message {
    id: string;
    type: 'ai' | 'user';
    content: string;
    timestamp: Date;
}

export function AIFullScreenAgent({ isOpen, onClose }: AIFullScreenAgentProps) {
    const [step, setStep] = useState<Step>('initial');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Interview State
    const [interviewStep, setInterviewStep] = useState<0 | 1 | 2>(0);
    const [answers, setAnswers] = useState({
        vehicleModel: '',
        detailLevel: null as 'basic' | 'detailed' | null,
        includeMaintenance: null as boolean | null
    });

    // Preview State
    const [layoutMode, setLayoutMode] = useState<'defects' | 'all'>('defects');

    // Helper to add messages
    const addMessage = (type: 'ai' | 'user', content: string) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), type, content, timestamp: new Date() }]);
    };

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, step, interviewStep]);

    // Initial greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                addMessage('ai', "Hi! I'm your DVIR setup assistant. I'll help you create quickly an inspection form for your fleet.");
                setTimeout(() => {
                    addMessage('ai', "I can create a form for a specific vehicle model or for a category of vehicles. Enter the vehicle model or select from the suggested categories.");
                    setStep('ai-questions');
                }, 800);
            }, 500);
        }
    }, [isOpen, messages]);



    const handleManualVehicleSubmit = () => {
        if (answers.vehicleModel.trim()) {
            addMessage('user', answers.vehicleModel);
            setTimeout(() => {
                addMessage('ai', `Perfect! Now, how detailed do you want me to create your inspection form?`);
                setInterviewStep(1);
            }, 500);
        }
    };

    const handleVehicleSelect = (type: string) => {
        setAnswers(prev => ({ ...prev, vehicleModel: type }));
        addMessage('user', type);
        setTimeout(() => {
            addMessage('ai', `Perfect! Now, how detailed do you want me to create your inspection form?`);
            setInterviewStep(1);
        }, 500);
    };

    const handleDetailSelect = (level: 'basic' | 'detailed') => {
        setAnswers(prev => ({ ...prev, detailLevel: level }));
        addMessage('user', level === 'basic' ? 'Minimum compliance' : 'Extended compliance');
        setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                addMessage('ai', `Do you want me to include inspection items to check vehicle maintenance, to monitor wear and tear?\nLike oil levels, brake pads usage, etc.`);
                setInterviewStep(2);
            }, 800);
        }, 500);
    };

    const handleMaintenanceSelect = (include: boolean) => {
        setAnswers(prev => ({ ...prev, includeMaintenance: include }));
        addMessage('user', include ? 'Yes, I want my inspection to check also maintanance items' : 'No, I\'m fine');
        setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                addMessage('ai', "I have all the information I need. Generating your form now!");
                setStep('generating');
                setTimeout(() => {
                    setStep('preview');
                }, 3000); // Simulate generation time
            }, 1000);
        }, 500);
    };

    const handlePublish = () => {
        setStep('publishing');
        setTimeout(() => {
            setStep('success');
        }, 2000); // Simulate publishing time
    };

    if (!isOpen) return null;

    // PREVIEW MODE: Full Screen Layout (Preserved)
    if (step === 'preview' || step === 'publishing' || step === 'success') {
        return (
            <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in duration-300">
                {/* Header */}
                <header className="h-16 border-b border-gray-200 flex items-center px-6 bg-white shrink-0 gap-4">
                    <button
                        onClick={() => setStep('ai-questions')} // Go back to chat
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h2 className="font-bold text-xl text-gray-900">Inspection forms</h2>
                </header>

                <div className="flex-1 bg-gray-50/50 overflow-hidden relative">
                    {step === 'preview' ? (
                        <div className="h-full flex flex-col items-center p-2 md:p-4 gap-4 animate-in slide-in-from-bottom-4 duration-700 overflow-hidden">

                            {/* Floating Menu (Layout Selection) */}
                            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-gray-200 px-4 py-3 flex flex-col md:flex-row items-center justify-start shrink-0 z-20 gap-3 md:gap-6">
                                <span className="font-bold text-gray-900 text-xs md:text-sm text-center md:text-left">
                                    Choose the layout of the driver’s inspection form:
                                </span>

                                <div className="bg-gray-100 p-1 rounded-lg flex items-center gap-1 shrink-0">
                                    <button
                                        onClick={() => setLayoutMode('defects')}
                                        className={`px-4 py-1.5 rounded-md transition-all flex flex-col items-center gap-0.5 ${layoutMode === 'defects'
                                            ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                            }`}
                                    >
                                        <span className="text-xs font-bold">Defects Only</span>
                                        <span className="text-[9px] font-medium opacity-70 whitespace-nowrap">Faster - select issues only</span>
                                    </button>
                                    <button
                                        onClick={() => setLayoutMode('all')}
                                        className={`px-4 py-1.5 rounded-md transition-all flex flex-col items-center gap-0.5 ${layoutMode === 'all'
                                            ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
                                            }`}
                                    >
                                        <span className="text-xs font-bold">Submit All</span>
                                        <span className="text-[9px] font-medium opacity-70 whitespace-nowrap">Thorough - check each item</span>
                                    </button>
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 w-full max-w-5xl flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-0">
                                {/* Left Column: Form Preview */}
                                <div className="flex-1 h-full shadow-xl rounded-2xl overflow-hidden border border-gray-200 bg-white flex flex-col">
                                    <FormPreview data={MOCK_FORM_DATA} layoutMode={layoutMode} />
                                </div>

                                {/* Right Column: Controls */}
                                <div className="w-full lg:w-80 flex flex-col shrink-0 pt-0">
                                    <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-lg space-y-4 md:space-y-6 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-pink-600"></div>

                                        <div className="flex flex-row md:flex-col justify-between items-start md:items-stretch gap-4">
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg md:text-xl mb-1">Review Form</h3>
                                                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                                    Inspection form generated based on your selection.
                                                </p>
                                            </div>

                                            {/* Generation Stats & Params - Compact on mobile */}
                                            <div className="bg-gray-50 rounded-xl p-3 md:p-4 space-y-2 md:space-y-3 border border-gray-100 w-full md:w-auto text-xs md:text-sm">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-500">Items</span>
                                                    <span className="font-bold text-gray-900">70</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-500">Groups</span>
                                                    <span className="font-bold text-gray-900">10</span>
                                                </div>
                                                <div className="h-px bg-gray-200 my-2 hidden md:block"></div>
                                                <div className="space-y-1 md:space-y-2 hidden md:block">
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                                        <span className="font-medium">{answers.vehicleModel || 'Ford Ranger'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                                        <span className="font-medium">{answers.detailLevel === 'detailed' ? 'Detailed Inspection' : 'Basic Inspection'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                                        <span className="font-medium">{answers.includeMaintenance ? 'Maintenance Included' : 'Safety Only'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:block">Feedback</label>
                                            <div className="flex gap-3">
                                                <button className="flex-1 py-2 md:py-3 px-3 rounded-xl border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all flex flex-row md:flex-col items-center justify-center gap-2 md:gap-1 group">
                                                    <ThumbsDown className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                                                    <span className="text-[10px] font-bold">Needs Work</span>
                                                </button>
                                                <button className="flex-1 py-2 md:py-3 px-3 rounded-xl border border-gray-200 hover:border-green-200 hover:bg-green-50 text-gray-400 hover:text-green-600 transition-all flex flex-row md:flex-col items-center justify-center gap-2 md:gap-1 group">
                                                    <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                                                    <span className="text-[10px] font-bold">Looks Good</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2 flex flex-row md:flex-col gap-3 md:gap-0">
                                            <button className="flex-1 md:w-full py-3 px-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:bg-orange-50 text-gray-700 font-bold text-sm transition-all flex items-center justify-center md:justify-between group">
                                                <span>Edit Manually</span>
                                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors hidden md:block" />
                                            </button>

                                            <button
                                                onClick={handlePublish}
                                                className="flex-[2] md:w-full py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center md:justify-between group"
                                            >
                                                <span>Publish Form</span>
                                                <div className="w-6 h-6 bg-white/20 rounded-full hidden md:flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <ChevronRight className="w-3 h-3" />
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : step === 'publishing' ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-500">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Publishing your form...</h3>
                            <p className="text-gray-500">Making it available to your drivers.</p>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">You're all set!</h3>
                            <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
                                Your inspection form has been published. Drivers can now access it from their mobile app.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // CHAT MODE: Single Column Layout
    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in fade-in duration-300">
            {/* Header */}
            <header className="h-16 border-b border-gray-200 flex items-center px-6 bg-white shrink-0 gap-4">
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-900 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="font-bold text-xl text-gray-900">Inspections</h2>
            </header>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">

                    {/* Messages */}
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            {msg.type === 'ai' ? (
                                <div className="max-w-[85%] text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                                    {msg.content}
                                </div>
                            ) : (
                                <div className="bg-gray-100 px-6 py-3 rounded-2xl rounded-tr-sm text-gray-900 font-medium text-sm mt-2">
                                    {msg.content}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex items-center gap-2 text-gray-400 animate-in fade-in duration-300">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm">Thinking...</span>
                        </div>
                    )}

                    {/* Current Interaction Area */}
                    {!isTyping && (
                        <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">



                            {/* 2. AI Questions */}
                            {step === 'ai-questions' && (
                                <div className="w-full">
                                    {/* Vehicle Selection */}
                                    {interviewStep === 0 && (
                                        <div className="space-y-6">
                                            <div className="relative max-w-xl">
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 p-2">
                                                    <Sparkles className="w-5 h-5 text-orange-500" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Enter a specific model or category of vehicles"
                                                    className="w-full pl-10 pr-12 py-4 text-lg border-2 border-orange-200 rounded-full focus:border-orange-500 focus:ring-0 outline-none transition-all shadow-sm text-gray-900 placeholder:text-gray-400"
                                                    value={answers.vehicleModel}
                                                    onChange={(e) => setAnswers(prev => ({ ...prev, vehicleModel: e.target.value }))}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleManualVehicleSubmit()}
                                                    autoFocus
                                                />
                                                {answers.vehicleModel && (
                                                    <button
                                                        onClick={handleManualVehicleSubmit}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                                    >
                                                        <ChevronRight className="w-5 h-5 text-gray-600" />
                                                    </button>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Suggested categories</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Passenger car', 'Bus', 'Truck', 'Trailer', 'Excavator', 'Backhoe', 'Crane', 'Forklift', 'Loader', 'Tanker truck', 'Refrigerated truck/trailer', 'Hazmat vehicle', 'Flatbed trailer'].map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() => handleVehicleSelect(type)}
                                                            className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-gray-900 hover:bg-gray-50 transition-all bg-white"
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>


                                        </div>
                                    )}

                                    {/* Detail Level */}
                                    {interviewStep === 1 && (
                                        <div className="space-y-4 max-w-xl">
                                            <button
                                                onClick={() => handleDetailSelect('basic')}
                                                className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-all group flex items-start gap-4"
                                            >
                                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                                    <div className="w-3 h-3 bg-gray-300 rotate-45"></div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">Minimum compliance</div>
                                                    <div className="text-sm text-gray-500 mt-1">Inspection items needed for DVIR with basic breakdown for each inspection item. You can expect around 30 items depending of the vehicle type.</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => handleDetailSelect('detailed')}
                                                className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-all group flex items-start gap-4"
                                            >
                                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                                    <div className="w-3 h-3 bg-gray-300 rotate-45"></div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900">Extended checklist</div>
                                                    <div className="text-sm text-gray-500 mt-1">More detailed checklist, including walk-around photos and driver comments. You can expect around 50-70 items depending of the vehicle type.</div>
                                                </div>
                                            </button>
                                        </div>
                                    )}

                                    {/* Maintenance */}
                                    {interviewStep === 2 && (
                                        <div className="space-y-3 max-w-xl">
                                            <button
                                                onClick={() => handleMaintenanceSelect(true)}
                                                className="w-full py-4 px-6 bg-gray-50 hover:bg-gray-100 rounded-xl text-left font-bold text-gray-900 text-sm transition-colors"
                                            >
                                                Yes, I want my inspection to check also maintanance items
                                            </button>
                                            <button
                                                onClick={() => handleMaintenanceSelect(false)}
                                                className="w-full py-4 px-6 bg-gray-50 hover:bg-gray-100 rounded-xl text-left font-bold text-gray-900 text-sm transition-colors"
                                            >
                                                No, I'm fine
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* 3. Generating State */}
                            {step === 'generating' && (
                                <div className="flex items-center gap-3 text-orange-600 font-medium animate-pulse">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Generating your form...</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </div>
        </div>
    );
}
