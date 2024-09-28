'use client';

import DatePickerCalendar from '@/components/DatePickerCalendar';
import DatePickerContainer from '@/components/DatePickerContainer';
import DatePickerControls from '@/components/DatePickerControls';
import DatePickerRecurrence from '@/components/DatePickerRecurrence';
import DatePickerSchedule from '@/components/DatePickerSchedule';
import { DatePickerProvider } from '@/context/DatePickerContext';

export default function Home() {
  return (
    <DatePickerProvider initialButtonText="Choose a date range">
      <div className="flex items-center justify-center h-screen">
        <DatePickerContainer bgContainer="blue" textColor="white">
          <DatePickerCalendar bgContainer="default" textColor="default" />
          <DatePickerRecurrence>
            <DatePickerControls control="daily" />
            <DatePickerControls control="weekly" />
            <DatePickerControls control="monthly" />
            <DatePickerControls control="yearly" />
          </DatePickerRecurrence>
          <DatePickerSchedule
            bgContainer="default"
            trackButtonLabel="On"
            textColor="default"
          />
        </DatePickerContainer>
      </div>
    </DatePickerProvider>
  );
}
