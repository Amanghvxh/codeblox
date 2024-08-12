export class CreateFileStructure {
  constructor(fileStructureData) {
    try {
      this.fileStructure = this.initializePaths(fileStructureData);
    } catch (error) {
      throw new Error(
        `Error in constructor: Failed to initialize file structure. Reason: ${error.message}`
      );
    }
  }

  // Initialize paths for each item
  initializePaths(structure, parentPath = "") {
    try {
      return structure.map((item) => {
        const currentPath = parentPath
          ? `${parentPath}.${item.name}`
          : item.name;
        item.path = currentPath;
        if (item.children && item.children.length > 0) {
          item.children = this.initializePaths(item.children, currentPath);
        }
        return item;
      });
    } catch (error) {
      throw new Error(
        `Error in initializePaths: Failed to initialize paths. Reason: ${error.message}`
      );
    }
  }

  // Helper function to find an item by id, name, or child
  findItem(id, name, child, structure = this.fileStructure) {
    try {
      if (Array.isArray(structure)) {
        for (let item of structure) {
          if (item.id === id || item.name === name) return item;
          if (child && item.children) {
            const childItem = item.children.find(
              (c) => c.id === child.id || c.name === child.name
            );
            if (childItem) return item; // Return parent of child
          }
          if (item.children) {
            const result = this.findItem(id, name, child, item.children);
            if (result) return result;
          }
        }
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error in findItem: Failed to find item. Reason: ${error.message}`
      );
    }
  }

  read(id, name, child) {
    try {
      if (!id && !name && !child)
        throw new Error(
          "Any one of identifier which is id, name, or child object is required to read from fileStructure"
        );

      const item = this.findItem(id, name, child);
      if (!item) throw new Error("Item not found");
      return item;
    } catch (error) {
      throw new Error(`Error in read: ${error.message}`);
    }
  }

  readAll(properties) {
    try {
      // Ensure properties is an array, even if a single string is passed
      if (!Array.isArray(properties)) {
        throw new Error("The argument must be an array of property names.");
      }

      // Object to store all values of the specified properties
      const result = {};

      // Initialize each property in the result object as an empty array
      properties.forEach((property) => {
        result[property] = [];
      });

      // Recursive function to traverse the structure and collect property values
      const collectProperties = (structure) => {
        for (let item of structure) {
          properties.forEach((property) => {
            if (item[property] !== undefined) {
              result[property].push(item[property]);
            }
          });

          // Recursively collect from children if they exist
          if (item.children && item.children.length > 0) {
            collectProperties(item.children);
          }
        }
      };

      // Start collecting properties from the root of the file structure
      collectProperties(this.fileStructure);

      // Return the collected object with all properties' arrays
      return result;
    } catch (error) {
      throw new Error(
        `Error in readAll: Failed to read all instances of properties '${properties.join(
          ", "
        )}'. Reason: ${error.message}`
      );
    }
  }

  write(path, name) {
    try {
      console.log("In Write Method: Started write process");
      console.log(
        `In Write Method: Received path: '${path}' and file name: '${name}'`
      );

      const pathArray = path.split(".");
      let current = this.fileStructure;
      console.log("In Write Method: Path split into array:", pathArray);

      for (let part of pathArray) {
        console.log(`In Write Method: Processing part '${part}'`);

        let folder = current.find(
          (item) => item.name === part && item.isFolder
        );
        if (!folder) {
          console.log(
            `In Write Method: Folder '${part}' not found, creating new folder`
          );

          folder = { name: part, isFolder: true, children: [], path: "" };
          current.push(folder);

          folder.path = pathArray
            .slice(0, pathArray.indexOf(part) + 1)
            .join(".");
          console.log(`In Write Method: New folder created:`, folder);
        } else {
          console.log(`In Write Method: Folder '${part}' found`);
        }

        current = folder.children;
        console.log(
          `In Write Method: Moved into folder, current structure:`,
          current
        );
      }

      // Check if a file with the same name already exists in the current folder
      const existingFileInSameLevel = current.find(
        (item) => item.name === name && !item.isFolder
      );
      if (existingFileInSameLevel) {
        console.log(
          `In Write Method: File '${name}' already exists in this folder, throwing error`
        );
        throw new Error(`File with name ${name} already exists in this folder`);
      }

      console.log(
        `In Write Method: Reached target folder, creating new file '${name}'`
      );

      const newFile = { name, isFolder: false, path: `${path}.${name}` };
      current.push(newFile);

      console.log(
        "In Write Method: New file created and added to structure:",
        newFile
      );
      console.log(
        "In Write Method: Final structure:",
        JSON.stringify(this.fileStructure, null, 2)
      );
    } catch (error) {
      console.log(`In Write Method: Error occurred - ${error.message}`);
      throw new Error(`Error in write: ${error.message}`);
    }
  }

  delete(id, name, child) {
    try {
      let itemToDelete;
      console.log("In Delete Method: Initialized itemToDelete");

      // Recursive function to delete an item from nested structure
      const recursiveDelete = (structure) => {
        return structure.filter((file) => {
          if (file.children) {
            // Recursively filter the children
            file.children = recursiveDelete(file.children);
          }
          // If the current file matches the id or name, it will be filtered out (deleted)
          return !(file.id === id || file.name === name);
        });
      };

      if (child) {
        console.log("In Delete Method: Child parameter provided");

        // Find the parent of the child
        const parent = this.findItem(null, null, child);
        console.log("In Delete Method: Searching for the parent of the child");

        if (parent) {
          console.log(
            "In Delete Method: Parent found, preparing to delete the parent"
          );

          // Delete the parent from the structure
          this.fileStructure = recursiveDelete(this.fileStructure);
          console.log(
            "In Delete Method: Parent deleted from fileStructure",
            this.fileStructure
          );
          return { itemDeleted: parent, fileStructure: this.fileStructure };
        } else {
          console.log("In Delete Method: Parent not found, throwing error");
          throw new Error("Parent of the item to delete not found");
        }
      } else if (id || name) {
        console.log("In Delete Method: id or name parameter provided");

        // Perform the recursive deletion based on id or name
        this.fileStructure = recursiveDelete(this.fileStructure);

        itemToDelete = this.findItem(id, name, null);
        if (!itemToDelete) {
          console.log(
            "In Delete Method: Item deleted from fileStructure",
            this.fileStructure
          );
          return {
            itemDeleted: { id, name },
            fileStructure: this.fileStructure,
          };
        } else {
          console.log(
            "In Delete Method: Item to delete not found, throwing error"
          );
          throw new Error("Item to delete not found");
        }
      }

      if (!itemToDelete) {
        console.log(
          "In Delete Method: No item set for deletion, throwing error"
        );
        throw new Error("Item to delete not found");
      }
    } catch (error) {
      console.log(`In Delete Method: Error occurred - ${error.message}`);
      throw new Error(`Error in delete: ${error.message}`);
    }
  }

  update(id, name, child, propertyToUpdate, value) {
    try {
      console.log("In Update Method: Started update process");

      const item = this.findItem(id, name, child);
      console.log(
        `In Update Method: Searching for item with id: ${id}, name: ${name}, child: ${child}`
      );

      if (!item) {
        console.log("In Update Method: Item not found, throwing error");
        throw new Error("Item not found");
      }

      console.log("In Update Method: Item found", item);

      if (!(propertyToUpdate in item)) {
        console.log(
          `In Update Method: Property '${propertyToUpdate}' does not exist on item, throwing error`
        );
        throw new Error(
          `Property '${propertyToUpdate}' does not exist on item`
        );
      }

      console.log(
        `In Update Method: Property '${propertyToUpdate}' exists, updating value to ${value}`
      );

      item[propertyToUpdate] = value;

      console.log("In Update Method: Update successful", item);
    } catch (error) {
      console.log(`In Update Method: Error occurred - ${error.message}`);
      throw new Error(`Error in update: ${error.message}`);
    }
  }

  move(fromId, fromName, fromChild, toPath) {
    try {
      console.log("In Move Method: Started move process");

      let itemToMove = this.findItem(fromId, fromName, fromChild);
      if (!itemToMove) throw new Error("Item to move not found");

      // Create a deep copy of the item to move
      itemToMove = JSON.parse(JSON.stringify(itemToMove));

      // Delete the original item
      this.delete(fromId, fromName, fromChild);

      // Prepare the new path and update the item's path
      const newPath = `${toPath}.${itemToMove.name}`;
      itemToMove.path = newPath;

      const pathArray = toPath.split(".");
      let current = this.fileStructure;

      // Traverse the file structure to find the target folder
      for (let i = 0; i < pathArray.length; i++) {
        const part = pathArray[i];
        let folder = current.find(
          (item) => item.name === part && item.isFolder
        );

        if (!folder) {
          folder = {
            name: part,
            isFolder: true,
            children: [],
            path: pathArray.slice(0, i + 1).join("."),
          };
          current.push(folder);
        }

        if (i === pathArray.length - 1) {
          // We've reached the target folder, add the item here
          folder.children.push(itemToMove);
        } else {
          // Move to the next level
          current = folder.children;
        }
      }

      // Update the paths of all children recursively
      const updateChildPaths = (item) => {
        if (item.children) {
          item.children.forEach((child) => {
            child.path = `${item.path}.${child.name}`;
            updateChildPaths(child);
          });
        }
      };

      updateChildPaths(itemToMove);

      console.log("In Move Method: Move successful");
    } catch (error) {
      console.log(`In Move Method: Error occurred - ${error.message}`);
      throw new Error(`Error in move: ${error.message}`);
    }
  }
}
