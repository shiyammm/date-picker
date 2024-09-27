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
}

const DatePickerCalendar: React.FC<DatePickerCalendarProps> = ({
  labelClassName = 'mb-3 text-md font-semibold text-gray-700',
  inputClassName = 'border h-10 w-full rounded-md border-gray-300 p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400',
  dateFormat = 'yyyy-MM-dd',
}) => {
  const { startDate, setStartDate, endDate, setEndDate } = useDatePicker();

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
    <div className="bg-gray-100 rounded-lg flex gap-10">
      <div className="flex flex-col">
        <label htmlFor="start-date" className={labelClassName}>
          Start Date:
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
      <div className="flex flex-col ">
        <label htmlFor="end-date" className={labelClassName}>
          End Date:
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
