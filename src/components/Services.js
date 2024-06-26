import React from "react";
import AdminProvider from "./adminProvider";
import { useState } from "react";
import AddServiceModal from "./subs/AddServiceModal"; // Create AddServiceModal component separately
import EditServiceModal from "./subs/EditServiceModal"; // Create EditServiceModal component separately
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";
import TimingSlotsModal from "./subs/TimingSlotsModal"; // Create TimingSlotsModal component separately
const Services = () => {
  const [serviceId, setServiceId] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [charges, setCharges] = useState("");
  const [timingSlots, setTimingSlots] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [editingService, setEditingService] = useState(null); // To store service being edited
  const [services, setServices] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTimingSlotsModalOpen, setIsTimingSlotsModalOpen] = useState(false);
  useEffect(() => {
    getAllServices();
  }, [timingSlots]);

  const openTimingSlotsModal = (service) => {
    console.log("ServiceId:", service._id);
    setServiceId(service._id);
    setServiceName(service);
    setTimingSlots(service.timingSlots);
    setIsTimingSlotsModalOpen(true);
  };

  const closeTimingSlotsModal = () => {
    setIsTimingSlotsModalOpen(false);
    setServiceName("");
    setTimingSlots("");
    setServiceId("");
  };

  // Fetch services on component mount

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    clearForm(); // Clear form fields on close
  };

  const openEditModal = (service) => {
    setServiceName(service.serviceName);
    setCharges(service.charges);
    setTimingSlots(service.timingSlots.join(", ")); // Convert timing slots array to string for initial state
    setEditingService(service); // Set the service being edited
    setIsEditModalOpen(true); // Open modal for editing
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingService(null); // Clear editing state when closing modal
  };

  const clearForm = () => {
    setServiceName("");
    setCharges("");
    setTimingSlots("");
  };

  const getAllServices = async () => {
    try {
      const response = await axiosPrivate.get("/services");
      setServices(response.data);
      console.log("Services:", response.data);
    } catch (error) {
      console.error("Error getting services:", error);
      // Handle error as needed
      // Handle error as needed
    }
  };

  const handleAddService = async () => {
    try {
      const response = await axiosPrivate.post("/addservice", {
        serviceName,
        charges,
      });

      console.log("Service added:", response.data);
      closeAddModal(); // Close modal after successful addition
      getAllServices(); // Update service list after addition
    } catch (error) {
      console.error("Error adding service:", error);
      // Handle error as needed
    }
  };
  const handleEditService = async (editedService) => {
    try {
      const response = await axiosPrivate.put(
        `/services/${editingService._id}`,
        {
          serviceName: editedService.serviceName,
          charges: editedService.charges,
        }
      );

      console.log("service updated:", response.data);
      closeEditModal(); // close modal after successful update
      getAllServices(); // refresh services list
    } catch (error) {
      console.error("error editing service:", error);
      // handle error as needed
    }
  };
  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axiosPrivate.delete(`/services/${serviceId}`);
        console.log("Service deleted successfully");
        getAllServices(); // Refresh services list after deletion
      } catch (error) {
        console.error("Error deleting service:", error);
        // Handle error as needed
      }
    }
  };

  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <AdminProvider>
      <main className="w-full">
        <div className="pt-6 px-4 w-full">
          <div className="w-full xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Services
                  </h3>
                  <span className="text-base font-normal text-gray-500">
                    List of all services
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <button
                    className="text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg p-2"
                    onClick={openAddModal}
                  >
                    Add New Service
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
                              Timing Slots
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
                          {services.map((service) => (
                            <tr>
                              <td className="p-4">{service.serviceName}</td>
                              <td className="p-4">${service.charges}</td>
                              <td className="p-4">
                                <label className="block text-sm font-medium text-gray-700">
                                  {/* Timing Slots */}
                                </label>
                                <button
                                  type="button"
                                  onClick={() => openTimingSlotsModal(service)} // Use arrow function to prevent immediate execution
                                  className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Show Timing Slots
                                </button>
                              </td>
                              <td className="p-4 space-x-2">
                                <button
                                  className=" bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-lg"
                                  onClick={() => openEditModal(service)}
                                >
                                  Edit
                                </button>
                                <button
                                  className=" bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg"
                                  onClick={() =>
                                    handleDeleteService(service._id)
                                  }
                                >
                                  Delete Service
                                </button>
                              </td>
                            </tr>
                          ))}
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
      {isAddModalOpen && (
        <AddServiceModal
          serviceName={serviceName}
          setServiceName={setServiceName}
          charges={charges}
          setCharges={setCharges}
          timingSlots={timingSlots}
          setTimingSlots={setTimingSlots}
          closeModal={closeAddModal}
          handleAddService={handleAddService}
        />
      )}
      {isTimingSlotsModalOpen && (
        <TimingSlotsModal
          serviceId={serviceId}
          currentTimingSlots={serviceName.timingSlots}
          setTimingSlots={setTimingSlots}
          timingSlots={timingSlots}
          closeModal={closeTimingSlotsModal}
        />
      )}
      {isEditModalOpen && (
        <EditServiceModal
          service={editingService}
          closeModal={closeEditModal}
          setServiceName={setServiceName}
          setCharges={setCharges}
          setTimingSlots={setTimingSlots}
          handleEditService={handleEditService}
        />
      )}{" "}
    </AdminProvider>
  );
};

export default Services;
