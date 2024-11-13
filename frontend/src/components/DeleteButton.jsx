import React, { useState } from "react";
import { Link } from "react-router-dom";
const DeleteButton = ({text}) => {
  return (
    <Link to={`/webnovel/delete/${text._id}`}>
      <button className="flex items-center bg-red-500 rounded-lg p-3">
        <div>Delete</div>
      </button>
    </Link>
  );
};

export default DeleteButton;
