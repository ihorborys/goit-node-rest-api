import * as contactsServices from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = async (req, res) => {
    const {id: owner} = req.user;
    const contacts = await contactsServices.listContacts({owner});
    return res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const contact = await contactsServices.getContactById({id, owner});
    if (!contact) {
        throw HttpError(404, `Not found`);
    }
    return res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const delContact = await contactsServices.removeContact({id, owner});
    if (!delContact) {
        throw HttpError(404, `Not found`);
    }
    return res.status(200).json(delContact);

};

export const createContact = async (req, res) => {
    const {id: owner} = req.user;
    const newContact = await contactsServices.addContact({...req.body, owner});
    res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
    const {id} = req.params;
    const {id: owner} = req.user;
    const updContact = await contactsServices.updateContact({id, owner}, req.body);
    if (!updContact) {
        throw HttpError(404, `Not found`);
    }
    return res.status(200).json(updContact);
};

export const updateIsContactFavorite = async (req, res) => {
    const {contactId} = req.params;
    const {id: owner} = req.user;
    const updIsContactFav = await contactsServices.updateStatusContact({id: contactId, owner}, req.body);
    if (!updIsContactFav) {
        throw HttpError(404, `Not found`);
    }
    return res.status(200).json(updIsContactFav);
};

