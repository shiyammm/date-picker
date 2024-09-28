'use client';

import DatePickerCalendar from '@/components/DatePickerCalendar';
import DatePickerContainer from '@/components/DatePickerContainer';
import DatePIckerControls from '@/components/DatePIckerControls';
import DatePickerRecurrence from '@/components/DatePickerRecurrence';
import DatePickerSchedule from '@/components/DatePickerSchedule';
import { DatePickerProvider } from '@/context/DatePickerContext';

export default function Home() {
  return (
    <DatePickerProvider initialButtonText="Choose a date range">
      <div className="flex items-center justify-center h-screen">
        <DatePickerContainer bgContainer="blue" textColor="white">
          <DatePickerCalendar bgContainer="default" />
          <DatePickerRecurrence>
            <DatePIckerControls control="daily" />
            <DatePIckerControls control="weekly" />
            <DatePIckerControls control="monthly" />
            <DatePIckerControls control="yearly" />
          </DatePickerRecurrence>
          <DatePickerSchedule bgContainer="default" trackButtonLabel="Track" textColor='default'  />
        </DatePickerContainer>
      </div>
    </DatePickerProvider>
  );
}
