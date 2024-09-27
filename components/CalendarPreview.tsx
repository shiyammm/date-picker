'use client';

import { useDatePicker } from '@/context/DatePickerContext';
import React from 'react';
import DailyComponent from './DailyComponent';
import WeeklyComponent from './WeeklyComponent';
import MonthlyComponent from './MonthlyComponent';
import YearlyComponent from './YearlyComponent';
import GenerateDates from './GenerateDates';
import GenerateWeeks from './GenerateWeeks';
import GenerateMonths from './GenerateMonths';
import GenerateYears from './GenerateYears';

const CalendarPreview = () => {
  const {
    startDate,
    endDate,
    recurrence,
    setRecurrence,
    repeat,
    setRepeat,
    setButtonText,
    selectedDays,
    selectedWeek,
    setSelectedWeek,
  } = useDatePicker();

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to generate daily dates
  const generateDailyDates = () => {
    if (!startDate || !endDate) return [];

    const dates: Set<string> = new Set();
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.add(formatDate(currentDate)); // Format the date
      currentDate.setDate(currentDate.getDate() + repeat);
    }

    return Array.from(dates);
  };

  // Function to generate weekly dates
  const generateWeeklyDays = () => {
    if (!startDate || !endDate) return [];

    const dates: Set<string> = new Set();
    const currentDate = new Date(startDate);
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    while (currentDate <= endDate) {
      dates.add(weekdays[currentDate.getDay()]);
      currentDate.setDate(currentDate.getDate() + 1 * repeat);
    }

    return Array.from(dates);
  };

  // Function to generate monthly dates
  const generateMonthlyMonths = () => {
    if (!startDate || !endDate) return [];

    const dates: Set<string> = new Set();
    const currentDate = new Date(startDate);
    const months = [
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

    while (currentDate <= endDate) {
      dates.add(months[currentDate.getMonth()]);
      currentDate.setMonth(currentDate.getMonth() + repeat);
    }

    return Array.from(dates);
  };

  const generateYearlyYears = () => {
    if (!startDate || !endDate) return [];

    const dates: Set<string> = new Set();
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.add(currentDate.getFullYear().toString());
      currentDate.setFullYear(currentDate.getFullYear() + repeat); // Increment by repeat value
    }

    return Array.from(dates);
  };

  // Determine the dates to display based on recurrence
  const getDatesToDisplay = () => {
    switch (recurrence) {
      case 'daily':
        return generateDailyDates();
      case 'weekly':
        return generateWeeklyDays();
      case 'monthly':
        return generateMonthlyMonths();
      case 'yearly':
        return generateYearlyYears();
      default:
        return [];
    }
  };

  const datesToDisplay = getDatesToDisplay();
  const actualGeneratedDatesCount = datesToDisplay.length;

  const handleRecurrenceChange = (
    recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly',
  ) => {
    setRecurrence(recurrenceType);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek((prevDay) => ({ ...prevDay, day: e.target.value }));
  };
  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek((prevWeek) => ({ ...prevWeek, week: e.target.value }));
  };

  const handleButtonText = () => {
    setButtonText(`Every ${repeat} 
      ${
        recurrence === 'daily'
          ? 'day(s)'
          : recurrence === 'weekly'
          ? 'week(s)'
          : recurrence === 'monthly'
          ? 'month(s)'
          : 'year(s)'
      } on ${selectedDays.join(', ')} ${selectedWeek.day}
  ${selectedWeek.week}`);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg max-w-2xl mx-auto">
      <div className="flex justify-between items-center gap-8">
        <span className="text-lg font-semibold text-gray-700">
          Start Date:
          <span className="font-normal ml-3 text-gray-600">
            {startDate ? startDate.toDateString() : 'None'}
          </span>
        </span>
        <span className="text-lg font-semibold text-gray-700">
          End Date:
          <span className="font-normal ml-3 text-gray-600">
            {endDate ? endDate.toDateString() : 'None'}
          </span>
        </span>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">Recurrences:</h2>
        <div className="grid grid-cols-4 gap-4">
          <DailyComponent
            handleRecurrenceChange={handleRecurrenceChange}
            isActive={recurrence === 'daily'}
          />
          <WeeklyComponent
            handleRecurrenceChange={handleRecurrenceChange}
            isActive={recurrence === 'weekly'}
          />
          <MonthlyComponent
            handleRecurrenceChange={handleRecurrenceChange}
            isActive={recurrence === 'monthly'}
          />
          <YearlyComponent
            handleRecurrenceChange={handleRecurrenceChange}
            isActive={recurrence === 'yearly'}
          />{' '}
        </div>
      </div>

      <div className="">
        {recurrence === 'daily' && (
          <GenerateDates datesToDisplay={datesToDisplay} />
        )}
        {recurrence === 'weekly' && (
          <GenerateWeeks datesToDisplay={datesToDisplay} />
        )}
        {recurrence === 'monthly' && (
          <GenerateMonths datesToDisplay={datesToDisplay} />
        )}
        {recurrence === 'yearly' && (
          <GenerateYears datesToDisplay={datesToDisplay} />
        )}
        {recurrence === null && <p>Please select a recurrence option.</p>}
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="repeat"
            className="text-lg font-semibold text-gray-700 mr-4"
          >
            Repeat:
          </label>
          <input
            type="number"
            id="repeat"
            value={repeat}
            min="1"
            max={actualGeneratedDatesCount > 0 ? actualGeneratedDatesCount : 1}
            placeholder="repeat"
            onChange={(e) => setRepeat(Number(e.target.value))}
            className="h-10 w-16 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid gap-5">
          <div className="space-x-3">
            <span className="text-gray-700 flex">
              Every {repeat}{' '}
              {recurrence === 'daily'
                ? 'day(s)'
                : recurrence === 'weekly'
                ? 'week(s)'
                : recurrence === 'monthly'
                ? 'month(s)'
                : 'year(s)'}
              {recurrence === 'weekly' && selectedDays.length > 0 && (
                <p className="text-gray-800 ml-1">{`on ${selectedDays.join(
                  ', ',
                )}`}</p>
              )}{' '}
              {recurrence === 'monthly' && (
                <div className="px-4 space-x-5">
                  <select name="day" id="day" onChange={handleDayChange}>
                    <option value="First">First</option>
                    <option value="Second">Second</option>
                    <option value="Third">Third</option>
                    <option value="Fourth">Fourth</option>
                    <option value="Last">Last</option>
                  </select>
                  <select name="week" id="week" onChange={handleWeekChange}>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
              )}
            </span>
          </div>
          <button
            onClick={handleButtonText}
            className="bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600 px-4 py-2 rounded-md transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPreview;
