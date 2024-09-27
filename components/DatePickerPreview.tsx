'use client';
import { useDatePicker } from '@/context/DatePickerContext';
import React, { ReactEventHandler, useState } from 'react';

const DatePickerPreview = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    recurrence,
    setRecurrence,
  } = useDatePicker();

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value ? new Date(e.target.value) : null);
    setEndDate(null);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value ? new Date(e.target.value) : null);
  };

  const formatDateForInput = (date: Date | null): string => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  return (
    <div className="bg-gray-100 rounded-lg flex gap-10">
      <div className="flex flex-col">
        <label
          htmlFor="start-date"
          className="mb-3 text-md font-semibold text-gray-700"
        >
          Start Date:
        </label>
        <input
          type="date"
          name="start-date"
          id="start-date"
          className="border h-10 w-full rounded-md border-gray-300 p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
          value={formatDateForInput(startDate)}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="flex flex-col ">
        <label
          htmlFor="end-date"
          className="mb-3 text-md font-semibold text-gray-700"
        >
          End Date:
        </label>
        <input
          type="date"
          name="end-date"
          id="end-date"
          className="border h-10 w-full rounded-md border-gray-300 p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
          value={formatDateForInput(endDate)}
          onChange={handleEndDateChange}
          min={formatDateForInput(startDate)}
          disabled={!startDate}
        />
      </div>
    </div>
  );
};

export default DatePickerPreview;
