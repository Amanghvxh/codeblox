// MainContent.js
import React, { useState, useEffect } from "react";

const MainContent = ({
  firestore,
  currentCollection,
  openAddDocumentModal,
  openEditModal,
  refreshTrigger, // New prop
}) => {
  const [documents, setDocuments] = useState([]);
  const [fields, setFields] = useState(new Set());

  useEffect(() => {
    if (firestore && currentCollection) {
      loadDocuments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firestore, currentCollection, refreshTrigger]);

  const loadDocuments = async () => {
    const collectionRef = firestore.collection(currentCollection);
    const docs = await collectionRef.get();
    const allFields = new Set();
    const docData = [];

    docs.forEach((docSnapshot) => {
      const data = docSnapshot.data();
      if (data) {
        Object.keys(data).forEach((field) => allFields.add(field));
        docData.push({ id: docSnapshot.id, ...data });
      }
    });

    setFields(allFields);
    setDocuments(docData);
  };

  const deleteDocument = async (docId) => {
    const docRef = firestore.collection(currentCollection).doc(docId);
    await docRef.delete();
    loadDocuments();
  };

  return (
    <main className="flex-1 p-10 bg-white transition-all duration-300 ease-in-out">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            Firestore -{" "}
            {currentCollection.charAt(0).toUpperCase() +
              currentCollection.slice(1)}{" "}
            Collection
          </h2>
          <button
            className="btn-primary text-white px-6 py-2 rounded-lg shadow-md border border-blue-700 hover:bg-blue-500 transition duration-200"
            onClick={openAddDocumentModal}
          >
            Add New Document
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-thin">
            <thead>
              <tr className="w-full bg-gray-800 text-white text-lg">
                <th className="py-3 px-4 text-left border-b border-gray-700">
                  ID
                </th>
                {[...fields].map((field) => (
                  <th
                    key={field}
                    className="py-3 px-4 text-left border-b border-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </th>
                ))}
                <th className="py-3 px-4 text-left border-b border-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-gray-700 cursor-pointer"
                  onClick={() =>
                    openEditModal(
                      firestore.collection(currentCollection).doc(doc.id)
                    )
                  }
                >
                  <td className="py-4 px-4 border-b border-gray-800">
                    {doc.id}
                  </td>
                  {[...fields].map((field) => (
                    <td
                      key={field}
                      className="py-4 px-4 border-b border-gray-800"
                    >
                      {doc[field] || ""}
                    </td>
                  ))}
                  <td className="py-4 px-4 border-b border-gray-800 flex space-x-2">
                    <button className="btn-primary text-white text-sm md:text-base px-2 md:px-4 py-1 rounded-lg shadow-md border border-blue-700 hover:bg-blue-500 transition duration-200">
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white text-sm md:text-base px-2 md:px-4 py-1 rounded-lg shadow-md border border-red-700 hover:bg-red-500 transition duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDocument(doc.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
