import React, { useState } from "react";

const AvailableTimingSlotsModal = ({
  availableSlots,
  addNewSlot,
  closeModal,
}) => {
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlotSelection = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(
        selectedSlots.filter((selectedSlot) => selectedSlot !== slot)
      );
    } else {
      setSelectedSlots([...selectedSlots, slot]);
      console.log("selectedSlots", selectedSlots);
    }
  };

  const handleAddSlots = () => {
    addNewSlot(selectedSlots);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-30">
      <div className="relative bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Available Timing Slots</h2>
        <div className="flex flex-wrap gap-2 mt-1">
          {availableSlots.map((slot, index) => (
            <div
              key={index}
              className={`bg-gray-100 px-3 py-1 rounded-lg flex items-center cursor-pointer ${
                selectedSlots.includes(slot) ? "bg-violet-500 text-white" : ""
              }`}
              onClick={() => toggleSlotSelection(slot)}
            >
              <span className="mr-2">
                {slot.day} - {slot.time}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleAddSlots}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Timing Slots
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableTimingSlotsModal;
