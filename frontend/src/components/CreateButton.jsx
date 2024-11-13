import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const CreateButton = () => {
  return (
    <Link to="/webnovel/create">
      <button className="flex items-center bg-slate-50 rounded-lg p-3">
        <IoMdAddCircleOutline className="text-black text-2xl" />
        <div className="ml-2">Create New Template</div>
      </button>
    </Link>
  );
};

export default CreateButton;
