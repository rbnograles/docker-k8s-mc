import mongoose from 'mongoose';

const { Schema } = mongoose;

const NotebookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }, 
  content: {
    type: String,
    required: true,
  }
}, { timestamps: true  });

const Notebook = mongoose.model('Notebook', NotebookSchema);

export default Notebook;