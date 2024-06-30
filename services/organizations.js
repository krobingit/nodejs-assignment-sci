import { ObjectId } from "mongodb";
import { Organization } from "../models/organizations.js";

class OrganizationService {
  async createOrganization(data, res) {
    try {
      const newOrganization = await Organization.create(data);
      newOrganization.save()
      return newOrganization;
    } catch (err) {
      console.log("Error in registering organization " + err);
      return {status:"error",message: "Error in Create User Service",error:err }
    }
  }
  async updateOrganization(data, id, res) {
    try {
     const response= await Organization.findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: data,
        },
        { returnDocument: "after" }
      );
      return response;
    } catch (err) {
      console.log("Error in updating organization " + err);
      return {status:"error",message: "Error in Create User Service",error:err }
    }
  }
  async fetchOrganizations(res) {
    try {
      const response = await Organization.find().exec();
      return response;
    } catch (err) {
      console.log("Error in fetching organizations " + err);
      return {status:"error",message: "Error in Fetch Organizations Service",error:err }
    }
  }
  async fetchOrganizationById(id, res) {
    try {
      const response = await Organization.findById({ _id: new ObjectId(id) });
      return response;
    } catch (err) {
      console.log("Error in fetching organization by id " + err);
      return {status:"error",message: "Error in Fetch Organization By Id Service",error:err }
    }
  }
  async deleteOrganization(id, res) {
    try {
      const response = await Organization.deleteOne({ _id: new ObjectId(id) });
      return response;
    } catch (err) {
      console.log("Error in deleting organization " + err);
      return {status:"error",message: "Error in Delete Organization Service",error:err }
    }
  }
}

export default new OrganizationService();