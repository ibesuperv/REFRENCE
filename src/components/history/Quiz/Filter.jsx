import React from "react";

const Filter = ({ selectedTimePeriod, setSelectedTimePeriod }) => {
  const timePeriods = ["all", "1940-1950", "1950-1960", "1960-1970"];

  return (
    <div className="my-4">
      <label htmlFor="timePeriod" className="block mb-2 text-gray-700">
        Filter by Time Period:
      </label>
      <select
        id="timePeriod"
        value={selectedTimePeriod}
        onChange={(e) => setSelectedTimePeriod(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        {timePeriods.map((period) => (
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
