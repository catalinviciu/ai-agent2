import { useState, useMemo } from 'react';
import { Check, X, Camera } from 'lucide-react';

interface FormItem {
    Name: string;
    Comment: string;
    RequireValue: boolean;
    ValueType: string;
    Tags: string[];
    Position: number;
}

interface FormData {
    Name: string;
    Comment: string;
    templateItems: FormItem[];
}

interface FormPreviewProps {
    data: FormData;
    layoutMode: 'defects' | 'all';
}

export function FormPreview({ data, layoutMode }: FormPreviewProps) {
    // Group items by their first tag (or "Other")
    const groupedItems = useMemo(() => {
        const groups: Record<string, FormItem[]> = {};

        // Define explicit order for known categories
        const categoryOrder = [
            "Walkaround Photos",
            "Lighting",
            "Exterior",
            "Tires",
            "Engine Compartment",
            "Maintenance",
            "Steering",
            "Braking",
            "Interior"
        ];

        data.templateItems.forEach(item => {
            const tag = item.Tags[0] || "Other";
            if (!groups[tag]) {
                groups[tag] = [];
            }
            groups[tag].push(item);
        });

        // Sort categories based on predefined order, then alphabetical for others
        return Object.entries(groups).sort(([a], [b]) => {
            const indexA = categoryOrder.indexOf(a);
            const indexB = categoryOrder.indexOf(b);

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return a.localeCompare(b);
        });
    }, [data]);



    return (
        <div className="flex flex-col h-full bg-gray-50 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
            {/* Mobile Viewport Container */}
            <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col relative">
                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-4 pb-24">
                        {/* Form Name & Trip Selection (Static Preview) */}
                        <div className="mb-6">
                            <div className="mb-4 pb-4 border-b border-gray-100">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Form Name</span>
                                <span className="text-sm font-bold text-gray-900">{data.Name}</span>
                            </div>

                            <div className="flex gap-6 opacity-60 pointer-events-none grayscale-[0.5]">
                                <div className="flex items-center gap-3 text-gray-900">
                                    <div className="w-5 h-5 rounded-full border-2 border-orange-600 flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 bg-orange-600 rounded-full" />
                                    </div>
                                    <span className="font-medium text-sm">Pre-trip</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-900">
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                    </div>
                                    <span className="font-medium text-sm">Post-trip</span>
                                </div>
                            </div>
                        </div>

                        {/* Title & Instructions */}
                        <div className="mb-4">
                            <h1 className="text-xl font-bold text-gray-900 mb-1">Start inspection</h1>
                            <p className="text-gray-500 text-xs leading-relaxed">
                                {layoutMode === 'defects'
                                    ? "Check items that have defects. Unchecked items are OK."
                                    : "Mark each item as pass or fail, then select Next."}
                            </p>
                        </div>

                        {/* Inspection Items */}
                        <div className="space-y-4">
                            {groupedItems.map(([category, items]) => (
                                <div key={category}>
                                    <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider text-gray-500">
                                        {category}
                                    </h4>

                                    {/* Use grid layout for photos, single column for others */}
                                    <div className={items.some(item => item.ValueType === 'PHOTO')
                                        ? "grid grid-cols-2 gap-3"
                                        : "grid grid-cols-1 gap-x-6 gap-y-0"}>
                                        {items.map((item) => (
                                            <MobileItemCard key={item.Position} item={item} mode={layoutMode} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MobileItemCard({ item, mode }: { item: FormItem; mode: 'defects' | 'all' }) {
    const [status, setStatus] = useState<'pass' | 'fail' | null>(null);
    const [checked, setChecked] = useState(false);

    // Special handling for Photos
    if (item.ValueType === 'PHOTO') {
        return (
            <div className="py-2">
                <div className="flex items-center gap-1 mb-2">
                    <span className="text-gray-900 font-medium text-sm">{item.Name}</span>
                    {item.RequireValue && <span className="text-blue-600 text-xs font-bold">*</span>}
                </div>
                <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 text-gray-500 transition-all cursor-default">
                    <Camera className="w-4 h-4" />
                    <span className="text-xs font-bold">Take photo</span>
                </button>
            </div>
        );
    }

    // Special handling for Text/Comments
    if (item.ValueType === 'TEXT') {
        return (
            <div className="py-3 border-b border-gray-200">
                <span className="text-gray-900 font-medium text-sm block mb-2">{item.Name}</span>
                <textarea
                    placeholder="Enter comments..."
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-0 outline-none min-h-[80px] resize-none bg-gray-50"
                />
            </div>
        );
    }

    // Standard Checkbox Items (Defects Mode)
    if (mode === 'defects') {
        return (
            <div
                onClick={() => setChecked(!checked)}
                className="flex items-center gap-3 py-3 border-b border-gray-200 cursor-pointer group"
            >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all shrink-0 ${checked
                    ? 'bg-red-50 border-red-500 text-red-600'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
                    }`}>
                    {checked && <X className="w-4 h-4" />}
                </div>
                <span className="text-gray-900 font-medium text-sm">{item.Name}</span>
            </div>
        );
    }

    // Standard Checkbox Items (Submit All Mode)
    return (
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex-1 min-w-0 mr-4 flex items-center gap-1">
                <span className="text-gray-900 font-medium text-sm truncate">{item.Name}</span>
                {item.RequireValue && <span className="text-blue-600 text-xs font-bold">*</span>}
            </div>

            <div className="flex gap-2 shrink-0">
                <button
                    onClick={() => setStatus('pass')}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${status === 'pass'
                        ? 'bg-green-50 border-green-500 text-green-600'
                        : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    <Check className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setStatus('fail')}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${status === 'fail'
                        ? 'bg-red-50 border-red-500 text-red-600'
                        : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
