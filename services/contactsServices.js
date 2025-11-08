import fs from "node:fs/promises";
import path from 'node:path';
import {nanoid} from "nanoid";

const contactsPath = path.resolve("src", "db", "contacts.json");

const updateContacts = allContacts => fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 4));


// Повертає масив контактів.
export async function listContacts() {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
export async function getContactById(id) {
    const allContacts = await listContacts();
    const oneContact = allContacts.find(item => item.id === id);
    return oneContact || null;
}

// Повертає об'єкт доданого контакту (з id).
export async function addContact(payload) {
    const allContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...payload,
    };
    allContacts.push(newContact);
    await updateContacts(allContacts);
    return newContact;
}

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export async function removeContact(id) {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(item => item.id === id);
    if (index === -1) return null;
    const [result] = allContacts.splice(index, 1);
    await updateContacts(allContacts);
    return result;
}
