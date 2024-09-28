'use client';
import { useDatePicker } from '@/context/DatePickerContext';
import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';

interface DatePickerContainerProps {
  bgContainer?: 'red' | 'blue' | 'green' | 'yellow' | 'gray' | 'default';
  textColor?: 'white' | 'black' | 'gray' | 'red' | 'blue' | 'green';
  buttonText?: string;
  children: React.ReactNode;
}

const DatePickerContainer: React.FC<DatePickerContainerProps> = ({
  bgContainer = 'default',
  textColor = 'black',
  buttonText,
  children,
}) => {
  const { toggle, setToggle, buttonText: defaultButtonText } = useDatePicker();

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
    switch (textColor) {
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

  return (
    <div className="date-picker-container">
      <div className="relative">
        <button
          className={`p-4 rounded-lg shadow flex items-center gap-10 ${getBackgroundColor()} ${getTextColor()}`}
          onClick={() => setToggle(!toggle)}
        >
          <span className="text-md font-semibold">
            {buttonText || defaultButtonText}
          </span>
          <FaRegCalendarAlt />
        </button>

        <div
          className={`absolute lg:w-[600px] p-5 border rounded-xl bg-gray-100 shadow-lg space-y-5 transition-all duration-300 ease-in-out ${
            toggle
              ? 'opacity-100 transform scale-100'
              : 'opacity-0 transform scale-95 pointer-events-none'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DatePickerContainer;
