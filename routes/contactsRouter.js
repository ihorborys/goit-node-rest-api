import express from "express";
import {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateIsContactFavorite
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {createContactSchema, updateContactSchema, updateFavoriteSchema} from "../schemas/contactsSchemas.js";

import authenticate from "../middlewares/authenticate.js";

import upload from "../middlewares/upload.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", upload.single('avatar'), validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:contactId/favorite", validateBody(updateFavoriteSchema), updateIsContactFavorite);


export default contactsRouter;
