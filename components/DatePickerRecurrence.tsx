'use client';

import { useDatePicker } from '@/context/DatePickerContext';
import React from 'react';
import DatePickerDates from './DatePickerDates';
import DatePickerMonths from './DatePickerMonths';
import DatePickerYears from './DatePickerYears';
import DatePickerWeeks from './DatePickerWeeks';

const DatePickerRecurrence = ({ children }: { children: React.ReactNode }) => {
  const { startDate, endDate, recurrence, datesToDisplay } = useDatePicker();

  return (
    <div className="space-y-6 p-4 lg:p-6 bg-gray-50 rounded-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center gap-8">
        <span className="text-lg font-semibold text-gray-700">
          Start Date:
          <span className="font-normal text-[1rem] ml-3 text-gray-600">
            {startDate ? startDate.toDateString() : 'None'}
          </span>
        </span>
        <span className="text-lg font-semibold text-gray-700">
          End Date:
          <span className="font-normal text-[1rem] ml-3 text-gray-600">
            {endDate ? endDate.toDateString() : 'None'}
          </span>
        </span>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Recurrences:</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>
      </div>

      <div className="">
        {recurrence === 'daily' && (
          <DatePickerDates datesToDisplay={datesToDisplay} />
        )}
        {recurrence === 'weekly' && (
          <DatePickerWeeks datesToDisplay={datesToDisplay} />
        )}
        {recurrence === 'monthly' && (
          <DatePickerMonths datesToDisplay={datesToDisplay} />
        )}
        {recurrence === 'yearly' && (
          <DatePickerYears datesToDisplay={datesToDisplay} />
        )}
        {recurrence === null && <p>Please select a recurrence option.</p>}
      </div>
    </div>
  );
};

export default DatePickerRecurrence;
