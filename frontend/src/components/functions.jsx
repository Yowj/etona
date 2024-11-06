import axios from "axios";
import { enqueueSnackbar } from "notistack";


const handleGeneral = async (setData, setLoading, category) => {
  setLoading(true); // Start loading when fetching begins
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/webnovel/category/${category}`
    );
    if (response.data.notes && response.data.notes.length > 0) {
      setData(response.data.notes);
      enqueueSnackbar("Successful fetching data", { variant: "success" });
    } else {
      setData([]);
      enqueueSnackbar("No data found", { variant: "warning" });
    }
  } catch (error) {
    console.error(error);
    enqueueSnackbar("Error fetching contract data", { variant: "error" }); // Changed "Error creating book" to "Error fetching contract data" to make the message more relevant
  } finally {
    setLoading(false);
  }
};

async function pasteText() {
  try {
    const newText = await navigator.clipboard.readText();
    const pasteBox = document.getElementById("pasteBox");

    // Append new text to the existing content
    pasteBox.value += (pasteBox.value ? " " : "") + newText; // Adds a newline before appending, if there's existing text
  } catch (err) {
    alert("Failed to read clipboard contents: " + err);
  }
}

function copyText() {
  const text = document.getElementById("pasteBox").value;
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Text copied to clipboard");
    })
    .catch((err) => {
      alert("Failed to copy text: ", err);
    });
}

export { pasteText, copyText, handleGeneral };
