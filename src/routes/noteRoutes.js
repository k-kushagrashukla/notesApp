const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
  searchNotes,
  getHistory
} = require("../controllers/noteController");

const router = express.Router();

router.get("/", protect, getNotes);

router.get("/search", protect, searchNotes);

router.get("/:id/history", protect, getHistory);

router.get("/:id", protect, getNoteById);

router.post("/", protect, createNote);

router.put("/:id", protect, updateNote);

router.delete("/:id", protect, deleteNote);

router.post("/:id/share", protect, shareNote);

module.exports = router;