import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <button
      onClick={goBack}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-2 left-2"
    >
      Back
    </button>
  );
};

export default BackButton;
