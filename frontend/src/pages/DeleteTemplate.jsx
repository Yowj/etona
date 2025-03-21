import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { enqueueSnackbar } from "notistack";

const DeleteTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const onConfirm = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/webnovel/${id}`
      );
      console.log("Deleted successfully");
      enqueueSnackbar("Deleted successfully", { variant: "success" });
      navigate("/"); // Navigate to home or any desired page
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Error deleting template", { variant: "error" });
    }
  };

  const onCancel = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure to delete?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTemplate;
