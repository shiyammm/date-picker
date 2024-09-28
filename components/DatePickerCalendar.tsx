'use client';
import { useDatePicker } from '@/context/DatePickerContext';
import { format } from 'date-fns';
import React from 'react';

interface DatePickerCalendarProps {
  labelClassName?: string;
  inputClassName?: string;
  startDateLabel?: string;
  endDateLabel?: string;
  dateFormat?: string;
  bgContainer?: string;
  textContainer?: string;
}

const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  labelClassName = 'mb-3 text-md font-semibold',
  inputClassName = 'border h-10 w-full rounded-md border-gray-300 p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400',
  startDateLabel = 'Start Date',
  endDateLabel = 'End Date',
  dateFormat = 'yyyy-MM-dd',
  bgContainer = 'gray',
  textContainer = 'black',
}) => {
  const { startDate, setStartDate, endDate, setEndDate } = useDatePicker();

  const getBackgroundColor = () => {
    switch (bgContainer) {
      case 'red':
        return 'bg-red-500';
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'gray':
        return 'bg-gray-500';
      default:
        return 'bg-stone-100';
    }
  };

  const getTextColor = () => {
    switch (textContainer) {
      case 'white':
        return 'text-white';
      case 'black':
        return 'text-black';
      case 'gray':
        return 'text-gray-700';
      case 'red':
        return 'text-red-500';
      case 'blue':
        return 'text-blue-500';
      case 'green':
        return 'text-green-500';
      default:
        return 'text-black';
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value ? new Date(e.target.value) : null);
    setEndDate(null);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value ? new Date(e.target.value) : null);
  };

  const formatDateForInput = (
    date: Date | null,
    formatString: string = 'yyyy-MM-dd',
  ): string => {
    return date ? format(date, formatString) : '';
  };

  return (
    <div className={`rounded-lg flex gap-10 p-4 ${getBackgroundColor()}`}>
      <div className="flex flex-col">
        <label
          htmlFor="start-date"
          className={`${labelClassName} ${getTextColor()}`}
        >
          {startDateLabel}:
        </label>
        <input
          type="date"
          name="start-date"
          id="start-date"
          className={inputClassName}
          value={formatDateForInput(startDate, dateFormat)}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="flex flex-col">
        <label
          htmlFor="end-date"
          className={`${labelClassName} ${getTextColor()}`}
        >
          {endDateLabel}:
        </label>
        <input
          type="date"
          name="end-date"
          id="end-date"
          className={inputClassName}
          value={formatDateForInput(endDate, dateFormat)}
          onChange={handleEndDateChange}
          min={formatDateForInput(startDate)}
          disabled={!startDate}
        />
      </div>
    </div>
  );
};

export default DatePickerCalendar;
