import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const CreateTemplate = () => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  
  const categories = ["Payment", "Contract", "Bugs", "Inkstone", "Events" ,"Other", "Greetings"];

  // Initialize useNavigate outside the handleSubmit function
  const navigate = useNavigate();

  // Correct the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    const data = {
      category: category,
      question: question,
      answer: answer,
    };

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/webnovel`,
        data
      );
      enqueueSnackbar("New Template created", { variant: "success" });
      // Navigate after successful creation
      navigate("/");
    } catch (error) {
      console.error("Error creating template:", error);
      enqueueSnackbar("Error creating template", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <BackButton />
      <h1 className="text-3xl font-bold text-center mb-6">
        Create New Template
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Category Selection */}
          <div className="mb-4">
      <label htmlFor="category" className="block text-lg font-semibold mb-2">
        Category
      </label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

          {/* Question Input */}
          <div>
            <label
              htmlFor="question"
              className="block text-lg font-semibold mb-2"
            >
              Question
            </label>
            <input
              type="text"
              id="question"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here"
            />
          </div>

          {/* Answer Input */}
          <div>
            <label
              htmlFor="answer"
              className="block text-lg font-semibold mb-2"
            >
              Answer
            </label>
            <textarea
              id="answer"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows="4"
              placeholder="Enter the answer here"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Create Template
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateTemplate;
