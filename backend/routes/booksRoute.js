import express from "express";
import { Note } from "../models/noteSchema.js";

const router = express.Router();

//Post a Note
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.question ||
      !request.body.answer ||
      !request.body.category
    ) {
      return response.status(400).send({
        message: "Send all required fields: question, answer",
      });
    }
    const newNote = {
      question: request.body.question,
      answer: request.body.answer,
      category: request.body.category,
    };

    const note = await Note.create(newNote);
    return response.status(201).send(note);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//Get all Notes
router.get("/", async (request, response) => {
  try {
    const allNotes = await Note.find({});
    return response.status(200).json({
      count: allNotes.length,
      data: allNotes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Get a Note by ID

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const notes = await Note.findById(id);
    return response.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Update a Note

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.answer ||
      !request.body.question ||
      !request.body.category
    ) {
      return response.status(400).send({
        message: "Send all required details",
      });
    }

    const data = {
      question: request.body.question,
      answer: request.body.answer,
      category: request.body.category,
    };

    const { id } = request.params;
    const notes = await Note.findByIdAndUpdate(id, data, { new: true });
    return response.status(200).json(notes);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//deletea Note by ID

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const notes = await Note.findByIdAndDelete(id);
    return response.status(200).json({ message: "succesfully deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all by category?

// Route to get all notes by category
// Route to get all notes by category
router.get("/category/:category", async (request, response) => {
  try {
    const { category } = request.params;

    // Find all notes with the specified category
    const notes = await Note.find({ category });

    if (notes.length > 0) {
      return response.status(200).json({ notes: notes }); // Return all matching notes
    } else {
      return response.status(200).json({ notes: [] });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
