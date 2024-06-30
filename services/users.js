import { ObjectId } from "mongodb";
import { User } from "../models/users.js";

class UserService {
  async createUser(data) {
    try {
      const newUser = await User.create(data);
      newUser.save()
      return newUser;
    } catch (err) {
      console.log("Error in registering user " + err);
      return {status:"error",message: "Error in Create User Service",error:err }
    }
  }
  async updateUser(data, id) {
    try {
     const response= await User.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: data,
        },
        { returnDocument: "after" }
      );
      return response;
    } catch (err) {
      console.log("Error in updating user " + err);
      return {status:"error", message: "Error in Update User Service",error:err  }
    }
  }
  async fetchUsers() {
    try {
      const response = await User.find().exec();
      return response;
    } catch (err) {
      console.log("Error in fetching users " + err);
      return {status:"error", message: "Error in Fetch Users Service",error:err  }
    }
  }
  async fetchUserById(id) {
    try {
      const response = await User.findById({ _id: new ObjectId(id) });
      return response;
    } catch (err) {
      console.log("Error in fetching user by id " + err);
      return {status:"error", message: "Error in Fetch UserById Service",error:err  }
    }
  }
  async deleteUser(id) {
    try {
      const response = await User.deleteOne({ _id: new ObjectId(id) });
      return response;
    } catch (err) {
      console.log("Error in deleting user " + err);
      return {status:"error", message: "Error in Delete User Service",error:err  }
    }
  }
}

export default new UserService();