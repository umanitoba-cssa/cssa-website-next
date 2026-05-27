import React from 'react';

interface YearSelectorProps {
    selectedYear: number;
    setSelectedYear: (year: number) => void;
    years: number[];
}

interface FooterButtonsProps {
    handleGoToToday: () => void;
    handleConfirm: () => void;
}

interface MonthGridProps {
    MONTHS: string[];
    selectedMonth: number;
    setSelectedMonth: (month: number) => void;
    thisMonth: number;
    thisYear: number;
    selectedYear: number;
}

export const YearSelector = React.forwardRef<HTMLSelectElement, YearSelectorProps>(
    function YearSelector(props: YearSelectorProps, ref: React.ForwardedRef<HTMLSelectElement>) {
        const { selectedYear, setSelectedYear, years } = props;
        return (
            <div className="mb-6">
                <label
                    htmlFor="year"
                    className="block text-sm text-gray-300 mb-2 font-medium">
                    Year
                </label>
                <div className="relative">
                    <select
                        ref={ref}
                        id="year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                const selectElement = e.currentTarget as HTMLSelectElement;
                                if ('showPicker' in selectElement) {
                                    (selectElement as any).showPicker();
                                }
                            }
                        }}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {years.map((year) => (
                            <option
                                key={year}
                                value={year}
                                className="bg-gray-800">
                                {year}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        );
    },
);

YearSelector.displayName = 'YearSelector';

export const FooterButtons = ({ handleGoToToday, handleConfirm }: FooterButtonsProps) => {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <button
                onClick={handleGoToToday}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600">
                Go to Today
            </button>
            <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors">
                Confirm
            </button>
        </div>
    );
};

export const MonthGrid = ({
    MONTHS,
    selectedMonth,
    setSelectedMonth,
    thisMonth,
    thisYear,
    selectedYear,
}: MonthGridProps) => {
    return (
        <div className="mb-6">
            <span
                id="month-label"
                className="block text-sm text-gray-300 mb-2 font-medium">
                Month
            </span>

            <div
                role="group"
                aria-labelledby="month-label"
                className="grid grid-cols-3 gap-2">
                {MONTHS.map((month, idx) => {
                    const isSelected = idx === selectedMonth;
                    const isCurrent = idx === thisMonth && selectedYear === thisYear;

                    return (
                        <button
                            key={month}
                            type="button"
                            onClick={() => setSelectedMonth(idx)}
                            aria-pressed={isSelected}
                            className={`
                                px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                ${
                                    isSelected
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                }
                                ${isCurrent && !isSelected ? 'ring-1 ring-blue-400' : ''}
                            `}>
                            <span aria-label={month}>{month.slice(0, 3)}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
