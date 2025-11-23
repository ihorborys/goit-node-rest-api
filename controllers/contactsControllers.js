import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = async (req, res) => {
    const contacts = await contactsServices.listContacts();
    return res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
    const {id} = req.params;
    const contact = await contactsServices.getContactById(id);
    if (!contact) {
        throw HttpError(404, `Not found`);
    }
    return res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
    const {id} = req.params;
    const delContact = await contactsServices.removeContact(id);
    if (!delContact) {
        throw HttpError(404, `Not found`);
    }
    return res.status(200).json(delContact);

};

export const createContact = async (req, res) => {
    const newContact = await contactsServices.addContact(req.body);
    res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
    const {id} = req.params;
    const updContact = await contactsServices.updateContact(id, req.body);
    if (!updContact) {
        throw HttpError(404, `Not found`);
    }
    return res.status(200).json(updContact);
};

export const updateIsContactFavorite = async (req, res) => {
    const {contactId} = req.params;
    const updIsContactFav = await contactsServices.updateStatusContact(contactId, req.body);
    if (!updIsContactFav) {
        throw HttpError(404, `Not found`);
    }
    return res.status(200).json(updIsContactFav);
};

