import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }
});

const EmailModel = mongoose.models.subscription || mongoose.model('subscription', Schema);

export default EmailModel;
