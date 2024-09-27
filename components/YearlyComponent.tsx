import React from 'react';

interface YearlyComponentProps {
  handleRecurrenceChange: (
    recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly',
  ) => void;
  isActive: boolean;
}

const YearlyComponent: React.FC<YearlyComponentProps> = ({
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
      onClick={() => handleRecurrenceChange('yearly')}
    >
      Yearly{' '}
    </button>
  );
};

export default YearlyComponent;
