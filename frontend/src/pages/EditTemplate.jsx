import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const EditTemplate = () => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    try {
      axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/webnovel/${id}`).then((response) => {
        const data = response.data;
        setCategory(data.category);
        setQuestion(data.question);
        setAnswer(data.answer);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const newData = {
    category: category,
    question: question,
    answer: answer,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/webnovel/${id}`, newData);
      // Navigate after successful update
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <BackButton />
      <h1 className="text-3xl font-bold text-center mb-6">Edit Template</h1>

      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <div>
              <label
                htmlFor="category"
                className="block text-lg font-semibold mb-2"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter your question here"
              />
            </div>
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
            Save
          </button>
        </form>
      )}
    </div>
  );
};

export default EditTemplate;
