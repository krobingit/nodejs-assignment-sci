import jwt from "jsonwebtoken";
import UserService from "../services/users.js";

export function verifyToken(req, res, next) {
  let auth = req.headers.authorization;
  if (auth) {
    const auth_token = auth.split(" ")[1];
    jwt.verify(auth_token, process.env.SECRET_KEY, (error, user) => {
      if (error)
        return res.status(403).send({ message: "Invalid Token", error });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Invalid Credentials");
  }
}

export function authorizeUser(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.userid === req.params.userid) next();
    else return res.status(403).send({ message: "You are not authorized" });
  });
}

export function authorizeAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") next();
    else return res.status(403).send({ message: "You are not authorized" });
  });
}

export async function userRoleValidation(req, res) {
  const user_id = req.params.userid;
  const user = await UserService.fetchUserById(user_id);
  if (!user) return res.status(403).send({ message: "You are not authorized to access this resource" });
  if (user && user.role === "admin")
    return res.status(200).json({
      message: "existing admin user found",
      userid:req.params.userid,
      role:user.role
    });
  else
    return res.status(200).json({
      message: "existing user found",
      userid:req.params.userid,
      role:user.role
    });
}
