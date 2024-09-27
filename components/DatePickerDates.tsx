'use client';
import { useDatePicker } from '@/context/DatePickerContext';
import React from 'react';

interface DatePickerDatesProps {
  datesToDisplay: string[];
}

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const DatePickerDates: React.FC<DatePickerDatesProps> = ({ datesToDisplay }) => {
  const { startDate, endDate } = useDatePicker();

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-700">Dates:</h4>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 text-gray-600">
        {datesToDisplay.length > 5 ? (
          <>
            <span>From:</span>
            <li>{formatDate(startDate!)}</li>
            <span>To:</span>
            <li>{formatDate(endDate!)}</li>
          </>
        ) : datesToDisplay.length > 0 ? (
          datesToDisplay.map((date, index) => (
            <li
              key={index}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 px-4 py-2 rounded-md transition-colors duration-300"
            >
              <span className="text-gray-800 block text-center">{date}</span>
            </li>
          ))
        ) : (
          <li>No dates generated</li>
        )}{' '}
      </ul>
    </div>
  );
};

export default DatePickerDates;
