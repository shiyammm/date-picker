export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type SelectedWeekType = {
  day: string | null;
  week: string | null;
};

export type DatePickerContextType = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  recurrence: RecurrenceType;
  setRecurrence: React.Dispatch<React.SetStateAction<RecurrenceType>>;
  repeat: number;
  setRepeat: React.Dispatch<React.SetStateAction<number>>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  isRecurrenceActive: boolean;
  setIsRecurrenceActive: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
  selectedWeek: SelectedWeekType;
  setSelectedWeek: React.Dispatch<React.SetStateAction<SelectedWeekType>>;
};
