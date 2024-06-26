import React, { useState } from "react";

const EditServiceModal = ({
  service,
  closeModal,
  setServiceName,
  setCharges,
  setTimingSlots,
  handleEditService,
}) => {
  const [editedService, setEditedService] = useState({ ...service });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEditService(editedService);
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black bg-opacity-30">
      <div className="relative bg-white w-full max-w-lg mx-auto rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Edit Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              value={editedService.serviceName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Charges
            </label>
            <input
              type="text"
              name="charges"
              value={editedService.charges}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;
