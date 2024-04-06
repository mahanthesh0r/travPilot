// components/DatePicker.tsx
import React, { useState } from 'react';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DatePicker: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const getNoOfDays = () => {
    return new Array(31).fill(null).map((_, index) => index + 1);
  };

  const handlePrevMonth = () => {
    setMonth((currentMonth) => (currentMonth === 0 ? 11 : currentMonth - 1));
  };

  const handleNextMonth = () => {
    setMonth((currentMonth) => (currentMonth === 11 ? 0 : currentMonth + 1));
  };

  const handleDateClick = (day: number) => {
    const newSelectedDate = new Date(year, month, day);
    setSelectedDate(newSelectedDate);
    setShowDatePicker(false);
  };

  return (
    <div className="">
      <div className="antialiased sans-serif">
        <div className="container mx-auto px-4 ">
          <div className="mb-5 w-64">
            <label htmlFor="datepicker" className="font-bold mb-1  text-white block">Select Date</label>
            <div className="relative">
              <input 
                type="text"
                readOnly
                value={selectedDate.toDateString()}
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                placeholder="Select date"
              />

              {showDatePicker && (
                <div 
                  className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0" 
                  style={{ width: '17rem' }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month]}</span>
                      <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
                    </div>
                    <div>
                      <button 
                        type="button"
                        className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full" 
                        disabled={month === 0}
                        onClick={handlePrevMonth}
                      >
                        {/* SVG for left arrow */}
                      </button>
                      <button 
                        type="button"
                        className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full" 
                        disabled={month === 11}
                        onClick={handleNextMonth}
                      >
                        {/* SVG for right arrow */}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap mb-3 -mx-1">
                    {DAYS.map((day) => (
                      <div key={day} style={{ width: '14.26%' }} className="px-1">
                        <div className="text-gray-800 font-medium text-center text-xs">{day}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap -mx-1">
                    {getNoOfDays().map((day, index) => (
                      <div key={index} style={{ width: '14.28%' }} className="px-1 mb-1">
                        <div
                          onClick={() => handleDateClick(day)}
                          className="cursor-pointer text-center text-black text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 hover:bg-blue-200"
                        >
                          {day}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>	 
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
