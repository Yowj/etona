import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import { handleGeneral } from "../components/functions.jsx";
import CopyButton from "../components/CopyButton.jsx";
import Spinner from "../components/Spinner.jsx";
import axios from "axios";
import EditButton from "../components/EditButton.jsx";
import DeleteButton from "../components/DeleteButton.jsx";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Payment Questions"); // Start with "Payment Questions"
  const [allCategories, setAllCategories] = useState([]);

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/webnovel`);
      console.log(response.data.data);
      setData(response.data.data);
      setSelectedCategory("All Templates");
      setAllCategories(response.data.data.map((x) => x.category));
      console.log("allCategories in fetchData", allCategories);
      setLoading(false);
    } catch (error) {
      console.error("Problem in fetchData", error);
      setLoading(false);
    }
  };

  // useEffect to fetch data initially and set up polling
  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up polling to fetch data every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Fetch data every 5000 ms (5 seconds)

    // Clear the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (category) => {
    handleGeneral(setData, setLoading, category);
    setSelectedCategory(category);
    setLoading(true);
  };

  return (
    <>
      <Header />

      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col h-screen bg-gray-100">
          <div className="flex flex-1">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white p-6">
              <div className="mb-4 flex justify-between">
                <p className="font-semibold text-base">Categories</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-gray-700 cursor-pointer font-semibold hover:text-gray-900 focus:outline-none"
                >
                  Show All Templates
                </button>
              </div>
              <ul className="space-y-2">
                {[...new Set(allCategories)].map((category) => (
                  <li key={category}>
                    <button
                      className="text-gray-700 cursor-pointer font-semibold hover:text-gray-900 focus:outline-none"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Main content */}
            <main className="w-3/4 bg-slate-100 min-h-screen p-10">
              <h1 className="text-2xl font-semibold mb-6">{selectedCategory}</h1>
              {data.map((x) => (
                <div key={x._id}>
                  <h2 className="text-lg font-semibold">{x.question}</h2>
                  <p className="text-gray-700 mt-2">{x.answer}</p>

                  <div className="flex justify-between mt-4 items-center">
                    {/* Left side: Edit and Copy buttons grouped together */}
                    <div className="flex space-x-4">
                      <CopyButton text={x.answer} />
                      <EditButton text={x} />
                    </div>

                    {/* Right side: Delete button */}
                    <DeleteButton text={x} />
                  </div>

                  <hr className="my-4 border-2" />
                </div>
              ))}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
