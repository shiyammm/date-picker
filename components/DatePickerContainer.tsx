'use client';
import { useDatePicker } from '@/context/DatePickerContext';
import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import DatePickerPreview from './DatePickerPreview';
import CalendarPreview from './CalendarPreview';

const DatePickerContainer = () => {
  const { toggle, setToggle, buttonText } = useDatePicker();
  return (
    <div className="">
      <div className="relative">
        <button
          className="flex gap-14 p-4 px-4 border rounded-lg shadow-lg"
          onClick={() => setToggle(!toggle)}
        >
          <span className="text-md font-normal">{buttonText}</span>
          <FaRegCalendarAlt />
        </button>
        {toggle && (
          <div className="absolute border p-5 top-[5rem] rounded-xl bg-gray-100 w-[600px] shadow-lg space-y-5 transition-all">
            <DatePickerPreview />
            <CalendarPreview />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePickerContainer;
