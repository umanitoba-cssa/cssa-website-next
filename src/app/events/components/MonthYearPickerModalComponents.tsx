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



export const YearSelector = ({selectedYear, setSelectedYear, years}: YearSelectorProps) => {
    return(
        <div className="mb-6">
                                <label className="block text-sm text-gray-300 mb-2 font-medium">
                                    Year
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(Number(e.target.value))}
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
    )
}

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

export const MonthGrid = ({ MONTHS, selectedMonth, setSelectedMonth, thisMonth, thisYear, selectedYear }: MonthGridProps) => {
    return (
        <div className="mb-6">
        <label className="block text-sm text-gray-300 mb-2 font-medium">
            Month
        </label>
        <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((month, idx) => {
                const isSelected = idx === selectedMonth;
                const isCurrent =
                    idx === thisMonth && selectedYear === thisYear;

                return (
                    <button
                        key={month}
                        onClick={() => setSelectedMonth(idx)}
                        className={`
                            px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                            ${
                                isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                            }
                            ${isCurrent && !isSelected ? 'ring-1 ring-blue-400' : ''}
                        `}>
                        {month.slice(0, 3)}
                    </button>
                );
            })}
        </div>
    </div>
    )
}

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
