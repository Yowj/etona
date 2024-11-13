import React from "react";
import { Link } from "react-router-dom";

const EditButton = ({ text }) => {
  return (
    <Link to={`/webnovel/edit/${text._id}`}>
      <button className="flex items-center bg-amber-200 rounded-lg p-3">
        <div>Edit</div>
      </button>
    </Link>
  );
};

export default EditButton;
