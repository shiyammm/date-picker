import DatePickerContainer from '@/components/DatePickerContainer';
import { DatePickerProvider } from '@/context/DatePickerContext';

export default function Home() {
  return (
    <DatePickerProvider>
      <div className="flex items-center mt-10 h-screen flex-col">
        <DatePickerContainer />
      </div>
    </DatePickerProvider>
  );
}
