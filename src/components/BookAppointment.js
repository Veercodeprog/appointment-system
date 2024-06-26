import React, { useState, useEffect } from "react";
import AdminProvider from "./adminProvider";
import axiosPrivate from "../api/axios";
import useAuth from "../hooks/useAuth";

const BookAppointment = () => {
  const [services, setServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [selectedDates, setSelectedDates] = useState({}); // Object to store selected date for each service
  const { auth } = useAuth();
  useEffect(() => {
    console.log("auth", auth);
    getAllServices();
  }, []);

  const getAllServices = async () => {
    try {
      const response = await axiosPrivate.get("/services");
      const initialSelectedDates = response.data.reduce((acc, service) => {
        acc[service._id] = new Date().toISOString().split("T")[0]; // Initialize with today's date for each service
        return acc;
      }, {});
      setServices(response.data);
      setSelectedDates(initialSelectedDates);
      console.log("Services:", response.data);
    } catch (error) {
      console.error("Error getting services:", error);
    }
  };
  const bookAppointment = async (
    serviceName,
    charges,
    selectedDate,
    selectedTime
  ) => {
    const createdBy = auth.username;

    try {
      const response = await axiosPrivate.post("/booking", {
        serviceName,
        charges: 100, // Adjust charges as per your service schema
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        createdBy: auth.username, // Assuming you have user authentication
      });

      console.log(response.data.message);
      // Refresh services after booking
      getAllServices();
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const handleDateChange = (event, serviceId) => {
    const { value } = event.target;
    setSelectedDates({
      ...selectedDates,
      [serviceId]: value,
    });
  };

  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return dayOfWeek;
  };

  const getTimeSlotsForDay = (service, dayOfWeek) => {
    const selectedDate = selectedDates[service._id];
    // also exclude the slots checking from booking table in the database
    // for bboking Date  and  booking time
    // is selected datte is 26 june then check for the date in the booking table
    // if the date is present then check for the time slots
    // then exclude the time slots from the timing slots
    return service.timingSlots
      .filter((slot) => slot.day === dayOfWeek && slot.available)
      .map((slot) => <option key={slot.time}>{slot.time}</option>);
  };

  return (
    <AdminProvider>
      <main className="w-full">
        <div className="pt-6 px-4 w-full">
          <div className="w-full xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Book an Appointment
                  </h3>
                  <span className="text-base font-normal text-gray-500">
                    Select a service and book a slot
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Service Name
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Charges
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Select Date
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Available timing Slots
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Book Appointment
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {services.map((service) => (
                            <tr key={service._id}>
                              <td className="p-4">{service.serviceName}</td>
                              <td className="p-4">{service.charges}</td>
                              <td className="p-4">
                                <input
                                  type="date"
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  onChange={(e) =>
                                    handleDateChange(e, service._id)
                                  }
                                  value={selectedDates[service._id]}
                                />
                              </td>
                              <td className="p-4">
                                <select
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  value={selectedTime}
                                  onChange={(e) =>
                                    setSelectedTime(e.target.value)
                                  }
                                >
                                  <option value="">Select a time slot</option>

                                  {getTimeSlotsForDay(
                                    service,
                                    getDayOfWeek(selectedDates[service._id])
                                  )}
                                </select>
                              </td>
                              <td className="p-4">
                                <button
                                  className="text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg p-2"
                                  onClick={() =>
                                    bookAppointment(
                                      service.serviceName,
                                      service.charges,
                                      selectedDates[service._id],
                                      selectedTime
                                    )
                                  }
                                >
                                  Book
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AdminProvider>
  );
};

export default BookAppointment;
