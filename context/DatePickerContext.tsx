'use client';

import {
  DatePickerContextType,
  RecurrenceType,
  SelectedWeekType,
} from '@/types/type';
import React, { createContext, useContext, useState } from 'react';

const DatePickerContext = createContext<DatePickerContextType | undefined>(
  undefined,
);

export const DatePickerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [recurrence, setRecurrence] = useState<RecurrenceType>('daily');
  const [repeat, setRepeat] = useState<number>(1);
  const [toggle, setToggle] = useState<boolean>(false);
  const [isRecurrenceActive, setIsRecurrenceActive] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Pick your dates');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<SelectedWeekType>({
    day: null,
    week: null,
  });

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
        isRecurrenceActive,
        setIsRecurrenceActive,
        buttonText,
        setButtonText,
        selectedDays,
        setSelectedDays,
        selectedWeek,
        setSelectedWeek,
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
