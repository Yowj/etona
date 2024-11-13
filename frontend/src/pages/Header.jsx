import React from "react";
import PasteField from "../components/PasteField";
import CreateButton from "../components/CreateButton";

const Header = () => {
  return (
    <div>
      <div className="bg-slate-800 px-6 py-4 shadow flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            W
          </div>
          <button className="text-yellow-50 font-semibold">Links</button>
          <a className="text-yellow-50 font-semibold" href="https://docs.google.com/spreadsheets/d/1BQq5-jk5ZvfcqK910-ZJHr62KPczCGH31tvKkzdPMUo/">AST Feedback Recording</a>
        </div>
        <CreateButton />
        <PasteField />
      </div>
    </div>
  );
};

export default Header;
