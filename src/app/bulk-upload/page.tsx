'use client';
import React, { useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

const BulkUpload: React.FC = () => {
  const [fileData, setFileData] = useState<string[][] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handle file drop
  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Check if it's a valid CSV file
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension === "csv") {
        parseCSV(file);
      } else {
        setErrorMessage("Invalid file type. Please upload a CSV file.");
      }
    }

    if (fileRejections.length > 0) {
      setErrorMessage("File was rejected. Please upload a valid CSV file.");
    }
  };

  // Parse CSV file
  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      if (typeof text === "string") {
        const rows = text
          .split("\n")
          .filter((row) => row.trim() !== ""); // Remove empty lines
        const data = rows.map((row) => row.split(",")); // Split each row by commas
        setFileData(data); // Save CSV data in the state
      } else {
        setErrorMessage("Failed to parse the file. Please try again.");
      }
    };
    reader.readAsText(file);
  };

  // Handle file submission
  const handleUpload = () => {
    if (!fileData) {
      setErrorMessage("Please upload a valid CSV file.");
      return;
    }
    // Send file data to the backend or handle as needed
    console.log("Uploading data:", fileData);
    // Example: axios.post('/api/upload', { data: fileData })
  };

  // Set up the drop zone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] }, // Accept only CSV files
    multiple: false, // Accept only one file at a time
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Bulk Upload
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Upload product data in bulk using CSV files.
      </p>

      {/* File Drop Zone */}
      <div
        {...getRootProps()}
        className="bg-white border-dashed border-4 border-gray-300 p-8 text-center rounded-lg"
      >
        <input {...getInputProps()} />
        <p className="text-lg text-gray-700">
          Drag & Drop CSV file here or click to select
        </p>
      </div>

      {/* Display errors */}
      {errorMessage && (
        <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
      )}

      {/* Display file preview */}
      {fileData && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">File Preview</h3>
          <pre className="bg-white p-4 rounded-lg shadow-lg">
            {JSON.stringify(fileData, null, 2)}
          </pre>
        </div>
      )}

      {/* Upload Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleUpload}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Upload Data
        </button>
      </div>
    </div>
  );
};

export default BulkUpload;
