import mongoose from 'mongoose';

const { Schema } = mongoose;

const Note = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }, 
  notebookId: {
    type:Schema.Types.ObjectId,
    required: false,
    default: null,
  }
}, { timestamps: true  });

const NoteModel = mongoose.model('Note', Note);

export default NoteModel