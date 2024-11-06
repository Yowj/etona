import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";

const CopyButton = ({ text }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        enqueueSnackbar("Nacopy na ina mo", { variant: "success" });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        enqueueSnackbar("Error par", { variant: "error" });
      });
  };

  return (
    <button
      onClick={handleCopy}
      className="pl-2 pr-2  bg-sky-700 rounded-md hover:bg-sky-600 text-white"
    >
      Copy
    </button>
  );
};

export default CopyButton;
