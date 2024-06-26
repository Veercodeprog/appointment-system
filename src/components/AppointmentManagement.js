import React from "react";
import AdminProvider from "./adminProvider";
import axiosPrivate from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
const AppointmentManagement = () => {
  const [bookings, setBookings] = React.useState([]);
  useEffect(() => {
    getAllBookings();
  }, []);
  const getAllBookings = async () => {
    try {
      const response = await axiosPrivate.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error getting services:", error);
    }
  };

  const handleApproveBooking = async (bookingId) => {
    try {
      await axiosPrivate.put(`/${bookingId}/approve`);
      // Refresh bookings after approval
      getAllBookings();
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };
  const handleDeleteBooking = async (bookingId) => {
    try {
      await axiosPrivate.delete(`/${bookingId}`);
      // Refresh bookings after deletion
      getAllBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
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
                    Manage Appointments
                  </h3>
                  <span className="text-base font-normal text-gray-500">
                    List of all appointments
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
                              Customer Name
                            </th>
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
                              Appointment Date
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Timing Slot
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {bookings.map((booking) => (
                            <tr>
                              <td className="p-4">{booking.createdBy} </td>
                              <td className="p-4"> {booking.serviceName} </td>
                              <td className="p-4"> {booking.charges} </td>
                              <td className="p-4">{booking.appointmentDate}</td>
                              <td className="p-4">{booking.appointmentTime}</td>
                              <td className="p-4">
                                {booking.status ? "Approved" : "Pending"}
                              </td>

                              <td className="p-4 space-x-2">
                                <button
                                  className="text-indigo-600 hover:text-indigo-900"
                                  onClick={() =>
                                    handleApproveBooking(booking._id)
                                  }
                                >
                                  Approve
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() =>
                                    handleDeleteBooking(booking._id)
                                  }
                                >
                                  Delete
                                </button>{" "}
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

export default AppointmentManagement;
