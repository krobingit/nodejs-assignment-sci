import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validator from 'validator';


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: function(email) {
        return validator.isEmail(email)
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: "organizations",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  access_token: {
    type: String,
  },
});

export const User = mongoose.model("users", UserSchema);
