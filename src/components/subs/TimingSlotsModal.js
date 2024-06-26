import React, { useState, useEffect } from "react";
import AvailableTimingSlotsModal from "./AvailableTimingSlotsModal"; // Adjust the import path as per your project structure
import axiosPrivate from "../../api/axios";
const TimingSlotsModal = ({
  serviceId,
  currentTimingSlots,
  setTimingSlots,
  closeModal,
  timingSlots,
}) => {
  const [newTimingSlot, setNewTimingSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isAvailableSlotsModalOpen, setIsAvailableSlotsModalOpen] =
    useState(false);

  const generateAllTimingSlots = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const times = [
      "10:00 - 11:00",
      "11:00 - 12:00",
      "12:00 - 13:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
      "16:00 - 17:00",
      "17:00 - 18:00",
    ];
    const allSlots = [];
    days.forEach((day) => {
      times.forEach((time) => {
        allSlots.push({ day, time });
      });
    });
    return allSlots;
  };

  useEffect(() => {
    // Calculate available slots based on currentTimingSlots
    const usedSlots = currentTimingSlots.map((slot) => ({
      day: slot.day,
      time: slot.time,
    }));
    const allSlots = generateAllTimingSlots();
    const remainingSlots = allSlots.filter(
      (slot) =>
        !usedSlots.some(
          (usedSlot) => usedSlot.day === slot.day && usedSlot.time === slot.time
        )
    );
    setAvailableSlots(remainingSlots);
  }, [currentTimingSlots]);
  // const handleAddNewTimingSlot = (slot) => {
  //   // setNewTimingSlot((prevSlots) => [...prevSlots, slot]);
  //   setNewTimingSlot(slot);
  // };
  //
  // const handleAddTimingSlot = () => {
  //   if (newTimingSlot.trim() === "") return;
  //   setTimingSlots((prevSlots) => [...prevSlots, newTimingSlot.trim()]);
  //   setNewTimingSlot("");
  // };

  const handleRemoveTimingSlot = (indexToRemove) => {
    setTimingSlots((prevSlots) =>
      prevSlots.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSaveTimingSlots = async () => {
    closeModal();
    console.log("serviceId", serviceId);
    try {
      // Make HTTP POST request to save timingSlots
      const response = await axiosPrivate.put(`/add/timingSlots/${serviceId}`, {
        timingSlots: timingSlots.map((slot) => ({
          day: slot.day,
          time: slot.time,
          available: true, // Assuming all are initially available
        })),
      });

      setTimingSlots(response.data);
      console.log("Saved timing slots:", response.data);
      console.log("timingSlots", timingSlots);
      // Optionally handle success message or further actions
    } catch (error) {
      console.error("Error saving timing slots:", error);
      // Optionally handle error state or user notification
    }
  };
  console.log("currentTimingSlots", currentTimingSlots);
  console.log("timingSlots", timingSlots);
  const openAvailableSlotsModal = () => {
    setIsAvailableSlotsModalOpen(true);
  };

  const addSlotsFromAvailableModal = (slots) => {
    setTimingSlots((prevSlots) => [...prevSlots, ...slots]);
    setIsAvailableSlotsModalOpen(false);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-70 overflow-auto bg-black bg-opacity-30">
      <div className="relative bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Timing Slots</h2>
        <div className="overflow-auto max-h-96">
          {timingSlots.map((slot, index) => (
            <div
              key={index}
              className="bg-gray-100 px-3 py-1 rounded-lg flex items-center mb-2"
            >
              <span className="mr-2">
                {slot.day} - {slot.time}
              </span>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => handleRemoveTimingSlot(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            type="text"
            value={newTimingSlot}
            onChange={(e) => setNewTimingSlot(e.target.value)}
            placeholder="Add New Timing Slot"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={openAvailableSlotsModal}
            className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Add Available Slots
          </button>
        </div>
        {isAvailableSlotsModalOpen && (
          <AvailableTimingSlotsModal
            availableSlots={availableSlots}
            addNewSlot={addSlotsFromAvailableModal}
            closeModal={() => setIsAvailableSlotsModalOpen(false)}
          />
        )}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleSaveTimingSlots}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Timing Slots
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimingSlotsModal;
