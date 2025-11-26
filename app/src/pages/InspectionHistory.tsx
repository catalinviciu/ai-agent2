import { Bell, HelpCircle, MapPin, Calendar, FileText, Play, Video, Map, AlertTriangle, BarChart2, Wrench, Sparkles, ArrowRight } from 'lucide-react';

interface InspectionHistoryProps {
    onSetupClick: () => void;
}

export function InspectionHistory({ onSetupClick }: InspectionHistoryProps) {
    return (
        <div className="min-h-screen bg-white font-['Inter',sans-serif] text-gray-900 flex flex-col">
            {/* Top Navigation */}
            <header className="bg-white border-b border-gray-200 h-[70px] flex items-center px-6 justify-between shrink-0 sticky top-0 z-20">
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <div className="flex flex-col leading-none">
                        <div className="flex items-center gap-0.5 mb-0.5">
                            <span className="text-[10px] font-bold text-black tracking-wide">verizon</span>
                            <span className="text-[10px] font-normal text-black tracking-wide">connect</span>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight text-black">Reveal</span>
                    </div>

                    {/* Nav Items */}
                    <nav className="hidden xl:flex items-center gap-0 h-full ml-8">
                        {[
                            { icon: MapPin, label: "Live map" },
                            { icon: Calendar, label: "Scheduler" },
                            { icon: FileText, label: "Reports" },
                            { icon: Play, label: "Replay" },
                            { icon: Video, label: "Video" },
                            { icon: Map, label: "Places" },
                            { icon: AlertTriangle, label: "Alerts" },
                            { icon: BarChart2, label: "Dashboard" },
                            { icon: Wrench, label: "Maintenance", active: true },
                        ].map((item) => (
                            <a
                                key={item.label}
                                href="#"
                                className={`h-full flex flex-col items-center justify-center px-4 min-w-[70px] gap-1.5 relative group ${item.active ? 'text-black' : 'text-gray-600 hover:text-black'}`}
                            >
                                {item.active && <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#d32f2f]"></div>}
                                <item.icon className={`w-5 h-5 ${item.active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                                <span className={`text-[11px] font-bold ${item.active ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>{item.label}</span>
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-5">
                    <button className="text-gray-600 hover:text-black"><Bell className="w-5 h-5" /></button>
                    <div className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer gap-0.5">
                        <HelpCircle className="w-5 h-5" />
                        <span className="text-[10px] font-medium">Help</span>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer">LS</div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-[220px] bg-[#f8f9fa] border-r border-gray-200 py-4 shrink-0 hidden lg:block font-['Inter',sans-serif]">
                    <nav className="flex flex-col w-full">
                        {/* Active Item */}
                        <a href="#" className="px-6 py-3 text-[13px] font-bold text-gray-900 bg-white border-l-[3px] border-[#d32f2f] flex items-center shadow-sm">
                            Inspection history
                        </a>

                        {/* Other Items */}
                        {[
                            "Inspection forms",
                            "Reminders",
                            "History",
                            "Manage Service Plan",
                            "Fuel Purchases"
                        ].map((item) => (
                            <a key={item} href="#" className="px-6 py-3 text-[13px] text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors font-medium border-l-[3px] border-transparent">
                                {item}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8 flex flex-col">
                    <div className="w-full">

                        {/* Top Section: Context */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-3">
                                {/* Alert Badge */}
                                <div className="inline-flex items-center gap-2 bg-[#ffebe6] border border-[#ffccc7] text-[#cf1322] px-2 py-0.5 rounded-full text-[10px] font-bold">
                                    <div className="bg-[#cf1322] text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px] font-bold">!</div>
                                    Action Required
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                    Set up your DVIR Account
                                </h1>
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed max-w-4xl">
                                Your DVIR account is not setup yet. The first step is to create an Inspection Form. You can choose to have our AI generate one for you, or configure it manually.
                            </p>
                        </div>

                        {/* Options Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch max-w-4xl">
                            {/* Option 1: AI Hero Card */}
                            <div
                                className="relative group cursor-pointer"
                                onClick={onSetupClick}
                            >
                                {/* Glow Effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                                <div className="relative bg-white border border-gray-200 rounded-xl p-5 hover:border-orange-200 transition-all duration-300 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="bg-orange-50 p-1.5 rounded-lg group-hover:bg-orange-100 transition-colors">
                                            <Sparkles className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <span className="bg-gray-100 text-gray-600 text-[9px] font-semibold px-2 py-0.5 rounded-full">Recommended</span>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="font-bold text-base text-gray-900 mb-1">AI-Guided Setup</h3>
                                        <p className="text-gray-500 text-[13px] leading-snug">
                                            Answer a few simple questions and let our AI build your inspection forms automatically.
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">
                                            Custom form generated in 2 minutes
                                        </span>
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-100">
                                            DVIR compliance ready
                                        </span>
                                    </div>

                                    <div className="mt-auto">
                                        <button className="w-full bg-gray-900 hover:bg-black text-white px-3 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-colors">
                                            Start AI Setup
                                            <ArrowRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Option 2: Manual Setup Card */}
                            <div className="group cursor-pointer bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-md transition-all duration-300 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="bg-gray-50 p-1.5 rounded-lg group-hover:bg-gray-100 transition-colors">
                                        <FileText className="w-4 h-4 text-gray-600" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="font-bold text-base text-gray-900 mb-1">Manual Setup</h3>
                                    <p className="text-gray-500 text-[13px] leading-snug">
                                        Build your inspection forms from scratch. Best for users who know exactly what they need.
                                    </p>
                                </div>

                                <div className="mt-auto">
                                    <button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-2 transition-colors">
                                        Configure Manually
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
