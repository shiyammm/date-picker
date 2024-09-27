import React from 'react';

interface WeeklyComponentProps {
  handleRecurrenceChange: (
    recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly',
  ) => void;
  isActive: boolean;
}

const WeeklyComponent: React.FC<WeeklyComponentProps> = ({
  handleRecurrenceChange,
  isActive,
}) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-md transition-colors duration-300 ${
        isActive
          ? 'bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300'
      }`}
      onClick={() => handleRecurrenceChange('weekly')}
    >
      Weekly
    </button>
  );
};

export default WeeklyComponent;
