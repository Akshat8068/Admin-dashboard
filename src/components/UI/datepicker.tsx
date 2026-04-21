import * as React from 'react';
import { format, parse, isValid, setMonth, setYear, getDaysInMonth, startOfMonth, getDay } from 'date-fns';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

interface DatePickerProps {
    value?: string;
    onChange?: (val: string) => void;
    placeholder?: string;
    disabled?: boolean;
    hasError?: boolean;
}

type View = 'days' | 'months' | 'years';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export function DatePicker({ value, onChange, placeholder = 'Pick a date', disabled, hasError }: DatePickerProps) {
    const [open, setOpen] = React.useState(false);
    const [view, setView] = React.useState<View>('days');
    const [cursor, setCursor] = React.useState(() => {
        const parsed = value ? parse(value, 'yyyy-MM-dd', new Date()) : new Date();
        return isValid(parsed) ? parsed : new Date();
    });
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
                setView('days');
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const selected = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;
    const validSelected = selected && isValid(selected) ? selected : undefined;
    const displayValue = validSelected ? format(validSelected, 'dd MMM yyyy') : '';

    const cursorYear = cursor.getFullYear();
    const cursorMonth = cursor.getMonth();

    // ── Days view helpers ──────────────────────────────────────────────────────
    const firstDayOffset = getDay(startOfMonth(cursor));
    const daysInMonth = getDaysInMonth(cursor);
    const today = new Date();

    const handleDayClick = (day: number) => {
        const date = new Date(cursorYear, cursorMonth, day);
        if (date > today) return;
        onChange?.(format(date, 'yyyy-MM-dd'));
        setOpen(false);
        setView('days');
    };

    // ── Year range for year view ───────────────────────────────────────────────
    const yearStart = Math.floor(cursorYear / 12) * 12;
    const years = Array.from({ length: 12 }, (_, i) => yearStart + i);

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => { setOpen(o => !o); setView('days'); }}
                className={cn(
                    'flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50',
                    hasError ? 'border-red-400' : 'border-gray-300',
                    !displayValue && 'text-gray-400'
                )}
            >
                <span>{displayValue || placeholder}</span>
                <div className="flex items-center gap-1">
                    {displayValue && (
                        <span onClick={e => { e.stopPropagation(); onChange?.(''); }} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                            <X className="h-3.5 w-3.5" />
                        </span>
                    )}
                    <Calendar className="h-4 w-4 text-gray-400" />
                </div>
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-72 rounded-xl border border-gray-200 bg-white shadow-xl p-4 select-none">

                    {/* ── DAYS VIEW ─────────────────────────────────────────── */}
                    {view === 'days' && (
                        <>
                            <div className="flex items-center justify-between mb-3">
                                <button type="button" onClick={() => setCursor(d => setMonth(d, d.getMonth() - 1))} className="p-1 rounded hover:bg-gray-100">
                                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setView('months')}
                                    className="text-sm font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
                                >
                                    {format(cursor, 'MMMM yyyy')}
                                </button>
                                <button type="button" onClick={() => setCursor(d => setMonth(d, d.getMonth() + 1))} className="p-1 rounded hover:bg-gray-100">
                                    <ChevronRight className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 mb-1">
                                {WEEKDAYS.map(d => (
                                    <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-y-1">
                                {Array.from({ length: firstDayOffset }).map((_, i) => <div key={`e-${i}`} />)}
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                    const date = new Date(cursorYear, cursorMonth, day);
                                    const isFuture = date > today;
                                    const isSelected = validSelected &&
                                        validSelected.getDate() === day &&
                                        validSelected.getMonth() === cursorMonth &&
                                        validSelected.getFullYear() === cursorYear;
                                    const isToday = today.getDate() === day && today.getMonth() === cursorMonth && today.getFullYear() === cursorYear;

                                    return (
                                        <button
                                            key={day}
                                            type="button"
                                            disabled={isFuture}
                                            onClick={() => handleDayClick(day)}
                                            className={cn(
                                                'h-8 w-8 mx-auto rounded-full text-sm transition-colors',
                                                isSelected && 'bg-indigo-600 text-white hover:bg-indigo-700',
                                                !isSelected && isToday && 'font-bold text-indigo-600 hover:bg-indigo-50',
                                                !isSelected && !isToday && !isFuture && 'text-gray-700 hover:bg-indigo-50',
                                                isFuture && 'text-gray-300 cursor-not-allowed',
                                            )}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {/* ── MONTHS VIEW ───────────────────────────────────────── */}
                    {view === 'months' && (
                        <>
                            <div className="flex items-center justify-between mb-3">
                                <button type="button" onClick={() => setCursor(d => setYear(d, d.getFullYear() - 1))} className="p-1 rounded hover:bg-gray-100">
                                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setView('years')}
                                    className="text-sm font-semibold text-gray-800 hover:text-indigo-600 transition-colors"
                                >
                                    {cursorYear}
                                </button>
                                <button type="button" onClick={() => setCursor(d => setYear(d, d.getFullYear() + 1))} className="p-1 rounded hover:bg-gray-100">
                                    <ChevronRight className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {MONTHS.map((m, i) => {
                                    const isSelected = validSelected && validSelected.getMonth() === i && validSelected.getFullYear() === cursorYear;
                                    const isCurrent = cursorMonth === i;
                                    return (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => { setCursor(d => setMonth(d, i)); setView('days'); }}
                                            className={cn(
                                                'py-2 rounded-lg text-sm transition-colors',
                                                isSelected && 'bg-indigo-600 text-white',
                                                !isSelected && isCurrent && 'font-bold text-indigo-600 hover:bg-indigo-50',
                                                !isSelected && !isCurrent && 'text-gray-700 hover:bg-indigo-50',
                                            )}
                                        >
                                            {m}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {/* ── YEARS VIEW ────────────────────────────────────────── */}
                    {view === 'years' && (
                        <>
                            <div className="flex items-center justify-between mb-3">
                                <button type="button" onClick={() => setCursor(d => setYear(d, d.getFullYear() - 12))} className="p-1 rounded hover:bg-gray-100">
                                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                                </button>
                                <span className="text-sm font-semibold text-gray-800">{yearStart} – {yearStart + 11}</span>
                                <button type="button" onClick={() => setCursor(d => setYear(d, d.getFullYear() + 12))} className="p-1 rounded hover:bg-gray-100">
                                    <ChevronRight className="h-4 w-4 text-gray-600" />
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {years.map(y => {
                                    const isSelected = validSelected && validSelected.getFullYear() === y;
                                    const isCurrent = cursorYear === y;
                                    return (
                                        <button
                                            key={y}
                                            type="button"
                                            onClick={() => { setCursor(d => setYear(d, y)); setView('months'); }}
                                            className={cn(
                                                'py-2 rounded-lg text-sm transition-colors',
                                                isSelected && 'bg-indigo-600 text-white',
                                                !isSelected && isCurrent && 'font-bold text-indigo-600 hover:bg-indigo-50',
                                                !isSelected && !isCurrent && 'text-gray-700 hover:bg-indigo-50',
                                            )}
                                        >
                                            {y}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
