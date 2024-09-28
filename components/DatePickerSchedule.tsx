import React, { useState } from 'react';
import { useDatePicker } from '@/context/DatePickerContext';
import { months, nthWeek, weeks } from '@/constants/data';

interface DatePickerScheduleProps {
  saveButtonLabel?: string;
  resetButtonLabel?: string;
  trackButtonLabel?: string;
  onSave?: () => void;
  onReset?: () => void;
  primaryColor?: string;
  secondaryColor?: string;
  bgContainer?: string;
  textColor?: string;
  bgTrackBtn?: string;
}

const DatePickerSchedule: React.FC<DatePickerScheduleProps> = ({
  saveButtonLabel = 'Save',
  resetButtonLabel = 'Reset',
  trackButtonLabel = 'Track',
  primaryColor = 'bg-blue-500',
  secondaryColor = 'bg-red-500',
  bgContainer = 'stone',
  textColor = 'black',
  bgTrackBtn = 'bg-green-500',
  onSave,
  onReset,
}) => {
  const [toggleYearNotification, setToggleYearNotification] =
    useState<boolean>(false);

  const {
    repeat,
    selectedDays,
    setButtonText,
    setSelectedWeek,
    selectedWeek,
    datesToDisplay,
    setRepeat,
    handleReset,
    recurrence,
    yearlyDate,
    setYearlyDate,
    selectedRadio,
    setSelectedRadio,
    specificDayData,
    setSpecificDayData,
    setToggle,
  } = useDatePicker();

  // To customize background color
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

  // To customize text color
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

  // To handle every inputs
  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek((prevDay) => ({ ...prevDay, day: e.target.value }));
  };

  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWeek((prevWeek) => ({ ...prevWeek, week: e.target.value }));
  };

  const handleNthWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYearlyDate((prev) => ({ ...prev, nthWeek: e.target.value }));
  };

  const handleYearlyWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYearlyDate((prev) => ({ ...prev, week: e.target.value }));
  };

  const handleYearlyMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYearlyDate((prev) => ({ ...prev, month: e.target.value }));
  };

  const handleTrackButtonClick = () => {
    setButtonText('Choose a date range');
    setToggleYearNotification(!toggleYearNotification);
  };

  const handleYearlyDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = Number(e.target.value);
    setSpecificDayData((prevData) => ({
      ...prevData,
      day: newDay >= 1 && newDay <= 31 ? newDay : '',
    }));
  };

  const handleYearlyMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecificDayData((prevData) => ({
      ...prevData,
      month: e.target.value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.value);

    setYearlyDate({
      nthWeek: '',
      week: '',
      month: '',
    });

    if (e.target.value === 'specificDayInMonth') {
      setSpecificDayData({
        day: '',
        month: '',
      });
    }
  };

  const handleButtonText = () => {
    const isRecurrenceWeeklyOrMonthly =
      recurrence === 'weekly' || recurrence === 'monthly';
    const hasSelectedDaysOrWeek =
      selectedDays.length > 0 || selectedWeek.day || selectedWeek.week;

    let yearlyText = '';

    if (recurrence === 'yearly') {
      yearlyText =
        selectedRadio === 'firstWeekInMonth'
          ? `${yearlyDate.nthWeek} ${yearlyDate.week} ${
              yearlyDate.nthWeek && yearlyDate.week && yearlyDate.month
                ? 'of'
                : ''
            } ${yearlyDate.month}`
          : `Day ${specificDayData.day} ${specificDayData.month}`;
    }

    setButtonText(
      `Every ${repeat} 
      ${
        recurrence === 'daily'
          ? 'day(s)'
          : recurrence === 'weekly'
          ? 'week(s)'
          : recurrence === 'monthly'
          ? 'month(s)'
          : 'year(s)'
      }
      ${isRecurrenceWeeklyOrMonthly && hasSelectedDaysOrWeek ? 'on' : ''} 
      ${selectedDays.length > 0 ? selectedDays.join(', ') : ''} 
      ${selectedWeek.day ? selectedWeek.day : ''} 
      ${selectedWeek.week ? selectedWeek.week : ''} 
      ${recurrence === 'yearly' ? yearlyText : ''}`,
    );
    setToggle(false);
  };

  return (
    <div
      className={`p-4 lg:p-6 ${getBackgroundColor()} rounded-lg max-w-2xl mx-auto`}
    >
      {/* To Repeat value */}
      <div>
        <label
          htmlFor="repeat"
          className={`text-lg font-semibold ${getTextColor()} mr-4`}
        >
          Repeat:
        </label>
        <input
          type="number"
          id="repeat"
          value={repeat}
          min="1"
          max={datesToDisplay.length > 0 ? datesToDisplay.length : 1}
          placeholder="repeat"
          onChange={(e) => setRepeat(Number(e.target.value))}
          className={`h-10 w-16 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getTextColor()}`}
        />
      </div>

      {/* daily */}
      <div className="grid gap-4">
        <div>
          {recurrence === 'daily' && (
            <h3
              className={`flex items-center font-semibold pt-5  ${getTextColor()}`}
            >
              Every {repeat} day(s)
            </h3>
          )}
        </div>

        {/* weeks */}
        <div>
          {recurrence === 'weekly' && (
            <h3
              className={`flex items-center font-semibold py-3  ${getTextColor()}`}
            >
              Every {repeat} week(s)
              {selectedDays.length > 0 && (
                <p className="text-gray-800 ml-1">{`on ${selectedDays.join(
                  ', ',
                )}`}</p>
              )}
            </h3>
          )}

          {/* months */}
          {recurrence === 'monthly' && (
            <h3
              className={`flex lg:items-center font-semibold py-3  ${getTextColor()}`}
            >
              Every {repeat} month(s)
              <div className="px-4 lg:space-x-5 ">
                <select
                  className={`px-3 py-2  ${getTextColor()}`}
                  name="day"
                  id="day"
                  onChange={handleDayChange}
                >
                  {nthWeek.map((nth) => (
                    <option key={nth} value={nth}>
                      {nth}
                    </option>
                  ))}
                </select>
                <select
                  className={`px-3 py-2  ${getTextColor()}`}
                  name="week"
                  id="week"
                  onChange={handleWeekChange}
                >
                  {weeks.map((week) => (
                    <option key={week} value={week}>
                      {week}
                    </option>
                  ))}
                </select>
              </div>
            </h3>
          )}

          {/* years */}
          {recurrence === 'yearly' && (
            <div className={`space-y-4  ${getTextColor()}`}>
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <h3 className="font-semibold">Every {repeat} year(s)</h3>
                  <h4 className="font-semibold">
                    {selectedRadio === 'firstWeekInMonth'
                      ? `${yearlyDate.nthWeek} ${yearlyDate.week} ${
                          yearlyDate.nthWeek &&
                          yearlyDate.week &&
                          yearlyDate.month
                            ? 'of'
                            : ''
                        } ${yearlyDate.month}`
                      : `Day ${specificDayData.day} ${specificDayData.month}`}
                  </h4>
                </div>
                <button
                  className={`px-4 py-2 rounded-md transition-colors duration-300 capitalize ${bgTrackBtn} text-white font-semibold`}
                  onClick={handleTrackButtonClick}
                >
                  {trackButtonLabel}{' '}
                </button>
              </div>

              {/* Track option */}
              {toggleYearNotification && (
                <div className="space-y-5">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="firstWeekInMonth"
                      name="yearlyType"
                      value="firstWeekInMonth"
                      checked={selectedRadio === 'firstWeekInMonth'}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="firstWeekInMonth" className="flex gap-2">
                      <select
                        name="nthWeek"
                        id="nthWeek"
                        className="px-3 py-2"
                        onChange={handleNthWeekChange}
                      >
                        {nthWeek.map((nth) => (
                          <option key={nth} value={nth}>
                            {nth}
                          </option>
                        ))}
                      </select>
                      <select
                        className="px-3 py-2"
                        name="week"
                        id="week"
                        onChange={handleYearlyWeekChange}
                      >
                        {weeks.map((week) => (
                          <option key={week} value={week}>
                            {week}
                          </option>
                        ))}
                      </select>
                      <select
                        className="px-3 py-2"
                        name="month"
                        id="month"
                        onChange={handleYearlyMonthChange}
                      >
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {/* Track using specific day in month */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="specificDayInMonth"
                      name="yearlyType"
                      value="specificDayInMonth"
                      checked={selectedRadio === 'specificDayInMonth'}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="specificDayInMonth">
                      Day{' '}
                      <input
                        type="number"
                        min="1"
                        max="31"
                        className="h-10 w-16 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="day"
                        id="day"
                        value={specificDayData.day || ''}
                        onChange={handleYearlyDay}
                      />{' '}
                      of{' '}
                      <select
                        className="px-3 py-2"
                        name="month"
                        id="month"
                        value={specificDayData.month}
                        onChange={handleYearlyMonth}
                      >
                        {months.map((month) => (
                          <option key={month} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* To handling save and reset button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSave || handleButtonText}
            className={`${primaryColor} text-white hover:bg-blue-600 px-6 py-2 rounded-md`}
          >
            {saveButtonLabel}
          </button>
          <button
            onClick={onReset || handleReset}
            className={`${secondaryColor} text-white hover:bg-red-600 px-6 py-2 rounded-md`}
          >
            {resetButtonLabel}
          </button>{' '}
        </div>
      </div>
    </div>
  );
};

export default DatePickerSchedule;
