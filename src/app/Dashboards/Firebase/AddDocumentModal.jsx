import React, { useState } from "react";

const AddDocumentModal = ({
  firestore,
  currentCollection,
  closeModal,
  refreshCollection,
  refreshDocuments, // New prop to refresh the document list
}) => {
  const [docId, setDocId] = useState("");
  const [fields, setFields] = useState([{ name: "", value: "" }]);

  const addField = () => {
    setFields([...fields, { name: "", value: "" }]);
  };

  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const saveNewDocument = async () => {
    const collectionRef = firestore.collection(currentCollection);
    const newDocData = {};
    fields.forEach(({ name, value }) => {
      if (name && value) {
        newDocData[name] = value;
      }
    });

    try {
      if (docId) {
        await collectionRef.doc(docId).set(newDocData);
      } else {
        await collectionRef.add(newDocData);
      }

      refreshCollection();
      refreshDocuments(); // Trigger document refresh after saving
      closeModal();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h3 className="text-xl font-semibold mb-4">Add New Document</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Document ID (optional):
          </label>
          <input
            className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg py-2 px-3 mt-1 focus:outline-none"
            type="text"
            placeholder="Leave empty to auto-generate ID"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          {fields.map((field, index) => (
            <div key={index} className="flex mb-2">
              <input
                className="w-1/3 bg-white text-gray-800 border border-gray-300 rounded-lg py-2 px-3 mr-2 focus:outline-none"
                type="text"
                placeholder="Field Name"
                value={field.name}
                onChange={(e) =>
                  handleFieldChange(index, "name", e.target.value)
                }
              />
              <input
                className="w-2/3 bg-white text-gray-800 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none"
                type="text"
                placeholder="Field Value"
                value={field.value}
                onChange={(e) =>
                  handleFieldChange(index, "value", e.target.value)
                }
              />
              <button
                className="text-gray-600 hover:text-gray-800 ml-2"
                onClick={() => removeField(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          className="btn-primary text-white px-4 py-2 rounded-lg shadow-md border border-blue-700 hover:bg-blue-500 transition duration-200"
          onClick={addField}
        >
          Add Field
        </button>
        <div className="flex justify-end mt-4">
          <button
            className="btn-primary text-white px-4 py-2 rounded-lg shadow-md border border-blue-700 hover:bg-blue-500 transition duration-200 mr-2"
            onClick={saveNewDocument}
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

export default AddDocumentModal;
