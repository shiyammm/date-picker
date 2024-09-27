import React from 'react';

interface DatePickerYearsProps {
  datesToDisplay: string[];
}

const DatePickerYears: React.FC<DatePickerYearsProps> = ({
  datesToDisplay,
}) => {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-700">Year(s):</h4>
      <ul className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-3 text-gray-600">
        {datesToDisplay.length > 0 ? (
          datesToDisplay.map((date, index) => (
            <li
              key={index}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300 px-4 py-2 rounded-md transition-colors duration-300"
            >
              <span className="text-gray-800 block text-center">{date}</span>
            </li>
          ))
        ) : (
          <li>
            <span className="text-gray-500">No year(s) generated</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DatePickerYears;
