'use client';

import { useDatePicker } from '@/context/DatePickerContext';
import React from 'react';

interface DatePickerControlProps {
  control: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const DatePIckerControl: React.FC<DatePickerControlProps> = ({ control }) => {
  const { setRecurrence, recurrence } = useDatePicker();

  const handleRecurrenceChange = (
    recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly',
  ) => {
    setRecurrence(recurrenceType);
  };

  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-md transition-colors duration-300 capitalize ${
        recurrence === control
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300'
      }`}
      onClick={() => handleRecurrenceChange(control)}
    >
      {control}
    </button>
  );
};

export default DatePIckerControl;
