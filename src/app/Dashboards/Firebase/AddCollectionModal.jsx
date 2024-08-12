import React, { useState } from "react";

const AddCollectionModal = ({ addCollection, closeModal }) => {
  const [collectionName, setCollectionName] = useState("");

  const handleSave = () => {
    if (collectionName.trim()) {
      addCollection(collectionName.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Add New Collection</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Collection Name:
          </label>
          <input
            className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg py-2 px-3 mt-1 focus:outline-none"
            type="text"
            placeholder="Enter collection name"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="btn-primary text-white px-4 py-2 rounded-lg shadow-md border border-blue-700 hover:bg-blue-500 transition duration-200 mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md border border-gray-700 hover:bg-gray-500 transition duration-200"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCollectionModal;
