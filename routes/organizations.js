import express from "express";
const router = express.Router();
import organizationController from "../controllers/organizations.js"
import { authorizeAdmin } from "../config/auth.js";

 router
 .route("/")
 .get(authorizeAdmin,organizationController.fetchOrganizations)
 .post(authorizeAdmin,organizationController.createOrganization)

router
 .route("/:id")
 .get(authorizeAdmin,organizationController.fetchOrganizationById)
 .put(authorizeAdmin,organizationController.updateOrganization)
 .delete(authorizeAdmin,organizationController.deleteOrganization);

export const organizationsRoute = router;