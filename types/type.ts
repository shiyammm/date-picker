export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type SelectedWeekType = {
  day: string | null;
  week: string | null;
};
export type SelectedYearlyDateType = {
  nthWeek: string;
  week: string;
  month: string;
};
export type specificYearlyDateType = {
  day: number | "";
  month: string;
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
  buttonText: string;
  setButtonText: React.Dispatch<React.SetStateAction<string>>;
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
  selectedWeek: SelectedWeekType;
  setSelectedWeek: React.Dispatch<React.SetStateAction<SelectedWeekType>>;
  handleReset: () => void;
  datesToDisplay: string[];
  formatDate: (date: Date) => string;
  handleDay: (date: string) => void;
  yearlyDate: SelectedYearlyDateType;
  setYearlyDate: React.Dispatch<React.SetStateAction<SelectedYearlyDateType>>;
  selectedRadio: string;
  setSelectedRadio: React.Dispatch<React.SetStateAction<string>>;
  specificDayData: specificYearlyDateType;
  setSpecificDayData: React.Dispatch<
    React.SetStateAction<specificYearlyDateType>
  >;
};
