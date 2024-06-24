import React from "react";
import useLogout from "../hooks/useLogout";
import AdminProvider from "./adminProvider";
const Roles = () => {
  return (
    <AdminProvider>
      <main className="w-full">
        <div className="pt-6 px-4 w-full">
          <div className="w-full xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Roles
                  </h3>
                  <span className="text-base font-normal text-gray-500">
                    List of all roles
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <button className="text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg p-2">
                    Add New Role
                  </button>
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
                              Role Name
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
                            <td className="p-4">Admin</td>
                            <td className="p-4">
                              <button className="text-red-600 hover:text-red-900">
                                Delete Role
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4">Subadmin</td>
                            <td className="p-4">
                              <button className="text-red-600 hover:text-red-900">
                                Delete Role
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4">Customer</td>
                            <td className="p-4">
                              <button className="text-red-600 hover:text-red-900">
                                Delete Role
                              </button>
                            </td>
                          </tr>
                          {/* <!-- Additional role rows as needed --> */}
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

export default Roles;
