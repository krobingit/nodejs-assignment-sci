import express from "express";
const router = express.Router();
import userController from "../controllers/users.js"
import userAuthController from "../controllers/auth.js"
import { authorizeAdmin, authorizeUser, userRoleValidation } from "../config/auth.js";

 router
 .route("/")
 .get(authorizeAdmin,userController.fetchUsers)
 .post(userController.createUser)

router
 .route("/:userid")
 .get(authorizeUser,userController.fetchUserById)
 .put(authorizeUser,userController.updateUser)
 .delete(authorizeAdmin,userController.deleteUser);

router
 .route("/login")
 .post(userAuthController.loginUser)

router
 .route("/register")
 .post(userAuthController.registerUser)

 router
 .route("/validate-user/:userid")
 .post(userRoleValidation)

export const usersRoute = router;