const Note = require("../models/Note");

const User = require("../models/User");

const getNotes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const notes = await Note.find({
      $or: [
        { owner: req.user._id },
        { sharedWith: req.user._id }
      ]
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    const hasAccess =
      note.owner.toString() === req.user._id.toString() ||
      note.sharedWith.includes(req.user._id);

    if (!hasAccess) {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const note = await Note.create({
      title,
      content,
      owner: req.user._id
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    if (
      note.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Only owner can edit"
      });
    }

    note.history.push({
      title: note.title,
      content: note.content
    });

    note.title = req.body.title || note.title;

    note.content = req.body.content || note.content;

    await note.save();

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    if (
      note.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Only owner can delete"
      });
    }

    await note.deleteOne();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const shareNote = async (req, res) => {
  try {
    const { share_with_email } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    if (
      note.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Only owner can share"
      });
    }

    const user = await User.findOne({
      email: share_with_email
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (
      note.sharedWith.includes(user._id)
    ) {
      return res.status(400).json({
        message: "Already shared"
      });
    }

    note.sharedWith.push(user._id);

    await note.save();

    res.status(200).json({
      message: "Note shared successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const searchNotes = async (req, res) => {
  try {
    const q = req.query.q;

    const notes = await Note.find({
      $text: {
        $search: q
      },

      $or: [
        { owner: req.user._id },
        { sharedWith: req.user._id }
      ]
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json(note.history);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  shareNote,
  searchNotes,
  getHistory
};