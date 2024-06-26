import React from "react";
import { useEffect, useState } from "react";
import AdminProvider from "./adminProvider";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Users = () => {
  const { auth } = useAuth();
  const [selectedRole, setSelectedRole] = useState({}); // State to hold selected roles

  // Example logic based on roles
  const isAdmin = auth.roles.includes(2002);
  const isSubAdmin = auth.roles.includes(2003);
  const isCustomer = auth.roles.includes(2001);

  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); //to cancel the fetch request
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log("response", response.data);
        isMounted && setUsers(response.data);
        console.log("users", users);
      } catch (err) {
        console.log("err", err);
        return navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  const handleChangeRole = async (userId, newRole, roleCode) => {
    if (!isAdmin && !isSubAdmin) {
      console.error("Unauthorized to change user roles");
      return;
    }

    try {
      const response = await axiosPrivate.put(`/users/${userId}/role`, {
        newRole,
        roleCode,
      });

      // Handle success
      console.log("Role updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating role:", error);
      // Handle error
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!isAdmin) {
      console.error("Unauthorized to delete users");
      return;
    }

    try {
      const response = await axiosPrivate.delete(`/users/${userId}`);

      // Handle success
      console.log("User deleted successfully:", response.data);
      // Update users list after deletion if needed
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error
    }
  };

  return (
    <AdminProvider>
      {isAdmin && <p>Admin</p>}
      <button
        className="text-indigo-600 hover:text-indigo-900"
        onClick={() => refresh()}
      >
        Refresh Token
      </button>
      <main className="w-full">
        <div className="pt-6 px-4 w-full">
          <div className="w-full xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Users
                  </h3>
                  <span className="text-base font-normal text-gray-500">
                    List of all users
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="#"
                    className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
                  >
                    View all
                  </a>
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
                              className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/10"
                            >
                              Id
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Username
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Change Role
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Delete User
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {/* <!-- Additional user rows as needed --> */}
                          {users.map((user, index) => (
                            <tr
                              key={user._id}
                              className={
                                index % 2 === 0 ? "bg-gray-100" : "bg-white"
                              }
                            >
                              <td className="p-2">{index + 1}</td>
                              <td className="p-4">{user.username}</td>
                              <td className="p-4">{user.email}</td>
                              {/* <td className="p-2"> */}
                              {/*   <select */}
                              {/*     className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" */}
                              {/*     value={user.roles[0]} // Assuming user.roles is an array and you want the first role as default */}
                              {/*     onChange={(e) => */}
                              {/*       handleChangeRole(user._id, e.target.value) */}
                              {/*     } */}
                              {/*   > */}
                              {/*     {/* Check for Admin role */}
                              {/*     {user.roles.includes(2002) && ( */}
                              {/*       <> */}
                              {/*         <option key="admin" value="Admin"> */}
                              {/*           Admin */}
                              {/*         </option> */}
                              {/*         <option key="subadmin" value="Subadmin"> */}
                              {/*           Subadmin */}
                              {/*         </option> */}
                              {/*         <option key="customer" value="Customer"> */}
                              {/*           Customer */}
                              {/*         </option> */}
                              {/*       </> */}
                              {/*     )} */}
                              {/*     {/* Check for Subadmin role */}
                              {/*     {user.roles.includes(2003) && */}
                              {/*       !user.roles.includes(2002) && ( */}
                              {/*         <> */}
                              {/*           <option key="subadmin" value="Subadmin"> */}
                              {/*             Subadmin */}
                              {/*           </option> */}
                              {/*           <option key="customer" value="Customer"> */}
                              {/*             Customer */}
                              {/*           </option> */}
                              {/*           <option key="admin" value="Admin"> */}
                              {/*             Admin */}
                              {/*           </option> */}
                              {/*         </> */}
                              {/*       )} */}
                              {/*     {/* Check for Customer role */}
                              {/*     {user.roles.includes(2001) && */}
                              {/*       !user.roles.includes(2002) && */}
                              {/*       !user.roles.includes(2003) && ( */}
                              {/*         <> */}
                              {/*           <option key="customer" value="Customer"> */}
                              {/*             Customer */}
                              {/*           </option> */}
                              {/*           <option key="subadmin" value="Subadmin"> */}
                              {/*             Subadmin */}
                              {/*           </option> */}
                              {/*           <option key="admin" value="Admin"> */}
                              {/*             Admin */}
                              {/*           </option> */}
                              {/*         </> */}
                              {/*       )} */}
                              {/*   </select> */}
                              {/* </td> */}
                              <td className="p-2">
                                <select
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  value={user.role}
                                  onChange={(e) =>
                                    handleChangeRole(
                                      user._id,
                                      e.target.value,
                                      e.target.options[
                                        e.target.selectedIndex
                                      ].getAttribute("rolecode")
                                    )
                                  }
                                >
                                  {user.roles.hasOwnProperty("Admin") && (
                                    <>
                                      <option
                                        key="admin"
                                        value="Admin"
                                        rolecode="2002"
                                      >
                                        Admin
                                      </option>
                                      <option
                                        key="subadmin"
                                        value="Subadmin"
                                        rolecode="2001"
                                      >
                                        Subadmin
                                      </option>
                                      <option
                                        key="customer"
                                        value="Customer"
                                        rolecode="2003"
                                      >
                                        Customer
                                      </option>
                                    </>
                                  )}
                                  {/* Check for Subadmin role */}
                                  {user.roles.hasOwnProperty("Subadmin") &&
                                    !user.roles.hasOwnProperty("Admin") && (
                                      <>
                                        <option
                                          key="subadmin"
                                          value="Subadmin"
                                          rolecode="2001"
                                        >
                                          Subadmin
                                        </option>
                                        <option
                                          key="customer"
                                          value="Customer"
                                          rolecode="2003"
                                        >
                                          Customer
                                        </option>
                                        <option
                                          key="admin"
                                          value="Admin"
                                          rolecode="2002"
                                        >
                                          Admin
                                        </option>
                                      </>
                                    )}
                                  {/* Check for Customer role */}
                                  {user.roles.Customer &&
                                    !user.roles.Admin &&
                                    !user.roles.Subadmin && (
                                      <>
                                        <option
                                          key="customer"
                                          value="Customer"
                                          rolecode="2003"
                                        >
                                          Customer
                                        </option>
                                        <option
                                          key="subadmin"
                                          value="Subadmin"
                                          rolecode="2001"
                                        >
                                          Subadmin
                                        </option>
                                        <option
                                          key="admin"
                                          value="Admin"
                                          rolecode="2002"
                                        >
                                          Admin
                                        </option>
                                      </>
                                    )}
                                </select>
                              </td>
                              <td className="p-4">
                                <button className="text-indigo-600 hover:text-indigo-900">
                                  Change Role
                                </button>
                              </td>
                              <td className="p-4">
                                <button
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete User
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

export default Users;
