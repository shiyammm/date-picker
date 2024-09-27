'use client';

import { months, weeks } from '@/constants/data';
import {
  DatePickerContextType,
  RecurrenceType,
  SelectedWeekType,
} from '@/types/type';
import { format } from 'date-fns';
import React, { createContext, useContext, useState } from 'react';

const DatePickerContext = createContext<DatePickerContextType | undefined>(
  undefined,
);

export const DatePickerProvider = ({
  children,
  initialRecurrence = 'daily',
  initialRepeat = 1,
  initialButtonText = 'Pick your dates',
  initialSelectedWeek = { day: null, week: null },
}: {
  children: React.ReactNode;
  initialRecurrence?: RecurrenceType;
  initialRepeat?: number;
  initialButtonText?: string;
  initialSelectedDays?: string[];
  initialSelectedWeek?: SelectedWeekType;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [recurrence, setRecurrence] =
    useState<RecurrenceType>(initialRecurrence);
  const [repeat, setRepeat] = useState<number>(initialRepeat);
  const [toggle, setToggle] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>(initialButtonText);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedWeek, setSelectedWeek] =
    useState<SelectedWeekType>(initialSelectedWeek);

  const [yearlyDate, setYearlyDate] = useState<{
    nthWeek: string;
    week: string;
    month: string;
  }>({
    nthWeek: '',
    week: '',
    month: '',
  });

  const [selectedRadio, setSelectedRadio] =
    useState<string>('firstWeekInMonth');

  const [specificDayData, setSpecificDayData] = useState<{
    day: number | '';
    month: string;
  }>({
    day: '',
    month: '',
  });

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setRecurrence(initialRecurrence);
    setRepeat(initialRepeat);
    setButtonText(initialButtonText);
    setSelectedDays([]);
    setSelectedWeek(initialSelectedWeek);
  };

  const formatDate = (date: Date) => format(date, 'dd-MM-yyyy');

  const handleDay = (day: string) => {
    setSelectedDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((weekday) => weekday !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  // Function to generate daily dates
  const generateDailyDates = () => {
    if (!startDate || !endDate) return [];

    const dates: Set<string> = new Set();
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.add(formatDate(currentDate)); 
      currentDate.setDate(currentDate.getDate() + repeat);
    }

    return Array.from(dates);
  };

  // Function to generate weekly dates
  const generateWeeklyDays = () => {
    if (!startDate || !endDate) return [];

    const dates: Set<string> = new Set();
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.add(weeks[currentDate.getDay()]);
      currentDate.setDate(currentDate.getDate() + 1 * repeat);
    }

    return Array.from(dates);
  };

  // Function to generate monthly dates
  const generateMonthlyMonths = () => {
    if (!startDate || !endDate) return [];

    const dates: Set<string> = new Set();
    const currentDate = new Date(startDate);

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
      currentDate.setFullYear(currentDate.getFullYear() + repeat);
    }

    return Array.from(dates);
  };

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

  return (
    <DatePickerContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        recurrence,
        setRecurrence,
        repeat,
        setRepeat,
        toggle,
        setToggle,
        buttonText,
        setButtonText,
        selectedDays,
        setSelectedDays,
        selectedWeek,
        setSelectedWeek,
        handleReset,
        datesToDisplay,
        formatDate,
        handleDay,
        yearlyDate,
        setYearlyDate,
        selectedRadio,
        setSelectedRadio,
        specificDayData,
        setSpecificDayData,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePicker = () => {
  const context = useContext(DatePickerContext);

  if (!context) {
    throw new Error('no context provided');
  }

  return context;
};
