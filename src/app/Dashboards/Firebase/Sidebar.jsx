// Sidebar.js
import React from "react";

const Sidebar = ({
  collections,
  loadSection,
  setCurrentCollection,
  openAddCollectionModal,
}) => {
  return (
    <aside className="w-full md:w-64 bg-gray-900 text-white shadow-lg border-r border-gray-700 md:relative z-10 transform md:translate-x-0 transition-transform duration-300 ease-in-out">
      <div className="p-6">
        <h1 className="text-3xl font-semibold">Firebase Console</h1>
      </div>
      <nav className="mt-10">
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          onClick={() => loadSection("firestore")}
        >
          <span className="text-lg">Firestore</span>
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 mt-2"
          onClick={() => loadSection("auth")}
        >
          <span className="text-lg">Authentication</span>
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 mt-2"
          onClick={() => loadSection("storage")}
        >
          <span className="text-lg">Storage</span>
        </a>
        <a
          href="#"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 mt-2"
          onClick={() => loadSection("functions")}
        >
          <span className="text-lg">Functions</span>
        </a>
      </nav>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Collections</h2>
        <div id="collections-list">
          {[...collections].map((collection) => (
            <div
              key={collection}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded"
              onClick={() => setCurrentCollection(collection)}
            >
              {collection}
            </div>
          ))}
        </div>
        <button
          className="mt-4 btn-primary text-white px-4 py-2 rounded-lg shadow-md border border-blue-700 hover:bg-blue-500 transition duration-200"
          onClick={openAddCollectionModal}
        >
          + Add Collection
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
