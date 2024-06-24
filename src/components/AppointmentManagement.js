import React from "react";
import AdminProvider from "./adminProvider";
const AppointmentManagement = () => {
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
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          <tr>
                            <td className="p-4">John Doe</td>
                            <td className="p-4">Service 1</td>
                            <td className="p-4">$100</td>
                            <td className="p-4">2024-07-01</td>
                            <td className="p-4">9 AM - 10 AM</td>
                            <td className="p-4 space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                View
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4">Jane Smith</td>
                            <td className="p-4">Service 2</td>
                            <td className="p-4">$150</td>
                            <td className="p-4">2024-07-02</td>
                            <td className="p-4">10 AM - 11 AM</td>
                            <td className="p-4 space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                View
                              </button>
                              <button className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            </td>
                          </tr>
                          {/* <!-- Additional appointment rows as needed --> */}
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
