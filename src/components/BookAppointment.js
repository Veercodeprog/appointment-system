import React, { useState, useEffect } from "react";
import AdminProvider from "./adminProvider";
import axiosPrivate from "../api/axios";
import useAuth from "../hooks/useAuth";
import Myrequests from "./subs/Myrequests";
const BookAppointment = () => {
  const [services, setServices] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});

  const { auth } = useAuth();

  useEffect(() => {
    getAllServices();
  }, []);

  const getAllServices = async () => {
    try {
      const response = await axiosPrivate.get("/services");
      const initialSelectedDates = response.data.reduce((acc, service) => {
        acc[service._id] = new Date().toISOString().split("T")[0];
        return acc;
      }, {});
      setServices(response.data);
      setSelectedDates(initialSelectedDates);
    } catch (error) {
      console.error("Error getting services:", error);
    }
  };

  const bookAppointment = async (serviceId) => {
    const service = services.find((s) => s._id === serviceId);
    const selectedDate = selectedDates[serviceId];
    const selectedTime = service.selectedTime; // Adjust according to how you store time
    const createdBy = auth.username;

    try {
      const response = await axiosPrivate.post("/booking", {
        serviceName: service.serviceName,
        charges: service.charges, // Adjust charges as per your service schema
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        createdBy: auth.username,
      });
      setServices((prevServices) =>
        prevServices.map((prevService) =>
          prevService._id === serviceId
            ? {
                ...prevService,
                bookedTimings: prevService.bookedTimings
                  ? [...prevService.bookedTimings, selectedTime]
                  : [selectedTime],
              }
            : prevService
        )
      );
      console.log(response.data);
      getAllServices(); // Refresh services after booking
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };
  useEffect(() => {
    const updateBookedTimings = async () => {
      try {
        const updatedServices = await Promise.all(
          services.map(async (service) => {
            const bookedTimings = await getBookedTimingsForDate(
              service.serviceName,
              selectedDates[service._id]
            );
            return { ...service, bookedTimings };
          })
        );
        setServices(updatedServices);
      } catch (error) {
        console.error("Error updating booked timings:", error);
      }
    };
    updateBookedTimings();
  }, [selectedDates]);
  const handleDateChange = async (event, serviceId) => {
    const { value } = event.target;
    setSelectedDates({
      ...selectedDates,
      [serviceId]: value,
    });

    try {
      const service = services.find((s) => s._id === serviceId);
      const bookedTimings = await getBookedTimingsForDate(
        service.serviceName,
        value
      );
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === serviceId ? { ...service, bookedTimings } : service
        )
      );
    } catch (error) {
      console.error("Error fetching booked timings for date:", error);
    }
  };
  const getDayOfWeek = (date) => {
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return dayOfWeek;
  };
  const getBookedTimingsForDate = async (serviceName, date) => {
    console.log("date", date);
    try {
      const response = await axiosPrivate.get(
        `/booked-appointments?appointmentDate=${date}&serviceName=${serviceName}`
      );
      return response.data.map((booking) => booking.appointmentTime);
    } catch (error) {
      console.error("Error getting booked timings:", error);
      return [];
    }
  };
  const checkbookedtimings = async (serviceName, date) => {
    const bookedTimings = await getBookedTimingsForDate(serviceName, date);
    console.log("bookedTimings", bookedTimings);
  };
  const getTimeSlotsForDay = (service, dayOfWeek) => {
    const selectedDate = selectedDates[service._id];
    const serviceName = service.serviceName;
    const availableSlots = service.timingSlots
      .filter((slot) => slot.day === dayOfWeek && slot.available)
      .map((slot) => slot.time);

    if (service.bookedTimings && service.bookedTimings.length > 0) {
      return availableSlots.filter(
        (slot) => !service.bookedTimings.includes(slot)
      );
    }

    return availableSlots;
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
                                  min={new Date().toISOString().split("T")[0]} // Add this line
                                  onChange={(e) =>
                                    handleDateChange(e, service._id)
                                  }
                                  value={selectedDates[service._id]}
                                />
                              </td>
                              <td className="p-4">
                                <select
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  value={service.selectedTime || ""}
                                  onChange={(e) =>
                                    setServices((prevServices) =>
                                      prevServices.map((prevService) =>
                                        prevService._id === service._id
                                          ? {
                                              ...prevService,
                                              selectedTime: e.target.value,
                                            }
                                          : prevService
                                      )
                                    )
                                  }
                                >
                                  <option value="">Select a time slot</option>
                                  {getTimeSlotsForDay(
                                    service,
                                    getDayOfWeek(selectedDates[service._id])
                                  ).map((time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  ))}{" "}
                                </select>
                              </td>
                              {/* <td className="p-4"> */}
                              {/*   <button */}
                              {/*     className="text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg p-2" */}
                              {/*     onClick={() => */}
                              {/*       checkbookedtimings( */}
                              {/*         service.serviceName, */}
                              {/*         selectedDates[service._id] */}
                              {/*       ) */}
                              {/*     } */}
                              {/*   > */}
                              {/*     check Book timings */}
                              {/*   </button> */}
                              {/* </td> */}

                              <td className="p-4">
                                <button
                                  className="text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg p-2"
                                  onClick={() => bookAppointment(service._id)}
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
        <Myrequests />
      </main>
    </AdminProvider>
  );
};

export default BookAppointment;
