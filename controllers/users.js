import UserService from "../services/users.js";

class UserController {
  async createUser(req, res) {
    const data = req.body;
    const response = await UserService.createUser(data);
    if (response.status !== "error")
      return res
        .status(201)
        .send({ message: "User Registration Successful", response });
    else
      return res.status(500).send({
        error: "Error occured while registration of user",
        errorDetails: response.error,
      });
  }
  async updateUser(req, res) {
    const data = req.body;
    const { userid } = req.params;
    const response = await UserService.updateUser(data, userid);
    return response
      ? res.status(200).send({ message: "Updated user Successfully", response })
      : res.status(500).send({ message: "Error occured while updating user" });
  }
  async fetchUsers(req, res) {
    const response = await UserService.fetchUsers();
    if (response && response.length > 0) return res.status(200).send(response);
    else
      return res.status(500).send({ message: "Error occured while fetching users" });
  }
  async fetchUserById(req, res) {
    const { userid } = req.params;
    const response = await UserService.fetchUserById(userid);
    return (response
      ? res.status(200).send(response)
      : res.status(404).send({ Error: "No user Found" }))
  }
  async deleteUser(req, res) {
    const { userid } = req.params;
    const result = await UserService.deleteUser(userid);
    return (result.deletedCount > 0
      ? res.status(200).send(result)
      : res.status(404).send({ message: "No user Found" }))
  }
}

export default new UserController();
