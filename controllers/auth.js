import { User } from "../models/users.js";
import UserService from "../services/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserAuthController {
  async loginUser(req, res) {
    const data = req.body;
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).send({ error: "Invalid Username or Password" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      //creating a access token for successful login
      const access_token = jwt.sign(
        {
          userid: user._id,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: process.env.EXPIRATION_OF_JWT }
      );
      const loggedUser = await UserService.updateUser(
        { access_token },
        user._id,
        res
      );
      return res
        .status(200)
        .send({ message: "Logged in Successfully", loggedUser });
    } else {
      return res.status(401).send({ error: "Invalid Credentials" });
    }
  }

  async registerUser(req, res) {
    const data = req.body;
    let { email, password, name } = data;
    const user = await User.findOne({ email });
    if (user)
      return res.status(401).send({ error: "Username/Email already exists" });
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const payload = {
      password,
      email,
      name,
    };
    const response = await UserService.createUser(payload, res);
    if (response.status !== "error")
      return res
        .status(201)
        .send({ message: "User Registration Successful", response });
    else
      return res
        .status(500)
        .send({
          error: "Error occured while registration of user",
          errorDetails: response.error,
        });
  }

}


export default new UserAuthController();
