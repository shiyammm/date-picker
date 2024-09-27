'use client';

import { useDatePicker } from '@/context/DatePickerContext';
import React from 'react';

interface DatePickerWeeksProps {
  datesToDisplay: string[];
}

const DatePickerWeeks: React.FC<DatePickerWeeksProps> = ({
  datesToDisplay,
}) => {
  const { setSelectedDays } = useDatePicker();

  const handleDay = (day: string) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((weekday) => weekday != day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-700">
        Weekly Generated Days:
      </h4>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 text-gray-600">
        {datesToDisplay.length > 0 ? (
          datesToDisplay.map((date, index) => (
            <li
              key={index}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 px-4 py-2 rounded-md transition-colors duration-300 cursor-pointer"
              onClick={() => handleDay(date)}
            >
              <span className="text-gray-800 block text-center">{date}</span>
            </li>
          ))
        ) : (
          <li>
            <span className="text-gray-500">No week(s) generated</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DatePickerWeeks;
