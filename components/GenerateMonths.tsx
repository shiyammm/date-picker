import React from 'react';

interface GenerateMonthsProps {
  datesToDisplay: string[];
}

const GenerateMonths: React.FC<GenerateMonthsProps> = ({ datesToDisplay }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-700">Month(s):</h4>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 text-gray-600">
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
          <li className="">
            <span className="text-gray-500 text-ms">No month(s) generated</span>
          </li>
        )}{' '}
      </ul>
    </div>
  );
};

export default GenerateMonths;
