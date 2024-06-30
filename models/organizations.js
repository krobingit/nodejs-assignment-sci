import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});


export const Organization=mongoose.model('organizations', OrganizationSchema);
