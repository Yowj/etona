import React, { useState } from "react";
import { pasteText, copyText } from "./functions";

const PasteField = () => {
  const [text, setText] = useState("");

  const handlePasteText = () => {
    pasteText().then(pastedText => setText(pastedText));
  };

  const handleCopyText = () => {
    copyText(text);
  };

  return (
    <div className="fixed bottom-5 left-10 flex items-center justify-center h-auto w-1/5 bg-gradient-to-r from-gray-100 to-gray-200 p-2">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
        <label
          htmlFor="pasteBox"
          className="block text-2xl font-bold text-gray-800 mb-3"
        >
          Sentence Compiler
        </label>
        <textarea
          id="pasteBox"
          placeholder="Paste your text here..."
          rows="10"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition duration-150 ease-in-out"
        ></textarea>

        <div className="flex justify-between mt-4">
          <button
            id="pasteButton"
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ease-in-out duration-150"
            onClick={handlePasteText}
            aria-label="Paste Text"
          >
            Paste
          </button>
          <button
            id="copyButton"
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition ease-in-out duration-150"
            onClick={handleCopyText}
            aria-label="Copy All Text"
          >
            Copy All
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasteField;
