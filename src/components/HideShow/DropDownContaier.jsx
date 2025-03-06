import { useState } from 'react';
import DropDown from './DropDown';

const DropDownContainer = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const options = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
    { id: 4, label: 'Option 4' },
    { id: 5, label: 'Option 5' },
  ];

  const handleChange = (option) => {
    setSelectedItem(option);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Select an Option</h2>
        <DropDown
          selectedItem={selectedItem}
          onChange={handleChange}
          options={options}
        />
      </div>
    </div>
  );
};

export default DropDownContainer;