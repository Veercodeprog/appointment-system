import React from "react";
import AdminProvider from "./adminProvider";
const BookAppointment = () => {
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
                              Available Timing Slots
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
                              Book Appointment
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr>
                            <td className="p-4">Service 1</td>
                            <td className="p-4">$100</td>
                            <td className="p-4">
                              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option>9 AM - 10 AM</option>
                                <option>10 AM - 11 AM</option>
                                <option>11 AM - 12 PM</option>
                                <option>1 PM - 2 PM</option>
                                <option>2 PM - 3 PM</option>
                                <option>3 PM - 4 PM</option>
                                <option>4 PM - 5 PM</option>
                              </select>
                            </td>
                            <td className="p-4">
                              <input
                                type="date"
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              />
                            </td>
                            <td className="p-4">
                              <button className="text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg p-2">
                                Book
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4">Service 2</td>
                            <td className="p-4">$150</td>
                            <td className="p-4">
                              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                <option>10 AM - 11 AM</option>
                                <option>11 AM - 12 PM</option>
                                <option>12 PM - 1 PM</option>
                                <option>1 PM - 2 PM</option>
                                <option>2 PM - 3 PM</option>
                                <option>3 PM - 4 PM</option>
                                <option>4 PM - 5 PM</option>
                                <option>5 PM - 6 PM</option>
                              </select>
                            </td>
                            <td className="p-4">
                              <input
                                type="date"
                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              />
                            </td>
                            <td className="p-4">
                              <button className="text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg p-2">
                                Book
                              </button>
                            </td>
                          </tr>
                          {/* <!-- Additional service rows as needed --> */}
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
