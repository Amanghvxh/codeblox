// App.js
import React, { useState, useEffect } from "react";
import { Firebase, Firestore } from "../../classes/Firebase";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import AddCollectionModal from "./AddCollectionModal";
import AddDocumentModal from "./AddDocumentModal";
import EditDocumentModal from "./EditDocumentModal";

const App = () => {
  const [firestore, setFirestore] = useState(null);
  const [collections, setCollections] = useState(new Set());
  const [currentCollection, setCurrentCollection] = useState("");
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [showEditDocumentModal, setShowEditDocumentModal] = useState(false);
  const [currentDocRef, setCurrentDocRef] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const initializeFirebase = async () => {
      const firebaseApp = Firebase.initializeApp({
        dbName: "TestDB",
        dbVersion: 1,
      });
      const firestoreInstance = await firebaseApp.firestore();
      setFirestore(firestoreInstance);
      const collectionSet = await loadCollections(firestoreInstance);
      if (collectionSet.size > 0) {
        setCurrentCollection([...collectionSet][0]);
      }
    };
    initializeFirebase();
  }, []);

  useEffect(() => console.log(collections, "collections"), [collections]);

  const loadCollections = async (firestoreInstance) => {
    const allCollections = await firestoreInstance.listCollections();
    const collectionSet = new Set(
      allCollections.map((col) => col.collectionPath)
    );
    setCollections(collectionSet);
    return collectionSet;
  };

  const addCollection = (collectionName) => {
    setCollections((prev) => new Set([...prev, collectionName]));
    setCurrentCollection(collectionName);
    setShowAddCollectionModal(false);
  };

  const refreshDocuments = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  const loadSection = (section) => {
    switch (section) {
      case "firestore":
        loadCollections(firestore);
        break;
      case "auth":
      case "storage":
      case "functions":
        alert(`${section} is not implemented in this simulation.`);
        break;
      default:
        alert("This section is not implemented.");
        break;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar
        collections={collections}
        loadSection={loadSection}
        setCurrentCollection={setCurrentCollection}
        openAddCollectionModal={() => setShowAddCollectionModal(true)}
      />
      <MainContent
        firestore={firestore}
        currentCollection={currentCollection}
        openAddDocumentModal={() => setShowAddDocumentModal(true)}
        openEditModal={(docRef) => {
          setCurrentDocRef(docRef);
          setShowEditDocumentModal(true);
        }}
        refreshTrigger={refreshTrigger} // Pass the refreshTrigger to re-render on document change
      />
      {showAddCollectionModal && (
        <AddCollectionModal
          addCollection={addCollection}
          closeModal={() => setShowAddCollectionModal(false)}
        />
      )}
      {showAddDocumentModal && (
        <AddDocumentModal
          firestore={firestore}
          currentCollection={currentCollection}
          closeModal={() => setShowAddDocumentModal(false)}
          refreshCollection={() => loadCollections(firestore)}
          refreshDocuments={refreshDocuments} // Pass refreshDocuments function to the modal
        />
      )}
      {showEditDocumentModal && (
        <EditDocumentModal
          docRef={currentDocRef}
          closeModal={() => setShowEditDocumentModal(false)}
          refreshCollection={() => loadCollections(firestore)}
        />
      )}
    </div>
  );
};

export default App;
