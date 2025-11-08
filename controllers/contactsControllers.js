import * as contactsServices from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
    const contacts = await contactsServices.listContacts();
    res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const {id} = req.params;
    const contact = await contactsServices.getContactById(id);
    if (!contact) {
        throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(contact);
};

export const deleteContact = (req, res) => {
};

export const createContact = async (req, res) => {
    const newContact = await contactsServices.addContact(req.body);
    res.status(201).json(newContact);
};

export const updateContact = (req, res) => {
};
