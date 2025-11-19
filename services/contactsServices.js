// import fs from "node:fs/promises";
// import path from 'node:path';
// import {nanoid} from "nanoid";

import Contact from "../db/models/Contact.js";

// const contactsPath = path.resolve("db", "contacts.json");
//
// const updateContacts = allContacts => fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));


// Повертає масив контактів.
export function listContacts() {
    return Contact.findAll();
}

// // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
// export async function getContactById(id) {
//     const allContacts = await listContacts();
//     const oneContact = allContacts.find(item => item.id === id);
//     return oneContact || null;
// }
//
// Повертає об'єкт доданого контакту (з id).
export function addContact(payload) {
    return Contact.create(payload);
}


// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export function removeContact(id) {
    return Contact.destroy(id);
    // const allContacts = await listContacts();
    // const index = allContacts.findIndex(item => item.id === id);
    // if (index === -1) return null;
    // const [result] = allContacts.splice(index, 1);
    // await updateContacts(allContacts);
    // return result;
}

//
//
// export async function updateContact(id, payload) {
//     const allContacts = await listContacts();
//     const index = allContacts.findIndex(item => item.id === id);
//     if (index === -1) return null;
//     allContacts[index] = {...allContacts[index], ...payload};
//     await updateContacts(allContacts);
//     return allContacts[index];
// }
