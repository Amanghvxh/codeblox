import React, { useState, useEffect } from "react";

const EditDocumentModal = ({ docRef, closeModal, refreshCollection }) => {
  const [documentData, setDocumentData] = useState("");

  useEffect(() => {
    const fetchDocument = async () => {
      const doc = await docRef.get();
      setDocumentData(JSON.stringify(doc.data(), null, 2));
    };
    fetchDocument();
  }, [docRef]);

  const saveDocument = async () => {
    try {
      const updatedData = JSON.parse(documentData);
      await docRef.update(updatedData);
      closeModal();
      refreshCollection();
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Invalid JSON format. Please check your input.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Edit Document</h3>
        <textarea
          className="w-full h-64 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none resize-none"
          value={documentData}
          onChange={(e) => setDocumentData(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button
            className="btn-primary text-white px-4 py-2 rounded-lg shadow-md border border-blue-700 hover:bg-blue-500 transition duration-200 mr-2"
            onClick={saveDocument}
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

export default EditDocumentModal;
